import React from "react";
import styles from "./CommentsSection.module.css"; // New CSS file for improved styles
import AddComment from "./AddComment";
import { FaReply, FaThumbsUp } from "react-icons/fa"; // Using Font Awesome icons for better visuals

const CommentsSection = ({
    comments,
    newComment,
    setNewComment,
    handleAddComment,
    replyTo,
    setReplyTo,
}: any) => (
    <div className={styles.commentsContainer}>
        <div className={styles.commentsList}>
            {comments.map((comment: any) => (
                <div key={comment._id} className={styles.comment}>
                    <p className={styles.commentText}>{comment.body}</p>
                    <div className={styles.commentActions}>
                        <button className={styles.actionButton}>
                            <FaThumbsUp />
                            <span>{comment.liked ? "Unlike" : "Like"}</span> 
                            <span>({comment.likeCount})</span>
                        </button>
                        <button
                            className={styles.actionButton}
                            onClick={() => setReplyTo(comment._id)}
                        >
                            <FaReply />
                            <span>Reply</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
        <AddComment
            newComment={newComment}
            setNewComment={setNewComment}
            handleAddComment={handleAddComment}
            replyTo={replyTo}
        />
    </div>
);

export default CommentsSection;
