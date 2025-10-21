import type { ProdutoDimensoes } from './ProdutoDimensoes'

export interface Produto {
	id: string
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
	criadoEm: Date
	atualizadoEm: Date
}
