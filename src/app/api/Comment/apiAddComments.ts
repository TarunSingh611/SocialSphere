import makeApiRequest from "@/services/apiReq";

const getPostComments = async (postId: any, comment: any, replyTo:any = null) => {
    const options = {
        method: "POST" as const,
        body: JSON.stringify({ comment }),
    };
    const headers= {
        "Content-Type": "application/json",
    };
    return await makeApiRequest(`/post/comments?postId=${postId}`, options, headers);
};

export default getPostComments;
