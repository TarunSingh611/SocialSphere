import React from "react";
import styles from "./PostCard.module.css";

const PostActions = ({ post, handleLike, handleComment }: any) => (
    <div className={`${styles.cardHeader} flex justify-between`}>
        <div className={`${styles.iconContainer} w-full flex justify-between`}>
            <div className="w-full flex justify-start">
                <div className="flex flex-col justify-center m-2">
                    <button onClick={handleLike} className={`${styles.iconButton}`}>
                        <img
                            src={post.liked ? "/icons/heartLike.png" : "/icons/heart.png"}
                            alt="Like"
                            className={styles.icon}
                        />
                    </button>
                    <p className={styles.postStats}>{post?.likeCount || 0}</p>
                </div>
                <div className="flex flex-col justify-center">
                    <button onClick={handleComment} className={styles.iconButton}>
                        <img src="/icons/comments.png" alt="Comment" className={styles.icon} />
                    </button>
                    <p className={styles.postStats}>{post?.commentCount || 0}</p>
                </div>
            </div>
            <button className={styles.iconButton}>
                <img src="/icons/share.png" alt="Share" className={styles.icon} />
            </button>
        </div>
    </div>
);

export default PostActions;
