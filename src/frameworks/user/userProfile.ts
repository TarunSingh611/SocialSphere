import makeApiRequest from '@/services/apiReq';

async function apiUser() {
    const options = {
        method: 'GET' as const,
      };
      return await makeApiRequest(`/user/profile`, options);
}

export default apiUser