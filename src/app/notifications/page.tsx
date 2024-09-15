'use client';
// Import necessary dependencies and components

import {  useState } from "react";
import { useSelector } from "react-redux";;

import FollowRequest from "@/components/notification/FollowRequest.tsx";
import Alerts from "@/components/notification/Alert.tsx";
import LoadingDots from "@/components/misc/loadingDots";

const Notifications = () => {


  const notifications = useSelector((state: any) => state?.notifications?.notifications);
  const [stacked, setStacked] = useState(true);

  return (
    notifications ? (
      <>
        {notifications.followRequests && (
          <FollowRequest requests={notifications.followRequests} stacked={stacked}  setStacked={setStacked} />
        )}
        {notifications.alerts && (
          stacked ? <Alerts alerts={notifications.alerts} /> : null
        )}
      </>
    ) :
    <LoadingDots />
  );
};

export default Notifications;
