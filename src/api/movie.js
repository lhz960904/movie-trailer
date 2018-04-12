import axios from 'axios'

export const getMovies = (params) => {
  return axios('/api/client/movie/get_all', {
    params: params
  }).then((response) => {
    return response.data
  })
}
