import makeApiRequest from '@/services/apiReq';

export async function getAllBlogs(page:number,limit:number) {
  const options = {
    method: 'GET' as const,
  };
  return await makeApiRequest(`/blogs?page=${page}&limit=${limit}`, options)
}


export async function postBlog(data: any) {
  if(!data?.title){
      return Promise.reject({statusCode : 400, message : 'title is required'})
  }
  else if(!data?.content){
    return Promise.reject({statusCode : 400, message : 'content is required'})
  }
  else if (data?.title?.length < 5){
    return Promise.reject({statusCode : 400, message : 'title should be atleast 5 characters'})
  }
  else if(data?.description?.length > 50){
    return Promise.reject({statusCode : 400, message : 'description should be less than 50 characters'})
  }
  else if(data?.content?.length < 150){
    return Promise.reject({statusCode : 400, message : 'content should be atleast 50 characters'})
  }
    const body = JSON.stringify({
        title: data?.title,
        content: data?.content || '',
        description: data?.description || '',
        author: data?.author || 'unknown',
        link: data?.link || '', 
    }) 
    const options = {
      method: 'POST' as const,
      body 
    };
    return await makeApiRequest(`/blogs`, options)
  }

  export async function getBlog(id:string) {
    const options = {
      method: 'GET' as const,
    };
    return await makeApiRequest(`/blogs/${id}`, options)
  }

  export async function reactToBlog(id:string,data:any) {
    const options = {
      method: 'PATCH' as const,
      body : JSON.stringify(data)
    };
    return await makeApiRequest(`/blogs/${id}`, options)
  }

  export async function updateBlog(id:string, data:any) {
    const options = {
      method: 'PUT' as const,
      body : JSON.stringify(data)
    };
    return await makeApiRequest(`/blogs/${id}`, options)
  }

  export async function deleteBlog(id:string) {
    const options = {
      method: 'DELETE' as const,
    };
    return await makeApiRequest(`/blogs/${id}`, options)
  }