import axios from 'axios'

export const send_code = function (email, email_type) {
  const url = '/api/send_email/'
  return axios.post(url, { email, email_type })
    .then((ret) => {
      return Promise.resolve(ret)
    }).catch(error => {
      return Promise.reject(error)
    })
}
