import type React from 'react'
import { useProdutoFiltros } from '../controllers/useProdutoFiltros'
import { useProdutos } from '../hooks/useProdutos'
import type { Produto } from '../interfaces/Produto'
import type { ProdutoFiltros } from '../interfaces/ProdutoFiltros'
import { ProdutoFiltrosComponent } from './ProdutoFiltros'
import { ProdutoLista } from './ProdutoLista'
import { ProdutoOrdenacao } from './ProdutoOrdenacao'
import { ProdutoPaginacao } from './ProdutoPaginacao'

interface ProdutoViewProps {
	onEdit?: (produto: Produto) => void
	onDelete?: (id: string) => void
	onView?: (id: string) => void
	onCreate?: () => void
}

export const ProdutoView: React.FC<ProdutoViewProps> = ({
	onEdit,
	onDelete,
	onView,
	onCreate,
}) => {
	// Controller para filtros
	const { filtros, limparFiltros } = useProdutoFiltros()

	// Hook geral para dados dos produtos
	const {
		produtos,
		loading,
		error,
		totalPaginas,
		paginaAtual,
		ordenacao,
		buscarProdutos,
		alterarOrdenacao,
		alterarPagina,
	} = useProdutos({
		filtros,
		limite: 9, // 3x3 grid
	})

	const handleFiltrosChange = (novosFiltros: ProdutoFiltros) => {
		buscarProdutos(novosFiltros)
	}

	const handleLimparFiltros = () => {
		limparFiltros()
		buscarProdutos({})
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
					<p className="mt-1 text-sm text-gray-500">
						Gerencie o catálogo de produtos da sua loja
					</p>
				</div>
				{onCreate && (
					<button
						type="button"
						onClick={onCreate}
						className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						<svg
							className="-ml-1 mr-2 h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-label="Ícone de adicionar"
						>
							<title>Adicionar novo produto</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							/>
						</svg>
						Novo Produto
					</button>
				)}
			</div>

			{/* Filtros */}
			<ProdutoFiltrosComponent
				filtros={filtros}
				onFiltrosChange={handleFiltrosChange}
				onLimparFiltros={handleLimparFiltros}
				loading={loading}
			/>

			{/* Ordenação e contador */}
			<ProdutoOrdenacao
				ordenacao={ordenacao}
				onOrdenacaoChange={alterarOrdenacao}
				loading={loading}
			/>

			{/* Lista de produtos */}
			<ProdutoLista
				produtos={produtos}
				loading={loading}
				error={error}
				onEdit={onEdit}
				onDelete={onDelete}
				onView={onView}
			/>

			{/* Paginação */}
			<ProdutoPaginacao
				paginaAtual={paginaAtual}
				totalPaginas={totalPaginas}
				onPaginaChange={alterarPagina}
				loading={loading}
			/>
		</div>
	)
}
