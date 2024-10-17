import React, { useContext } from "react";
import styles from "./list.module.css";
import { assets } from "../../assets/assets";
import ApiContext from "../../store/ApiContext";

const List = () => {
  const { prevPrompts,onSent } = useContext(ApiContext);
  return (
    <ul className={styles.list}>
      {prevPrompts.map((prompt) => {
        return (
          <li onClick={()=>onSent(prompt)} key={prompt}>
            <img src={assets.message_icon} alt="" />
            {prompt.length<=22?prompt:prompt.slice(0,22)+'...'}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
