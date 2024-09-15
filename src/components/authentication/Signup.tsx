import { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AuthForm from './AuthForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../misc/Loader';

interface SignUpProps {
  setAuthType: (type: string) => void;
  onClose?: () => void;
  setUserData?: (userData: any) => void;
}

const SignUp: React.FC<SignUpProps> = ({ setAuthType, onClose, setUserData }) => {

  const [isLoading, setLoading] = useState(false);

  const formConfig = {
    title: "Sign Up",
    icon: <LockOutlinedIcon />,
    field: [
      {
        id: "multiComponent",
        name: "multiComponent",
        spaceX: 2,
        spaceY: 0,
        justify: "space-between",
        components : 
        [
          {
            id: "firstName",
            name: "firstName",
            gridMd: 6,
            gridXs: 12,
            gridSm: 6,
          },
          {
            id: "lastName",
            name: "lastName",
            gridMd: 6,
            gridXs: 12,
            gridSm: 6,
          },
     
        ]
      },
      {
        id: "email",
        name: "email",
        autoFocus: true,
      },
      {
        id: "password",
        name: "password",
      },
      {
        id: "confirmPassword",
        name: "confirmPassword",
      },
      {
        id: "terms",
        name: "terms",
      },
      {
        id: "signup",
        name: "signup",
        action : () => { }
      },
      {
        id : "alreadyHaveAccount",
        name: "alreadyHaveAccount",
        action : () => {
          setAuthType("signIn");
        }
      }
    ],
  };

  const handleSubmit = (values: any) => {
    const signupUser = async(values: any) => {

      const data = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        terms: values.terms
      }

      const result = await axios.post('/api/auth/signup', {data});
      if(result?.data?.statusCode === 200) {
        toast.success(result?.data?.message);
        setLoading(false);
        if (onClose) {
          onClose();
        }
      }
      else if(result?.data?.statusCode === 400) {
        setLoading(false);
        toast.error(result?.data?.message);
      }
      else if(result?.data?.statusCode === 303) {
        toast.warning(result?.data?.message);
        setUserData((prevData: any) => 
          ({...prevData, 
            email: data?.email, 
            firstName: data?.firstName, 
            lastName: data?.lastName
          }));
        setTimeout(() => {
          setLoading(false);
          setAuthType("verify");
        }, 2000);
      }
      else {
        setLoading(false);
        toast.error(result?.data?.message);
      }
          
    }
    setLoading(true);
    signupUser(values);
  };

  return (
    <>
      <AuthForm handleSubmit={handleSubmit} formConfig={formConfig} />
      {isLoading && <Loader/>}
     </>
    );
  };
  
  export default SignUp;