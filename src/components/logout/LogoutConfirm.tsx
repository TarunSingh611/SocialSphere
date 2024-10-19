import React, { useState } from "react";
import { removeToken } from "@/services/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setAuthModal, setUser } from "@/redux/slicers/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../misc/Loader";
interface SearchOverlayProps {
  onClose: () => void;
}

const LogoutOverlay: React.FC<SearchOverlayProps> = ({onClose}) => {

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

const handleCancel = () => {
    onClose();
}
const handleConfirmLogout = () => {
  const logout = async () => {
    const result:any = await axios.delete("/api/auth/logout");

    if (result?.data?.statusCode === 200) {
        toast.success(result?.data?.message);
        dispatch(setUser(null));
        setIsLoading(false);
        router.push("/");
        dispatch(setAuthModal(true))
        onClose();
    }
  }
  setIsLoading(true);
  logout()
}
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-5/8 box-content">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Logout</h2>
              <p className="text-gray-600 mb-8">
                Are you sure you want to logout? Logging out will end your current session.
              </p>
              <div className="flex justify-center">
                <button onClick={handleCancel} className="bg-gray-300 font-medium `text-gray-700 mr-4 px-4 py-2 rounded-md focus:outline-none">
                  Cancel
                </button>
                <button onClick={handleConfirmLogout} className="bg-red-500 font-medium text-white px-4 py-2 rounded-md focus:outline-none">
                  Logout
                </button>
              </div>
            </div>
          </div>
          { isLoading && <Loader />}
        </div>

      );
};

export default LogoutOverlay;
