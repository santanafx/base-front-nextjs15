import type { ProdutoStatusEnum } from '../enums'
import type { Produto } from '../interfaces'
import { ProdutoMock } from './ProdutoMock'

export function ProdutoFuncaoBuscarPorStatus(
	status: ProdutoStatusEnum
): Produto[] {
	return ProdutoMock.filter((produto) => produto.status === status)
}
