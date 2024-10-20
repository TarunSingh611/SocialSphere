import { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AuthForm from './AuthForm';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../misc/Loader';
import { setToken } from '@/services/auth';
import { setUserId } from '@/redux/slicers/authSlice';
import { useDispatch } from 'react-redux';

export default function Verify({ userData, setAuthType, onClose }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const formConfig = {
    title: "Verify Account",
    icon: <LockOutlinedIcon />,
    field: [
      {
        id: "verificationCode",
        name: "verificationCode",
      },
      {
        id: "submit",
        name: "submit",
        type: "button",
        action: () => {
        }
      },
      {
        id: "resend",
        name: "resend",
        type: "timer-button",
        action: () => {
          resendCode();
        }
      },
      {
        id : "TryLogin",
        name: "TryLogin",
        action : () => {
          setAuthType("signIn");
        }
      }
    ],
  };

  const resendCode = () => {
    const resendVerificationCode = async () => {

      if(userData?.email) {
        const result = await axios.post('/api/auth/resend', {data:{email: userData?.email}});
        if(result?.data?.statusCode === 200) {
          setIsLoading(false)
          toast.success(result?.data?.message);
        }
        else if(result?.data?.statusCode === 401) {
          setIsLoading(false)
          toast.error(result?.data?.message);
        }
        else{
          setIsLoading(false)
          toast.error("Something went wrong");
        }
        
      }
      else{
        setIsLoading(false)
        toast.error("Email not found");
      }
    }
    setIsLoading(true)
    resendVerificationCode();
  };

  const handleSubmit = (values: any) => {
    const verifyCode = async () => {
      if(userData?.email) {
        if(!values?.verificationCode) {
          toast.error("Please enter verification code");
          setIsLoading(false)
          return;
        }
        const data = {
          email: userData?.email,
          verificationCode: values?.verificationCode
        }

        const result = await axios.post('/api/auth/verify', {data});
        if(result?.data?.statusCode === 200) {
          toast.success(result?.data?.message);
          setToken(result?.data?.token);
          dispatch(setUserId(result?.data?.user?._id));
          setIsLoading(false)
          if (onClose) {
            onClose();
          }
        }
        else if(result?.data?.statusCode === 401) {
          setIsLoading(false)
          toast.error(result?.data?.message);
        }
        else{
          setIsLoading(false)
          toast.error("Something went wrong");
        }
        
      }
      else{
        setIsLoading(false)
        toast.error("Email not found");
      }
    }
    setIsLoading(true)
    verifyCode();
  };

  return (
    <>
      <AuthForm handleSubmit={handleSubmit} formConfig={formConfig} />
      {isLoading && <Loader/>}
    </>
  );
}
