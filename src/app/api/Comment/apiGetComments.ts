import makeApiRequest from '@/services/apiReq';

const getGetComments = async (postId :any ,order:number=0 ,cno:number=0) => {
  
  const options = {
    method: 'GET' as const,
  };
  return await makeApiRequest(`/post/comments?postId=${postId}&&order=${order}&&cno=${cno}`, options);
};

export default getGetComments;
