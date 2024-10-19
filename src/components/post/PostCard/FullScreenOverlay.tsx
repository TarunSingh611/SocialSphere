import React from "react";
import styles from "./PostCard.module.css";

const FullScreenOverlay = ({ image, caption, handleFullScreenToggle }: any) => (
    <div className={styles.fullScreenOverlay} onClick={handleFullScreenToggle}>
        <img src={image} alt={`Full-Screen Post: ${caption}`} className={styles.fullScreenImage} />
    </div>
);

export default FullScreenOverlay;
