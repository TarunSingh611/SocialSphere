import makeApiRequest from '@/services/apiReq';

const apiPostImage = async (pno:any) => {
  
  const options = {
    method: 'GET' as const,
  };
  return await makeApiRequest(`/post/userPost?pno=${pno}`, options);
};

export default apiPostImage;
