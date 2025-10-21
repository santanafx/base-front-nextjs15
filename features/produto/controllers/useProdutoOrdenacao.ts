import { useCallback } from 'react'
import { ProdutoOrdenacaoEnum } from '../enums/ProdutoOrdenacaoEnum'

interface UseProdutoOrdenacaoProps {
	ordenacao: ProdutoOrdenacaoEnum
	onOrdenacaoChange: (ordenacao: ProdutoOrdenacaoEnum) => void
}

interface UseProdutoOrdenacaoReturn {
	ordenacao: ProdutoOrdenacaoEnum
	onOrdenacaoChange: (ordenacao: ProdutoOrdenacaoEnum) => void
	getOrdenacaoLabel: (ordenacao: ProdutoOrdenacaoEnum) => string
}

export function useProdutoOrdenacao({
	ordenacao,
	onOrdenacaoChange,
}: UseProdutoOrdenacaoProps): UseProdutoOrdenacaoReturn {
	const getOrdenacaoLabel = useCallback((ordenacao: ProdutoOrdenacaoEnum) => {
		const labels: Record<ProdutoOrdenacaoEnum, string> = {
			[ProdutoOrdenacaoEnum.NOME_ASC]: 'Nome (A-Z)',
			[ProdutoOrdenacaoEnum.NOME_DESC]: 'Nome (Z-A)',
			[ProdutoOrdenacaoEnum.PRECO_ASC]: 'Menor preço',
			[ProdutoOrdenacaoEnum.PRECO_DESC]: 'Maior preço',
			[ProdutoOrdenacaoEnum.DATA_ASC]: 'Mais antigos',
			[ProdutoOrdenacaoEnum.DATA_DESC]: 'Mais recentes',
			[ProdutoOrdenacaoEnum.ESTOQUE_ASC]: 'Menor estoque',
			[ProdutoOrdenacaoEnum.ESTOQUE_DESC]: 'Maior estoque',
		}
		return labels[ordenacao]
	}, [])

	return {
		ordenacao,
		onOrdenacaoChange,
		getOrdenacaoLabel,
	}
}
