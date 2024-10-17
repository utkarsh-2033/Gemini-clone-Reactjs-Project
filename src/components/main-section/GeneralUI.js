import React from 'react'
import styles from './General.UI.module.css'
import { assets } from '../../assets/assets'

const GeneralUI = () => {
  return (
    <div className={styles.mid}>
          <div className={styles.text}>
            <h1 className={styles.webkit}>Hello, Utkarsh</h1>
            <h1>How can I help you coday?</h1>
          </div>
          <div className={styles.boxes}>
            <div className={styles.box}>
              <p>Help design a database schema for a business</p>
              <img  src={assets.code_icon} alt="" />
            </div>
            <div className={styles.box}>
              <p>Suggest beautiful places to see on a road trip.</p>
              <img src={assets.youtube_icon} alt="" />
            </div>
            <div className={styles.box}>
              <p>Draft an email to a recruiter to accept a job offer</p>
              <img src={assets.gemini_icon} alt="" />
            </div>
            <div className={styles.box}>
              <p>Teach me the concept of game theory in simple terms</p>
              <img src={assets.bulb_icon} alt="" />
            </div>
          </div>
        </div>
  )
}

export default GeneralUI
