import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '@/redux/slicers/authSlice'; // Replace with your actual path
import axios from 'axios';

const useFetchAndSetUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${window?.location?.origin}/api/user/userProfile`); 
        if (data?.statusCode === 200) {
          dispatch(setUser(data?.user));
        }else{
          dispatch(clearUser());
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        dispatch(clearUser());
      }
    };

    fetchUser();
  }, []); 

  return; 
};

export default useFetchAndSetUser;
