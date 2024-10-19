import makeApiRequest from '@/services/apiReq';

export async function getResume() {
  const options = {
    method: 'GET' as const,
  };
  const response = await makeApiRequest('/resume', options);
  return response
}
