import React, { useState, useEffect, useRef } from "react";
import secrets from "@/config/secrets";
import styles from "./PostCard.module.css";
import PropTypes from "prop-types";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import CommentsSection from "./CommentSection";
import FullScreenOverlay from "./FullScreenOverlay";
import { toast } from "react-toastify";
import apiGetUserName from "@/api/user/apiGetUserName";
import apiLike from "@/api/Reaxtion/Like";
import apiGetComments from "@/app/api/Comment/apiGetComments";
import apiAddComment from "@/app/api/Comment/apiAddComments";

const PostCard = ({ post, setPost = () => {} }: any) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [user, setUser] = useState({} as any);
    const [LocalPost, setLocalPost] = useState(post);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [replyTo, setReplyTo] = useState(null);
    const postCardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res: any = await apiGetUserName(post?.user?._id);
            setUser(res.user);
        };
        fetchUser();
    }, [post?.user?._id]);

    const handleFullScreenToggle = () => {
        setIsFullScreen(!isFullScreen);
    };

    const handleLike = () => {
        apiLike("post", LocalPost._id).then((res: any) => {
            if (res.statusCode === 200) {
                setLocalPost((prevPost: any) => ({
                    ...prevPost,
                    liked: res.flag === 1 ? true : false,
                    likeCount: res.likeCount,
                }));
                setPost({
                    liked: res.flag === 1 ? true : false,
                    likeCount: res.likeCount,
                });
            } else {
                toast.error(res.message);
            }
        });
    };

    const handleComment = async () => {
        setShowComments(!showComments);
        if (!showComments) {
            const res: any = await apiGetComments(LocalPost._id);
            if (res.statusCode === 200) {
                setComments(res.comments);
            } else {
                toast.error(res.message);
            }
        }
    };

    const handleAddComment = async () => {
        const res: any = await apiAddComment(LocalPost._id, newComment, replyTo);
        if (res.statusCode === 200) {
            setComments([...comments, res.comment]);
            setNewComment("");
            setReplyTo(null);
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div ref={postCardRef} className={styles.postCard} id={LocalPost._id}>
            <PostHeader user={user} />
            <PostImage
                image={`${secrets.NEXT_PUBLIC_IMAGE_URL}${LocalPost.image}`}
                caption={LocalPost.caption}
                handleFullScreenToggle={handleFullScreenToggle}
            />
            <PostActions
                post={LocalPost}
                handleLike={handleLike}
                handleComment={handleComment}
            />
            {showComments && (
                <CommentsSection
                    comments={comments}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    handleAddComment={handleAddComment}
                    replyTo={replyTo}
                    setReplyTo={setReplyTo}
                />
            )}
            {isFullScreen && (
                <FullScreenOverlay
                    image={`${secrets.NEXT_PUBLIC_IMAGE_URL}${LocalPost.image}`}
                    caption={LocalPost.caption}
                    handleFullScreenToggle={handleFullScreenToggle}
                />
            )}
        </div>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        image: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
    }).isRequired,
    setPost: PropTypes.func,
};

export default PostCard;
