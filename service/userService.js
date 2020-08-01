import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000',
})

const userLogin = function (emailFilled, passwordFilled) {
  API.post('auth/login', { email: emailFilled, password: passwordFilled }).then(
    (response) => {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('name', response.data.name)
      localStorage.setItem('email', response.data.email)
    }
  )
}

export default {
  userLogin,
}
