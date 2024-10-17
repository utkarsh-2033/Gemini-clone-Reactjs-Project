import React, { useContext } from "react";
import styles from "./Response.module.css";
import { assets } from "../../assets/assets";
import ApiContext from "../../store/ApiContext";

const Response = () => {
  const { recentpropmt, loading, result } = useContext(ApiContext);

  return (
    <div className={styles.result}>
      <div className={styles.resultTitle}>
        <img src={assets.user_icon} alt="" />
        <p>{recentpropmt}</p>
      </div>
      <div className={styles.resultData}>
        <img
          src={assets.gemini_icon}
          alt=""
          className={loading ? styles.geminiIcon : ""}
        />
        {!loading ? (
          <p dangerouslySetInnerHTML={{ __html: result }}></p>
        ) : (
          <div className={styles.loader}>
            <hr /> <hr /> <hr />
          </div>
        )}
      </div>
    </div>
  );
};

export default Response;
