// apiRegister.tsx

import axios from "axios";

const apiUpdateSecurity = async (
user:any
) => {

const result = await axios.put("/api/user/update", { data:user });
return result;
};

export default apiUpdateSecurity;
