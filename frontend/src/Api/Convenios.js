import http from '../plugins/axios'

export default {
    findAll: () => http.get('/convenios')
}