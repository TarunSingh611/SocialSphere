'use client';
import PostCard from '@/components/post/PostCard'
import NoData from '@/components/misc/dataBreak/NoData';
const UserFeed = ({feed}:any) => {
    return (
        <div className="midInfo !pt-0">
            {feed?.length>0 ? 
                feed?.map((post:any) => (
                    <PostCard key={post._id} post={post} />
                ))
                :
                <NoData title="FeedEmpty" description='No Data to Show' size='large'/>
            }
        </div>
    )
}

export default UserFeed