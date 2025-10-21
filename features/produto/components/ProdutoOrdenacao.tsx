import type React from 'react'
import { useId } from 'react'
import { useProdutoOrdenacao } from '../controllers/useProdutoOrdenacao'
import { ProdutoOrdenacaoEnum } from '../enums/ProdutoOrdenacaoEnum'

interface ProdutoOrdenacaoProps {
	ordenacao: ProdutoOrdenacaoEnum
	onOrdenacaoChange: (ordenacao: ProdutoOrdenacaoEnum) => void
	loading?: boolean
}

export const ProdutoOrdenacao: React.FC<ProdutoOrdenacaoProps> = ({
	ordenacao,
	onOrdenacaoChange,
	loading = false,
}) => {
	// Usar o controller específico dentro do componente
	const { getOrdenacaoLabel } = useProdutoOrdenacao({
		ordenacao,
		onOrdenacaoChange,
	})

	return (
		<div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
			<div className="flex items-center space-x-4">
				<span className="text-sm text-gray-700">
					{loading ? (
						<span className="animate-pulse">Carregando...</span>
					) : (
						'Produtos encontrados'
					)}
				</span>
			</div>

			<div className="flex items-center space-x-2">
				<label
					htmlFor="ordenacao"
					className="text-sm font-medium text-gray-700"
				>
					Ordenar por:
				</label>
				<select
					id={useId()}
					value={ordenacao}
					onChange={(e) =>
						onOrdenacaoChange(e.target.value as ProdutoOrdenacaoEnum)
					}
					disabled={loading}
					className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{Object.values(ProdutoOrdenacaoEnum).map((opcao) => (
						<option key={opcao} value={opcao}>
							{getOrdenacaoLabel(opcao as ProdutoOrdenacaoEnum)}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}
