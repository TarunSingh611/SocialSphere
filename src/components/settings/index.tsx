import React, { useState } from "react";
import Basic from "./Basic";
import Privacy from "./Privacy";
import Security from "./Security";
import General from "./General";
import UploadButtons from "./UploadButtons";
import apiUpdateUser from "@/api/user/apiUpdateUser";
import { toast } from "react-toastify";
import { setUser } from "@/redux/slicers/authSlice";
import { useDispatch } from "react-redux";
interface Setting {
  key: string;
  label: string;
  component: React.ComponentType<any>;
}

const settingsData: Setting[] = [
  { key: "basic-info", label: "Basic Info", component: Basic },
  { key: "general-info", label: "General Info", component: General },
  { key: "privacy-info", label: "Privacy Info", component: Privacy },
  { key: "security-info", label: "Security Info", component: Security },
];

interface ShowSettings {
  [key: string]: boolean;
}

const Settings: React.FC<{ user: any }> = ({ user }) => {
  const dispatch = useDispatch();
  const [showSettings, setShowSettings] = useState<ShowSettings>(
    settingsData.reduce((acc, setting) => {
      acc[setting.key] = false;
      return acc;
    }, {} as ShowSettings)
  );

  const toggleSetting = (key: string) => {
    setShowSettings((prevSettings) => ({
      ...prevSettings,
      [key]: !prevSettings[key],
    }));
  };

  const handleSubmit = (values: any) => {
    apiUpdateUser(values)
      .then((res: any) => {
        if (res?.data && res.data?.statusCode === 200) {
          dispatch(setUser({ ...user, ...values }));         
          toast.success(res.data?.result?.message);
        } else if (res.data?.statusCode === 400) {
          toast.error(res.data?.result?.message);
        } else if (res.data?.statusCode === 500) {
          toast.error(res.data?.result?.message);
        } else if (res.data?.statusCode === 404) {
          toast.error(res.data?.result?.message);
        } else {
          toast.error("unknown error");
        }
      })
      .catch(() => {
        toast.error("unknown error");
      });
  };

  return (
    <div className="my-8">
      <UploadButtons />
      {settingsData.map(({ key, label, component: Component }) => (
        <div key={key} className="mb-4">
          <div key={key} className="flex justify-between ">
            <label className="mr-2" htmlFor={key}>
              {label}:
            </label>
            <div className="switch-checkbox" onClick={() => toggleSetting(key)}>
              <input
                id={key}
                type="checkbox"
                checked={showSettings[key]}
                onChange={() => toggleSetting(key)}
              />
              <span className="slider"></span>
            </div>
          </div>
          {showSettings[key] && (
            <div className="mb-8">
              <Component user={user} onUpdateProfile={handleSubmit} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Settings;
