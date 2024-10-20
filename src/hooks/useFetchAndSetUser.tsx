import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { setUser, clearUser,  setProfilePhoto, setCoverPhoto, setAuthModal  } from '@/redux/slicers/authSlice'; // Replace with your actual path
import axios from 'axios';

const useFetchAndSetUser = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.auth.userId);

  useEffect(() => {
    if(!userId) {
      dispatch(setAuthModal(true))
      return;
    }

    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${window?.location?.origin}/api/user/userProfile`); 
        if (data?.statusCode === 200) {
          dispatch(setUser(data?.user));
          dispatch(setProfilePhoto(data?.user?.profilePicture))
          dispatch(setCoverPhoto(data?.user?.coverPhoto))
          
        }else{
          dispatch(clearUser());
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        dispatch(clearUser());
      }
    };

    fetchUser();
  }, [userId]); 

  return; 
};

export default useFetchAndSetUser;
