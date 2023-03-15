import axios from 'axios';
import { User } from '../modules/loginModule';

const API_URL = 'http://localhost:3001';

const ContentType = 'Content-Type';
const applicationjson = 'application/json';

// any 타입을 하게됨
export const loginApi = async (user:User): Promise<User> => {
  const response = await axios({
    method: 'POST',
    url: `${API_URL}/users`,
    headers: {
      [ContentType]: applicationjson,
    },
    data: {
      userid: user.userid,
      userpassword: user.userpassword,
    },
  });
  
  return response.data 
};