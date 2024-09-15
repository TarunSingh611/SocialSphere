import makeApiRequest from '@/services/apiReq';

async function apiGetExplore() {
    const options = {
        method: 'GET' as const,
      };
      return await makeApiRequest(`/explore`, options);
}

export default apiGetExplore