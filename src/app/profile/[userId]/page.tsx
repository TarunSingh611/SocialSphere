'use client';

import UserProfile from "@/components/profile";
import apiGetUserProfileById from "@/api/user/apiGetProfileById";
import { useState, useEffect } from "react";


const Profile = ({ params }: { params: { userId: string } }) => {
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    try {
      const result: any = await apiGetUserProfileById(params.userId);
      if (result && result.statusCode === 200) {
        setUser(result.user);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.userId]);

  return (
    <>
      {user ? (
        <div>
          <UserProfile user={user} />

        </div>
      ) : null}
    </>
  );
};


export default Profile;
