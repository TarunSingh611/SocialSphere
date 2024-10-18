import React from "react";
import styles from "./CommentsSection.module.css";

const AddComment = ({ newComment, setNewComment, handleAddComment, replyTo }: any) => (
    <div className={styles.addCommentContainer}>
        <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={replyTo ? "Reply to comment..." : "Add a comment..."}
            className={styles.commentInput}
        />
        <button onClick={handleAddComment} className={styles.addCommentButton}>
            Submit
        </button>
    </div>
);

export default AddComment;
