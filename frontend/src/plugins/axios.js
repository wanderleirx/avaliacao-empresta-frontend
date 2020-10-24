import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const http = axios.create({
    baseURL: 'http://localhost:8000/api/',
})

Vue.use(VueAxios, http)

export default http;