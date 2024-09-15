import makeApiRequest from '@/services/apiReq';

export async function getQuestions(data) {
    const options = {
        method: 'PUT' as const,
        body : JSON.stringify(data),
    }
    const headers = {
        'Content-Type': 'application/json',
    }
    return await makeApiRequest(`/problems`, options, headers)
}
export async function addQuestion(data:any) {
    const options = {
        method: 'POST' as const,
        body: JSON.stringify(data),
    };
    const headers = {
        'Content-Type': 'application/json',
    }
    return await makeApiRequest(`/problems`, options, headers)
}

export async function getQuestionById(data:any) {
    const options = {
        method: 'GET' as const,
    }
    return await makeApiRequest(`/problems/${data}`, options)
}
