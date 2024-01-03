import { getToken } from "../utils/helpers";
import api from "./axiosClient";


const fetchUser = async() => {
  try {
    const token = getToken();
    const response = await api.get('/accounts', {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    const userData = response.data.content;
    localStorage.setItem('token', JSON.stringify(token));
    // localStorage.setItem('users', JSON.stringify(userData));
    return userData;
  } catch (error) {
    throw new Error('Login failed');
  }
  };
const createUser = (data)=>{
  return api.post('/accounts', data);
}

  const userService = {
    fetchUser,
    createUser
  };
  
  export default userService;