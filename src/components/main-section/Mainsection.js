import React, { useContext } from "react";
import styles from "./MainSection.module.css";
import Response from "./Response";
import { assets } from "../../assets/assets";
import ApiContext from "../../store/ApiContext";
import GeneralUI from "./GeneralUI";

const Mainsection = () => {
  const { onSent, setInput, input, showResult } = useContext(ApiContext);

  const SentHandler = () => {
    onSent();
  };

  return (
    <div className={styles.main}>
      <div className={styles.nav}>
        <div className={styles.dropdown}>
          Gemini <img src={assets.dropdown} alt="" />{" "}
        </div>
        <img style={{filter: 'invert(0)'}} src={assets.user_icon} alt="" />
      </div>
      {!showResult ? <GeneralUI /> : <Response />}
      <div className={styles.bottom}>
        <div className={styles.input}>
          <input
            type="text"
            placeholder="Enter a prompt here"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />
          <img src={assets.gallery_icon} alt="" />
          <img src={assets.mic_icon} alt="" />
          {input?<img onClick={SentHandler} src={assets.send_icon} alt="" />:null}
        </div>
        <p className={styles.para}>
          Gemini may display inaccurate info, including about people, so
          double-check its responses. Your privacy and Gemini Apps
        </p>
      </div>
    </div>
  );
};

export default Mainsection;
