import type { Produto } from '../interfaces/Produto'
import { ProdutoMock } from './ProdutoMock'

export function ProdutoFuncaoBuscarPorId(id: string): Produto | undefined {
	return ProdutoMock.find((produto) => produto.id === id)
}
