import type { AxiosInstance } from 'axios'
import type { Produto } from '@/features/produto/interfaces/Produto'

export default function (post: AxiosInstance['post']) {
	return {
		async getProdutos() {
			const response = await post<Produto[]>('/')
			return response
		},
		async getProduto(data: { id: number }) {
			const { id } = data
			const response = await post<Produto[]>(`/${id}`)
			return response
		},
	}
}
