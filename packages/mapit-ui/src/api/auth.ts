import { request } from './request';
import { Result } from '../type';
/**
 * POST /api/v1/user/login
 * username password
 * 用户登录
 */
export function loginApi(
  username: string,
  password: string,
): Promise<{ data: { token: string; user: any }; code: string; message: string }> {
  return request.post('/user/login', { username, password });
}
