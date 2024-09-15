import makeApiRequest from '@/services/apiReq';

export default async function updateUser({ data }: any) {
  const options = {
    method: 'PUT' as const,
    body: JSON.stringify(data),
  };
  const headers ={
    'Content-Type': 'application/json',
  }
  const response = await makeApiRequest('/user/update', options,headers);
  return response
}
