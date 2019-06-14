import axios from './Axios';

const API_URL = "http://localhost:7000/api/"

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
const create = ({ url, payload }) => {
    return axios.post(`${API_URL}${url}`, payload)
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
    // user
    userLogin: (params) => authorize({ url: 'user/login/', params }),
    userLogout: () => get({ url: 'user/logout/'}),
    userList: () => get({ url: 'user/'}),

    //request
    employeeRequestCreate: ({ payload }) => create({ url: 'request/', payload }),
    employeeRequestUpdate: ({ id, payload }) => patch({ url: 'request/', id, payload }),
    employeeRequestList: ({next, page} = {} ) => get({ url: 'request/', next, page }),
    employeeRequestDetails: (id) => details({ url: 'request/'}, id),
}

export default ApiHelper