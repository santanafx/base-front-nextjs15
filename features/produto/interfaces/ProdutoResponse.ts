import type { Produto } from './Produto'

export interface ProdutoResponse {
	data: Produto[]
	total: number
	pagina: number
	limite: number
	totalPaginas: number
}
