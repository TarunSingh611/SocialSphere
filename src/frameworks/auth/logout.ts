import makeApiRequest from '@/services/apiReq';

async function apiLogout() {
    const options = {
        method: 'DELETE' as const,
      };

      return await makeApiRequest(`/auth/logout`, options);
}

export default apiLogout