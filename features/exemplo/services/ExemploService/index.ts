import axios from 'axios'
import gets from './gets'

const baseUrl = `${process.env.NEXT_PUBLIC_EXTENSAO_API}/produtos`
const api = axios.create({
	baseURL: baseUrl,
	timeout: 1000 * 60 * 3, // 3 minutos
})

export default {
	...gets(api.get),
	api,
}
