import {useRouter} from 'next/router';

export default function userAuth(){
    const router = useRouter();
    const token = getToken();
    if(token){
        router.push("/weatherApp");
    }


}