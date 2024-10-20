'use client';
import { useState } from "react";
import axios from "axios";
import AuthForm from "./AuthForm";
import { toast } from "react-toastify";
import Loader from "../misc/Loader";
import { setAuthModal, setUserId } from "@/redux/slicers/authSlice";
import { useDispatch } from "react-redux";

export default function Login({setAuthType, onClose, setUserData }: any) {

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const formConfig = {
    title: "Login",
    icon: "👤",
    field: [
      {
        id : "email",
        name: "email",
      },
      {
        id : "password",
        name: "password",
      },
      {
        id: "rememberMe",
        name: "rememberMe",
      },
      { 
        id : "login",
        name: "login",
        action : () => {
        }
      },
      {
        id : "forgotPassword",
        name: "forgotPassword",
        action : () => {
          setAuthType("resetPassword");
        }
      },
      {
        id : "createAccount",
        name: "createAccount",
        action : () => {
          setAuthType("signUp");
        }
      }
    ],
  }

  const handleSubmit = (values: any) => {
    
    const loginUser = async() => {

      const data = {
        email: values.email,
        password: values.password,
      }

      const result = await axios.post('/api/auth/login', {data});
      if (result?.data?.statusCode === 200) {
        toast.success(result?.data?.message);
        dispatch(setUserId(result?.data?.user?._id));
        dispatch(setAuthModal(false))
        setIsLoading(false)
        if (onClose) {  
          onClose();
        }
      }
      else if(result?.data?.statusCode === 401){
        toast.error(result?.data?.message);
        setIsLoading(false)
      }
      else if(result?.data?.statusCode === 303){
        toast.warning(result?.data?.message);
        setUserData((prevData: any) => 
          ({...prevData, 
            email: data?.email, 
          }));
        setTimeout(() => {
          setAuthType("verify");
          setIsLoading(false)
        }, 2000);
      }
      else{
        toast.error(result?.data?.message);
        setIsLoading(false)
      }

    };
    setIsLoading(true);
    loginUser();
  }

  return (
    <>
      <AuthForm handleSubmit={handleSubmit} formConfig={formConfig} />
      <div className="bg-purple-700 text-white text-center cursor-pointer" onClick={()=>handleSubmit({email:"demo@123.com" ,password :"demo"})}>Demo Login</div>
      {isLoading && <Loader/>}
    </>
  );
}