
import makeApiRequest from '@/services/apiReq';

export async function getHome() {
  const options = {
    method: 'GET' as const,
  };
  return await makeApiRequest(`/`, options)
}