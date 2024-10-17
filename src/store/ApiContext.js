import { createContext, useState } from "react";
import run from "../config/gemini";

const ApiContext = createContext();

const formatText = (rawText) => {
  // Step 1: Handle bold (**text**)
  let parts = rawText.split("**");
  for (let i = 1; i < parts.length; i += 2) {
    parts[i] = `<b>${parts[i]}</b>`;
  }
  let formattedText = parts.join("");

  // Step 2: Handle italic (_text_)
  parts = formattedText.split("_");
  for (let i = 1; i < parts.length; i += 2) {
    parts[i] = `<i>${parts[i]}</i>`;
  }
  formattedText = parts.join("");

  // Step 3: Handle underline (__text__)
  parts = formattedText.split("__");
  for (let i = 1; i < parts.length; i += 2) {
    parts[i] = `<u>${parts[i]}</u>`;
  }
  formattedText = parts.join("");

  // Step 4: Handle strikethrough (~~text~~)
  parts = formattedText.split("~~");
  for (let i = 1; i < parts.length; i += 2) {
    parts[i] = `<s>${parts[i]}</s>`;
  }
  formattedText = parts.join("");

  // Step 5: Handle headers (##, ###, #)
  let headerParts = formattedText.split("\n");
  for (let i = 0; i < headerParts.length; i++) {
    if (headerParts[i].startsWith("### ")) {
      headerParts[i] = `<h3>${headerParts[i].slice(4)}</h3>`;
    } else if (headerParts[i].startsWith("## ")) {
      headerParts[i] = `<h2>${headerParts[i].slice(3)}</h2>`;
    } else if (headerParts[i].startsWith("# ")) {
      headerParts[i] = `<h1>${headerParts[i].slice(2)}</h1>`;
    }
  }
  formattedText = headerParts.join("<br/>");

  // Step 6: Handle lists (- item)
  const listParts = formattedText.split("<br/>").map((line) => {
    if (line.startsWith("- ")) {
      return `<li>${line.slice(2)}</li>`;
    }
    return line;
  });

  // Wrap list items in <ul> if any exist
  formattedText = listParts.includes("<li>")
    ? `<ul>${listParts.join("<br/>")}</ul>`
    : listParts.join("<br/>");

  // Step 7: Handle code blocks (```code```)
  const codeParts = formattedText.split("```");
  for (let i = 1; i < codeParts.length; i += 2) {
    codeParts[i] = `<pre><code>${codeParts[i]}</code></pre>`;
  }
  formattedText = codeParts.join("");

  // Step 8: Handle links ([text](url))
  formattedText = formattedText.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2">$1</a>'
  );

  // Step 9: Handle line breaks (*)
  formattedText = formattedText.split("*").join("<br />");

  return formattedText;
};


export const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentpropmt, setRecentpropmt] = useState("");
  const [loading, setLoading] = useState(false);
  const [prevPrompts, setPrevprompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");
  
  const typingEffect=(index,word)=>{
   setTimeout(()=>{
     setResult(prev=>prev+word)
   },50*index)
  }
  const onSent = async (prompt) => {
    setResult("");
    setLoading(true);
    setShowResult(true);
    setRecentpropmt(input);
    if (prompt) {
        const response = await run(prompt);
      setResult(formatText(response));
    } else {
      const response = await run(input);
      const formattedResponse=formatText(response);
      const arrayResponse=formattedResponse.split(" ");
      for(let i=0 ;i<arrayResponse.length;i++){
        typingEffect(i,arrayResponse[i]+" ");
      }
      setPrevprompts((prev) => [...prev, input]);
    }
    setInput("");
    setLoading(false);
    // setShowResult(false);
  };

  const contextValue = {
    onSent,
    setInput,
    input,
    recentpropmt,
    prevPrompts,
    loading,
    showResult,
    result,
    setResult,
    setShowResult
  };

  return (
    <ApiContext.Provider value={contextValue}>
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContext;
