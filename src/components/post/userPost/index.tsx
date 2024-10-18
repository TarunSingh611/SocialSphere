import React from 'react'
import PostCard from '@/components/post/PostCard/index'
const UserPost = ({ posts }: any) => {


    return (posts && (
        posts.map((post: any) => (
            <PostCard key={post._id} post={post} />

        ))
    ) || (

            <div>
                No Posts
            </div>
        )

    )

}

export default UserPost