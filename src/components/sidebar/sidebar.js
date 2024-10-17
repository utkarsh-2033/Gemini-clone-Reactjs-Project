import React, {useContext, useState} from "react";
import { assets } from "../../assets/assets";
import styles from "./sidebar.module.css";
import List from "./list";
import ApiContext from "../../store/ApiContext";

const Sidebar = () => {
  const {setShowResult}=useContext(ApiContext);
  const [extended,setextended]=useState(true);
  const ExtendHandler=()=>{
    setextended(prev=>!prev);
  }
  return (
    <div className={styles.sidebar}>
      <div>
        <div className={styles.menu}>
          <span onClick={ExtendHandler}>
            <img src={assets.menu_icon} alt="" />
          </span>
        </div>
        <div className={styles["new-chat"]}>
          <button onClick={()=>{setShowResult(false)}}>
            <img style={{marginRight:!extended?'0':'16px'}} src={assets.plus_icon} alt="" />
            {extended && <span>New Chat</span>}
          </button>
        </div>
        {extended && <div className={styles.recent}>
          <h4>Recent</h4>
          <div className={styles.list}>
            <List />
          </div>
        </div>}
      </div>
      <div className={styles.actions}>
        <div className={styles.action} style={{marginRight:!extended?'0':'165px'}}>
          <img style={{marginRight:!extended?'0':'16px'}} src={assets.question_icon} alt="" />
          {extended &&'Help'}
        </div>
        <div className={styles.action} style={{marginRight:!extended?'0':'165px'}}>
          <img style={{marginRight:!extended?'0':'16px'}} src={assets.history_icon} alt="" />
          {extended &&'Activity'}
        </div>
        <div className={styles.action} style={{marginRight:!extended?'0':'165px'}}>
          <img style={{marginRight:!extended?'0':'16px'}} src={assets.setting_icon} alt="" />
          {extended &&'Settings'}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
