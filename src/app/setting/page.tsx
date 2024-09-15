'use client';
import SettingComponent from "@/components/settings";
import{ useSelector } from "react-redux";
import ProfileCard from "@/components/profile/ProfileCard";

const Setting = () => {
  const user = useSelector((state: any) => state.auth.user);
  

  return (
    <div className="settingContainer bg-white shadow-md rounded-md w-full lg:w-2/3 xl:1/3 mx-auto h-full overflow-y-scroll lg:px-16 lg:py-4 md:px-8 px-4 py-2">
        <ProfileCard user={user} />
        <SettingComponent user={user}/>
   </div>
   )
};

export default Setting;
