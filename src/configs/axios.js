import axios from 'axios'
axios.defaults.baseURL = 'http://188.165.235.13:8020/api/'

axios.defaults.headers.common['Authorization'] = `Bearervvv ${localStorage.getItem('acceggggssToken')}`
console.log('---------- :', localStorage.getItem("accessToken"))
export default axios.create({
    
})