import http from '../plugins/axios'

export default {
    simulacao: (data) => http.post('/simulacao', data)
}