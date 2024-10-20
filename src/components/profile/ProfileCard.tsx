'use client';
import secrets from "@/config/secrets";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FollowButton from "../followButton/FollowButton";

const ProfileCard = ({ user, setUser = () => { }, self = {} }: any) => {
  const {profilePhoto, coverPhoto} = useSelector((state: any) => state.auth);
  return (user &&
    <div className="bg-whiterounded-lg relative shadow-md p-6">
      <div className="absolute bg-gray-200 left-0 top-0  w-full h-48 sm:h-32 md:h-2/3 lg:h-32 !object-cover">
        <img
          className="w-full h-full object-cover"
          src={
            coverPhoto
              ? secrets.NEXT_PUBLIC_PROFILE_IMAGE_URL +
              coverPhoto
              : "/defaulters/Cover.webp"
          }
          alt="Profile"
        />
      </div>

      <div className="flex relative flex-col md:flex-row w-full">
        <div className="w-full md:w-5/12 h-auto">
          <div className="w-full h-auto !object-contain">
            <img
              className="sm:w-32 sm:h-32 p-8 sm:p-0 mx-auto md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover"
              src={
                profilePhoto
                  ? secrets.NEXT_PUBLIC_PROFILE_IMAGE_URL +
                  profilePhoto
                  : secrets.ProfilePicture(user?.gender)
              }
              alt="Profile"
            />
          </div>
          <p
            className="w-full text-center text-lg font-bold overflow-hidden text-ellipsis"
          >
            {user?.firstName+" "+user?.lastName}
          </p>
        </div>
        <div className="flex w-full flex-col md:w-7/12 " >
          <div className="flex h-full w-full  flex-col sm:flex-row items-end space-x-4">
            <p className="flex w-full md:w-1/3 items-center flex-col">
              <strong>{user?.socialMediaData?.followers?.length}</strong>
              <strong>Followers</strong>
            </p>
            <p className="flex  w-full md:w-1/3 items-center flex-col">
              <strong>{user?.socialMediaData?.following?.length}</strong>
              <strong>Following</strong>
            </p>
            <p className="flex w-full md:w-1/3 items-center flex-col">
              <strong>{user?.socialMediaData?.postsCount}</strong>
              <strong>Posts</strong>
            </p>
          </div>
          <div className="mx-auto my-2">
            {user?._id && self && self._id !== user._id && <FollowButton user={user} setUser={setUser} self={self} />}
          </div>
        </div>
      </div>
      <div className="flex flex-col">


        <p className="text-gray-500">{user?.bio || ""}</p>
      </div>
    </div>
  );
};

export default ProfileCard;

const ProfileSearchCard = ({ user }: any) => {
  const router = useRouter();
  const [userLocal, setUser] = useState({} as any);
  const self = useSelector((state: any) => state.auth.user);
  const {profilePhoto} = useSelector((state: any) => state.auth);
  const handleCardClick = () => {
    router.push(`/profile/${user._id}`);
  };
  useEffect(() => {
    if (Object.keys(userLocal).length === 0 && Object.keys(user).length) {
      setUser(user);
    }
  }, [user]);

  return (
    <div
      className="flex bg-white rounded-lg relative shadow-md p-6 my-4 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="w-1/4 h-1/4 overflow-hidden">
        <img
          className="w-1/2 h-1/2 object-fit rounded-full"
          src={
            profilePhoto
              ? secrets.NEXT_PUBLIC_PROFILE_IMAGE_URL +
              profilePhoto
              : secrets.ProfilePicture(userLocal?.gender)
          }
          alt="Profile"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-lg font-bold mb-2">{userLocal?.fullName}</p>
        <p className="text-gray-500 text-left">{userLocal?.username || ""}</p>
      </div>
      <div className="ml-auto mr-2 my-auto">
        {userLocal?._id && self && self._id !== userLocal._id && (
          <FollowButton user={userLocal} setUser={setUser} />
        )}
      </div>
    </div>
  );
};

export { ProfileSearchCard };
