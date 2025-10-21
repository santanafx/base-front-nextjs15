import type { ProdutoDimensoes } from './ProdutoDimensoes'

export interface ProdutoFormData {
	nome: string
	descricao: string
	preco: number
	categoria: string
	status: string
	imagemUrl?: string
	estoque: number
	sku: string
	peso?: number
	dimensoes?: ProdutoDimensoes
}
