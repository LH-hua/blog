import request from "./axios"

export function get(url, data) {
    return new Promise((resolve) => {
        request({
            methods: 'GET',
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
        request({
            methods: 'POST',
            url: url,
            data: data
        })
            .then(res => {
                resolve(res)
            })
    })
}