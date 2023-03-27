import axios from "./axios"

export function get(url, data) {
    return new Promise((resolve) => {
        axios({
            method: 'GET',
            url: url,
            params: data
        })
            .then(res => {
                resolve(res)
            })
    })
}
export function post(url, data) {
    return new Promise((resolve) => {
        axios({
            method: 'POST',
            url: url,
            data: data
        })
            .then(res => {
                resolve(res)
            })
    })
}