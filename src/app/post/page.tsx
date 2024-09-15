'use client';
import TabbedNav from "@/components/navbar/TabbedNav";
import ImagePost from "@/components/post/ImagePost";
import ThreadPost from "@/components/post/ThreadPost";
import VideoPost from "@/components/post/VideoPost";
const Post = () => {
  const tabConfig = [
    {
      name: "Text",
      content: <ThreadPost/>,
    },
    {
      name: "Image",
      content: <ImagePost/>,
    },
    {
      name: "Video",
      content: <VideoPost/>,
    }
  ];
  return (
    <div className="bg-white shadow-md rounded-md h-full postContainer lg:px-16 lg:py-4 md:px-8 px-4 py-2">
      <TabbedNav tabs={tabConfig} defaultTab={1} />
    </div>
  );
};


export default Post;
