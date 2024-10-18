import React from "react";
import styles from "./PostCard.module.css";

const PostImage = ({ image, caption, handleFullScreenToggle }: any) => (
    <div className="relative">
        <img src={image} alt={`Post: ${caption}`} className={`${styles.postImage}`} />
        <div className={styles.fullScreenIcon} onClick={handleFullScreenToggle}>
            <img src="/icons/fullscreen.png" alt="Full Screen" className={styles.icon} />
        </div>
    </div>
);

export default PostImage;
