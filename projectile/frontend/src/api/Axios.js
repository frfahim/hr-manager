import axios from 'axios';
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = 'csrftoken'

// send authorization token with request
axios.interceptors.request.use((configuration) => {
    const config = configuration;
    const authToken = localStorage.getItem('token');
    if (authToken) {
      config.headers.Authorization = `Token ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios