import makeApiRequest from '@/services/apiReq';

export async function getNavs() {
  const options = {
    method: 'GET' as const,
  };
  return await makeApiRequest(`/misc/navs`, options)
}
