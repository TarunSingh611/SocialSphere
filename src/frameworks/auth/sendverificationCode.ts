import makeApiRequest from '@/services/apiReq';

async function apiSendVerificationCode({data}:{data:any}) {
    const options = {
        method: 'POST' as const,
        body: JSON.stringify(data),
      };
      const headers = {
        'Content-Type': 'application/json',
    }
      return await makeApiRequest(`/auth/verificationCode`, options, headers);
}

export default apiSendVerificationCode