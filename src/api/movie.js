import axios from 'axios'

export const getMovies = (params) => {
  return axios('/api/client/movie/get_all', {
    params: params
  }).then((response) => {
    return response.data
  })
}

export const getDetail = (id) => {
  return axios(`/api/client/movie/get_detail/${id}`)
    .then((response) => {
      return response.data
    })
}

export const getRelative = (id) => {
  return axios(`/api/client/movie/get_relative/${id}`)
    .then((response) => {
      return response.data
    })
}

export const searchMovie = (query) => {
  return axios(`/api/client/movie/search`, {
    params: {
      q: query
    }
  })
    .then((response) => {
      return response.data
    })
}

export const getHotKey = () => {
  return axios(`/api/client/movie/gethotkey`)
    .then((response) => {
      return response.data
    })
}
