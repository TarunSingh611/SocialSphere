"use client";


import {  useSelector } from "react-redux";
import UserProfile from "@/components/profile";

const Profile = () => {
  const user:any = useSelector((state: any) => state.auth.user);

  return (
      user &&  <UserProfile user={user} />
  )
};

export default Profile;
