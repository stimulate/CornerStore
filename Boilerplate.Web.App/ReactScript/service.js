import axios from 'axios'
import qs from 'qs'

let xmr = {
    post: "",
    get: ""
}

xmr.post = function (url, data) {
    let params = qs.stringify(data)
    return new Promise((resolve, reject) => {
        axios.post(url, params).then((res) => {
            resolve(res)
    })
})
}

xmr.get = function (url, data) {
    let params = qs.stringify(data)
    return new Promise((resolve, reject) => {
        axios.get(url, params).then((res) => {
            resolve(res)
        })
    })
}
export default xmr