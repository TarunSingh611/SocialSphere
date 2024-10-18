import React, { useState, useEffect, useRef } from "react";
import secrets from "@/config/secrets";
import UserCard from "@/components/user/UserCard";
import styles from "./PostCard.module.css";
import PropTypes from "prop-types";
import apiGetUserName from "@/api/user/apiGetUserName";
import apiLike from "@/api/Reaxtion/Like";
import apiGetComments from "@/app/api/Comment/apiGetComments";
import apiAddComment from "@/app/api/Comment/apiAddComments";
// import apiLikeComment from "@/api/Comment/apiLikeComment";
import { toast } from "react-toastify";

const likeIconUrl = "/icons/heart.png";
const likedIconUrl = "/icons/heartLike.png";
const commentIconUrl = "/icons/comments.png";
const shareIconUrl =  "/icons/share.png";
const reportIconUrl =   "/icons/menu.png";
const fullScreenIconUrl = "/icons/fullscreen.png";

const PostCard = ({ post, setPost = () => { } }: any) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [user, setUser] = useState({} as any);
    const [LocalPost, setLocalPost] = useState(post);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [replyTo, setReplyTo] = useState(null);
    const [mentionedUsers, setMentionedUsers] = useState([]);
    const postCardRef = useRef<HTMLDivElement | null>(null);

    const handleFullScreenToggle = () => {
        setIsFullScreen(!isFullScreen);
    };

    const handleLike = () => {
        apiLike("post", LocalPost._id)
            .then((res: any) => {
                if (res.statusCode === 200) {
                    setLocalPost((prevPost: any) => ({
                        ...prevPost,
                        liked: res.flag === 1 ? true : false,
                        likeCount: res.likeCount,
                    }));
                    setPost({
                        liked: res.flag === 1 ? true : false,
                        likeCount: res.likeCount
                    })
                } else {
                    toast.error(res.message);
                }
            });
    };

    const handleComment = async () => {
        setShowComments(!showComments);
        if (!showComments) {
            const res:any = await apiGetComments(LocalPost._id);
            if (res.statusCode === 200) {
                setComments(res.comments);
            } else {
                toast.error(res.message);
            }
        }
    };

    const handleAddComment = async () => {
        const res:any = await apiAddComment(LocalPost._id, newComment, replyTo);
        if (res.statusCode === 200) {
            setComments([...comments, res.comment]);
            setNewComment("");
            setReplyTo(null);
            setMentionedUsers([]);
        } else {
            toast.error(res.message);
        }
    };

    const handleLikeComment = async (commentId) => {
        // const res = await apiLikeComment(commentId);
        // if (res.statusCode === 200) {
        //     const updatedComments = comments.map(comment => 
        //         comment._id === commentId 
        //             ? { ...comment, liked: res.flag === 1, likeCount: res.likeCount } 
        //             : comment
        //     );
        //     setComments(updatedComments);
        // } else {
        //     toast.error(res.message);
        // }
    };

    const handleMention = (username) => {
        setNewComment(newComment + `@${username} `);
        setMentionedUsers([...mentionedUsers, username]);
    };

    const handleShare = () => { };

    const handleReport = () => { };

    useEffect(() => {
        const fetchUser = async () => {
            const res: any = await apiGetUserName(post?.user?._id)
            setUser(res.user)
        }
        fetchUser()
    }, [post?.user?._id])

    return (
        <>
            <div ref={postCardRef} className={styles.postCard} id={LocalPost._id}>
                <div className="w-full flex justify-between border-b border-gray-200">
                    {user?._id && <UserCard user={user} setUser={setUser} />}

                    <button
                        onClick={handleReport}
                        className={`${styles.iconButton} right-0 ml-auto`}
                    >
                        <img
                            src={reportIconUrl}
                            alt="Report"
                            className={`${styles.icon}  hover:bg-slate-50 w-12 h-12`}
                        />
                    </button>
                </div>
                <div className="relative">
                    <img
                        src={`${secrets.NEXT_PUBLIC_IMAGE_URL}${LocalPost.image}`}
                        alt={`Post: ${LocalPost.caption}`}
                        className={`${styles.postImage}`}
                    />
                    <div
                        className={styles.fullScreenIcon}
                        onClick={handleFullScreenToggle}
                    >
                        <img
                            src={fullScreenIconUrl}
                            alt="Full Screen"
                            className={styles.icon}
                        />
                    </div>
                </div>

                <div className={`${`styles.cardContent`}`}>
                    <p className="text-lg font-semibold border-y border-gray-200 px-4 py-2">
                        {LocalPost.caption}
                    </p>
                    <div className={`${styles.cardHeader} flex justify-between`}>
                        <div className={`${styles.iconContainer} w-full flex justify-between`}>
                            <div className="w-full flex justify-start">
                                <div className="flex flex-col justify-center">
                                    <button onClick={handleLike} className={styles.iconButton}>
                                        <img
                                            src={LocalPost.liked ? likedIconUrl : likeIconUrl}
                                            alt="Like"
                                            className={styles.icon}
                                        />
                                    </button>
                                    <p className={styles.postStats}>{LocalPost?.likeCount || 0}</p>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <button onClick={handleComment} className={styles.iconButton}>
                                        <img src={commentIconUrl} alt="Comment" className={styles.icon} />
                                    </button>
                                    <p className={styles.postStats}>{LocalPost?.commentCount || 0}</p>
                                </div>
                            </div>
                            <button onClick={handleShare} className={styles.iconButton}>
                                <img src={shareIconUrl} alt="Share" className={styles.icon} />
                            </button>
                        </div>
                    </div>
                    
                    {showComments && (
                        <div className={styles.commentsSection}>
                            {comments.map((comment) => (
                                <div key={comment._id} className={styles.comment}>
                                    <p>{comment.text}</p>
                                    <div className={styles.commentActions}>
                                        <button onClick={() => handleLikeComment(comment._id)}>
                                            {comment.liked ? 'Unlike' : 'Like'} ({comment.likeCount})
                                        </button>
                                        <button onClick={() => setReplyTo(comment._id)}>Reply</button>
                                    </div>
                                    {comment.replies && comment.replies.map((reply) => (
                                        <div key={reply._id} className={styles.reply}>
                                            <p>{reply.text}</p>
                                            <div className={styles.commentActions}>
                                                <button onClick={() => handleLikeComment(reply._id)}>
                                                    {reply.liked ? 'Unlike' : 'Like'} ({reply.likeCount})
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <div className={styles.addComment}>
                                <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder={replyTo ? "Write a reply..." : "Write a comment..."}
                                />
                                <button onClick={handleAddComment}>Post</button>
                            </div>
                            <div className={styles.mentionUsers}>
                                {/* Add a list of users that can be mentioned */}
                                {/* This is a simplified version, you might want to implement a more sophisticated mention system */}
                                {['user1', 'user2', 'user3'].map(username => (
                                    <button key={username} onClick={() => handleMention(username)}>
                                        @{username}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {isFullScreen && (
                <div
                    className={`${styles.fullScreenOverlay} z-[100]`}
                    onClick={handleFullScreenToggle}

                >
                    <img
                        src={`${secrets.NEXT_PUBLIC_IMAGE_URL}${LocalPost.image}`}
                        alt={`Post: ${LocalPost.caption}`}
                        className={`${styles.fullScreenImage} z-[100]`}
                    />
                </div>
            )}
        </>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        image: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
    }).isRequired,
    setPost: PropTypes.func
};

export default PostCard;