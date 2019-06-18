import axios from './Axios';


const API_URL = "http://localhost:8000/api/"

/**
 * Fetch the data from the api
 * Next means there are more data that needs to be fetched with the next url
 * page means page no
 * @param {url} string
 * @param {next} object
 * @param {page} number
 */
const get = ({ url, next, page }) => {
    if (page) {
        return axios.get(`${API_URL}${url}`, {
            params: {
                page
            }
        })
    }
    if (next) {
        return axios.get(next)
    }
    return axios.get(`${API_URL}${url}`)
}

/**
 * Create a new obj
 * @param {url} string
 * @param {payload} object
 */
const post = ({ url, payload }) => {
    return axios.post(`${API_URL}${url}`, payload)
}

/**
 * Create a new obj
 * @param {url} string
 * @param {payload} object
 */
const postWithFile = ({ url, payload }) => {
    return axios.post(`${API_URL}${url}`, payload, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
}

/**
 * Login Authorization
 * @param {url} string
 * @param {params} object
 */
const authorize = ({ url, params }) => {
    return axios.post(`${API_URL}${url}`, params)
}

/**
 * Updates the data that are only required
 * @param {url} string
 * @param {id} string
 * @param {payload} object
 */
const patch = ({ url, id, payload }) => {
    return axios.patch(`${API_URL}${url}${id}/`, payload)
}

/**
 * Updates data
 * @param {url} string
 * @param {id} string
 * @param {payload} object
 */
const update = ({ url, id, payload }) => {
    return axios.put(`${API_URL}${url}${id}/`, payload)
}

const remove = ({ url, id }) => {
    return axios.delete(`${API_URL}${url}${id}/`)
}

const details = ({ url, id }) => {
    return axios.get(`${API_URL}${url}${id}/`)
}

const ApiHelper = {
    // auth
    userLogin: (params) => authorize({ url: 'login/', params }),
    userLogout: () => get({ url: 'logout/'}),

    // user
    userList: () => get({ url: 'user/'}),
    meDetails: () => get({ url: 'user/me/'}),
    userDetails: (id) => details({ url: 'user/', id: id}),
    userCreate: (payload) => postWithFile({ url: 'user/', payload}),

    //request
    employeeRequestCreate: ({ payload }) => post({ url: 'request/', payload }),
    employeeRequestUpdate: ({ id, payload }) => patch({ url: 'request/', id: id, payload: payload }),
    employeeRequestList: ({next, page} = {} ) => get({ url: 'request/', next, page }),
}

export default ApiHelper