import axios from 'axios'

export const userLogin = (data) => {
  return axios(`/api/client/user/login`, {
    method: 'POST',
    data
  })
    .then((response) => {
      return response.data
    })
}

export const userRegister = (data) => {
  return axios(`/api/client/user/register`, {
    method: 'POST',
    data
  })
    .then((response) => {
      return response.data
    })
}

export const getUserInfo = () => {
  return axios(`/api/client/user/get_userinfo`)
    .then((response) => {
      return response.data
    })
}

export const logout = () => {
  return axios(`/api/client/user/logout`, {
    method: 'POST'
  })
    .then((response) => {
      return response.data
    })
}
