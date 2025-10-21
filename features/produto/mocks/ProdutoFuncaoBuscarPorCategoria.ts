import type { ProdutoCategoriaEnum } from '../enums/ProdutoCategoriaEnum'
import type { Produto } from '../interfaces/Produto'
import { ProdutoMock } from './ProdutoMock'

export function ProdutoFuncaoBuscarPorCategoria(
	categoria: ProdutoCategoriaEnum
): Produto[] {
	return ProdutoMock.filter((produto) => produto.categoria === categoria)
}
