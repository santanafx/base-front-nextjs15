import axios from 'axios'
import gets from './gets'
import posts from './posts'

const baseUrl = `https://apihmg.fundep.ufmg.br/ApiExtensaoGPF/api/faq`
const api = axios.create({
	baseURL: baseUrl,
	timeout: 1000 * 60 * 3, // 3 minutos
})

export default {
	...gets(api.get),
	...posts(api.post),
}
