import secrets from "@/config/secrets";
import { getToken, setToken } from "@/services/auth";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const makeApiRequest = async <T>(
  url: string,
  options: {
    method: HttpMethod;
    body?: string | FormData;
  },
  headers?: { [key: string]: string }
): Promise<T> => {
  try {
    const jwtToken = await getToken();
    const response = await fetch(`${secrets.NEXT_PUBLIC_API_BASE_URL}${url}`, {
      ...options,
      headers: {
        ...headers,
        Authorization: "Bearer " + secrets.NEXT_PUBLIC_API_KEY,
        jwtToken: jwtToken || "",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
    }

    const data: T = await response.json();
    const newJwtToken = response.headers.get('jwtToken');
    if (newJwtToken) {
      setToken(newJwtToken);
    }
    return data;
  } catch (error) {
    console.error("Error making API request:", error);
    return Promise.reject(error);
  }
};

export default makeApiRequest;
