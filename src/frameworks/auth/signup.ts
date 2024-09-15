import makeApiRequest from '@/services/apiReq';

async function apiSignup({data}:{data:any}) {
    const options = {
        method: 'POST' as const,
        body: JSON.stringify(data),
      };
    const headers = {
        'Content-Type': 'application/json',
    }
      return await makeApiRequest(`/auth/signup`, options, headers);
}

export default apiSignup