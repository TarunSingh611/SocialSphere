import { getToken } from "@/services/auth";

export const getAuthorized = async() => {
    const token = await getToken();
    if (token) {
        return 1;
    } else {
        return 0;
    }
}