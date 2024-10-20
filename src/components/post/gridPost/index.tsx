import MiniCard from "@/components/post/miniCard"
import { useState } from "react"
import PostCard from "@/components/post/PostCard"
const GridPost = ({ posts }: { posts: any }) => {

  const [LocalPosts, setLocalPosts] = useState(posts)

  const [Card, setCard] = useState(null)

  const setFullCard = (post: any) => {
    setCard(post)
  }

  const setPost = (post: any) => {
    setLocalPosts((prevPosts: any) => prevPosts.map((p: any) => { return Card._id === p._id ? {...p, ...post} : p }))
  }


  return (Card ? (<>
    <PostCard post={Card} setPost={setPost}/>
    <button onClick={() => setCard(null)} className="bg-red-500 w-full text-white px-4 py-2 rounded">Close</button>
  </>
  ) : (<div className="grid grid-cols-3 ">
    {
      LocalPosts && (
        LocalPosts.map((post: any) => (
          <MiniCard key={post._id} post={post} setFullCard={setFullCard}  />

        ))
      ) || (

        <div>
          No Posts
        </div>
      )
    }</div>
  )
  )
}

export default GridPost