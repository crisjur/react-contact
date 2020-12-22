import axios from 'axios'

// axios.interceptors.response.use(response => {
//   return response;
// }, error => {
//   if (!error.response) return error;
//   if (error.response.status === 401) {
//     window.location = '/unauthorized'
//   }
//   if (error.response &&  error.response.data ) {
//     return Promise.reject(error.response.data);
//   }
//   return Promise.reject(error);
// });

//TODO token should be from redux state or localstorage
const apiBaseUrl = 'https://api.dev.pastorsline.com/api/'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE3MSwiZXhwIjoxNjM5NDY2NjE1fQ.9vE-glLQtV2NT3gNMkqeRkrWWZAhYCqX-_ibs7lC8GY'

const _request = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  }
})

export const api = {
  get(url) {
    return _request.get(url)
  },
  post(url, postData) {
    return _request.post(url, postData)
  },
  put(url, postData) {
    return _request.put(url, postData)
  },
  delete(url, postData) {
    return _request.delete(url, { data : postData})
  },
}
