import {req} from "./req";

type LoginParameter = {
  username: string
  password: string
}

type LoginResult = {
  token: string
}

const login = (param: LoginParameter): Promise<LoginResult> => {
  return req.post('/auth/login', param)
}

export {login}