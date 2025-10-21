import type { Produto } from '../interfaces/Produto'
import { ProdutoMock } from './ProdutoMock'

export function ProdutoFuncaoBuscarPorNome(nome: string): Produto[] {
	const termoBusca = nome.toLowerCase()
	return ProdutoMock.filter(
		(produto) =>
			produto.nome.toLowerCase().includes(termoBusca) ||
			produto.descricao.toLowerCase().includes(termoBusca)
	)
}
