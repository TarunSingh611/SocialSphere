import React from "react";
import UserCard from "@/components/user/UserCard";
import styles from "./PostCard.module.css";

const PostHeader = ({ user }: any) => {
    const handleReport = () => {
        // Report handling logic
    };

    return (
        <div className="w-full flex justify-between border-b border-gray-200">
            {user?._id && <UserCard user={user} />}
            <button
                onClick={handleReport}
                className={`${styles.iconButton} right-0 ml-auto`}
            >
                <img
                    src="/icons/menu.png"
                    alt="Report"
                    className={`${styles.icon} hover:bg-slate-50 w-12 h-12`}
                />
            </button>
        </div>
    );
};

export default PostHeader;
