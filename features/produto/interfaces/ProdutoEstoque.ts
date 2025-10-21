export interface ProdutoEstoque {
	produtoId: string
	quantidade: number
	reservado: number
	disponivel: number
	localizacao?: string
}
