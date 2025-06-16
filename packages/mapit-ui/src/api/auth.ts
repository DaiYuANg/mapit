import { request } from './request';
import { Result } from '../type';

/**
 * POST /api/v1/user/login
 * username password
 * 用户登录
 */
export const loginApi = async (
  username: string,
  password: string,
): Promise<{ data: { token: string; user: { email: string; password: string } }; code: string; message: string }> => {
  const response = await request.post('/user/login', { username, password });
  return response.data;
};
