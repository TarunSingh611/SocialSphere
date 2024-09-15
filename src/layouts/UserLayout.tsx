"use client";
import NavBar from "@/components/navbar/NavBar";
import { useSelector , useDispatch } from "react-redux";
import SignInSide from "@/components/authentication/SideAuth";
import { setAuthModal } from '@/redux/slicers/authSlice'
import useFetchAndSetUser from "@/hooks/useFetchAndSetUser";

const UserLayout = ({ children, authorized }: { children: React.ReactNode, authorized: number }) => {
    const dispatch = useDispatch()
    const authModal = useSelector((state: any) => state.auth.modal);
    const user = useSelector((state: any) => state.auth.user);
    useFetchAndSetUser()
    const closeAuthModel = () => {
        if(user) dispatch(setAuthModal(false))
    }

    return (
        <div className="flex flex-col sm:flex-row h-screen">
            <div className="w-auto bg-gray-200">
                <NavBar authorized={authorized}/>
            </div>
            <div className="flex-1 bg-gray-100 overflow-y-auto">
                {children}
            </div>
            {authModal && <SignInSide onClose={closeAuthModel} />}
        </div>
    );
};

export default UserLayout;
