import makeApiRequest from '@/services/apiReq';

async function apiLogin({data}:{data:any}) {
    const options = {
        method: 'POST' as const,
        body: JSON.stringify(data),
      };
      const headers = {
        'Content-Type': 'application/json',
    }
      return await makeApiRequest(`/auth/login`, options, headers);
}

export default apiLogin