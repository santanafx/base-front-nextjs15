import type { AxiosInstance } from 'axios'
import type { Produto } from '../../interfaces/Produto'

export default function (post: AxiosInstance['post']) {
	return {
		async teste() {
			const response = await post<Produto>('/login')
			console.log('response', response)
			return response
		},
	}
}
