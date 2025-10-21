import type React from 'react'
import { useId } from 'react'
import { ProdutoCategoriaEnum } from '../enums/ProdutoCategoriaEnum'
import { ProdutoStatusEnum } from '../enums/ProdutoStatusEnum'
import type { ProdutoFiltros } from '../interfaces/ProdutoFiltros'

interface ProdutoFiltrosComponentProps {
	filtros: ProdutoFiltros
	onFiltrosChange: (filtros: ProdutoFiltros) => void
	onLimparFiltros: () => void
	loading?: boolean
}

export const ProdutoFiltrosComponent: React.FC<
	ProdutoFiltrosComponentProps
> = ({ filtros, onFiltrosChange, onLimparFiltros, loading = false }) => {
	const handleInputChange = (
		campo: keyof ProdutoFiltros,
		valor: string | number | undefined
	) => {
		onFiltrosChange({
			...filtros,
			[campo]: valor === '' ? undefined : valor,
		})
	}

	const getCategoriaLabel = (categoria: ProdutoCategoriaEnum) => {
		const labels: Record<ProdutoCategoriaEnum, string> = {
			[ProdutoCategoriaEnum.ELETRONICOS]: 'Eletrônicos',
			[ProdutoCategoriaEnum.ROUPAS]: 'Roupas',
			[ProdutoCategoriaEnum.CASA_JARDIM]: 'Casa e Jardim',
			[ProdutoCategoriaEnum.ESPORTES]: 'Esportes',
			[ProdutoCategoriaEnum.LIVROS]: 'Livros',
			[ProdutoCategoriaEnum.SAUDE_BELEZA]: 'Saúde e Beleza',
			[ProdutoCategoriaEnum.BRINQUEDOS]: 'Brinquedos',
			[ProdutoCategoriaEnum.AUTOMOTIVO]: 'Automotivo',
			[ProdutoCategoriaEnum.ALIMENTACAO]: 'Alimentação',
			[ProdutoCategoriaEnum.OUTROS]: 'Outros',
		}
		return labels[categoria]
	}

	const getStatusLabel = (status: ProdutoStatusEnum) => {
		const labels: Record<ProdutoStatusEnum, string> = {
			[ProdutoStatusEnum.ATIVO]: 'Ativo',
			[ProdutoStatusEnum.INATIVO]: 'Inativo',
			[ProdutoStatusEnum.DESCONTINUADO]: 'Descontinuado',
			[ProdutoStatusEnum.RASCUNHO]: 'Rascunho',
			[ProdutoStatusEnum.ESGOTADO]: 'Esgotado',
		}
		return labels[status]
	}

	const temFiltrosAtivos = Object.values(filtros).some(
		(valor) => valor !== undefined && valor !== '' && valor !== null
	)

	return (
		<div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
				{temFiltrosAtivos && (
					<button
						type="button"
						onClick={onLimparFiltros}
						disabled={loading}
						className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Limpar filtros
					</button>
				)}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{/* Busca */}
				<div>
					<label
						htmlFor="busca"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Buscar
					</label>
					<input
						type="text"
						id={useId()}
						placeholder="Nome, descrição ou SKU..."
						value={filtros.busca || ''}
						onChange={(e) => handleInputChange('busca', e.target.value)}
						disabled={loading}
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
					/>
				</div>

				{/* Categoria */}
				<div>
					<label
						htmlFor="categoria"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Categoria
					</label>
					<select
						id={useId()}
						value={filtros.categoria || ''}
						onChange={(e) => handleInputChange('categoria', e.target.value)}
						disabled={loading}
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<option value="">Todas as categorias</option>
						{Object.values(ProdutoCategoriaEnum).map((categoria) => (
							<option key={categoria} value={categoria}>
								{getCategoriaLabel(categoria as ProdutoCategoriaEnum)}
							</option>
						))}
					</select>
				</div>

				{/* Status */}
				<div>
					<label
						htmlFor="status"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Status
					</label>
					<select
						id={useId()}
						value={filtros.status || ''}
						onChange={(e) => handleInputChange('status', e.target.value)}
						disabled={loading}
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<option value="">Todos os status</option>
						{Object.values(ProdutoStatusEnum).map((status) => (
							<option key={status} value={status}>
								{getStatusLabel(status as ProdutoStatusEnum)}
							</option>
						))}
					</select>
				</div>

				{/* Faixa de Preço */}
				<div>
					<div className="block text-sm font-medium text-gray-700 mb-1">
						Faixa de Preço (R$)
					</div>
					<div className="flex space-x-2">
						<input
							type="number"
							placeholder="Mín"
							value={filtros.precoMin || ''}
							onChange={(e) =>
								handleInputChange(
									'precoMin',
									e.target.value ? Number(e.target.value) : undefined
								)
							}
							disabled={loading}
							className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
						/>
						<input
							type="number"
							placeholder="Máx"
							value={filtros.precoMax || ''}
							onChange={(e) =>
								handleInputChange(
									'precoMax',
									e.target.value ? Number(e.target.value) : undefined
								)
							}
							disabled={loading}
							className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
						/>
					</div>
				</div>
			</div>

			{/* Filtros ativos */}
			{temFiltrosAtivos && (
				<div className="mt-4 pt-4 border-t border-gray-100">
					<div className="flex flex-wrap gap-2">
						{filtros.busca && (
							<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
								Busca: {filtros.busca}
								<button
									type="button"
									onClick={() => handleInputChange('busca', undefined)}
									className="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500"
								>
									<span className="sr-only">Remover filtro de busca</span>
									<svg
										className="h-2 w-2"
										stroke="currentColor"
										fill="none"
										viewBox="0 0 8 8"
										aria-label="Remover filtro"
									>
										<title>Remover filtro de busca</title>
										<path
											strokeLinecap="round"
											strokeWidth="1.5"
											d="m1 1 6 6m0-6-6 6"
										/>
									</svg>
								</button>
							</span>
						)}
						{filtros.categoria && (
							<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
								{getCategoriaLabel(filtros.categoria as ProdutoCategoriaEnum)}
								<button
									type="button"
									onClick={() => handleInputChange('categoria', undefined)}
									className="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-green-400 hover:bg-green-200 hover:text-green-500"
								>
									<span className="sr-only">Remover filtro de categoria</span>
									<svg
										className="h-2 w-2"
										stroke="currentColor"
										fill="none"
										viewBox="0 0 8 8"
										aria-label="Remover filtro"
									>
										<title>Remover filtro de categoria</title>
										<path
											strokeLinecap="round"
											strokeWidth="1.5"
											d="m1 1 6 6m0-6-6 6"
										/>
									</svg>
								</button>
							</span>
						)}
						{filtros.status && (
							<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
								{getStatusLabel(filtros.status as ProdutoStatusEnum)}
								<button
									type="button"
									onClick={() => handleInputChange('status', undefined)}
									className="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-purple-400 hover:bg-purple-200 hover:text-purple-500"
								>
									<span className="sr-only">Remover filtro de status</span>
									<svg
										className="h-2 w-2"
										stroke="currentColor"
										fill="none"
										viewBox="0 0 8 8"
										aria-label="Remover filtro"
									>
										<title>Remover filtro de status</title>
										<path
											strokeLinecap="round"
											strokeWidth="1.5"
											d="m1 1 6 6m0-6-6 6"
										/>
									</svg>
								</button>
							</span>
						)}
						{(filtros.precoMin !== undefined ||
							filtros.precoMax !== undefined) && (
							<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
								Preço:
								{filtros.precoMin !== undefined && ` R$ ${filtros.precoMin}`}
								{filtros.precoMin !== undefined &&
									filtros.precoMax !== undefined &&
									' - '}
								{filtros.precoMax !== undefined && ` R$ ${filtros.precoMax}`}
								<button
									type="button"
									onClick={() => {
										handleInputChange('precoMin', undefined)
										handleInputChange('precoMax', undefined)
									}}
									className="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-yellow-400 hover:bg-yellow-200 hover:text-yellow-500"
								>
									<span className="sr-only">Remover filtro de preço</span>
									<svg
										className="h-2 w-2"
										stroke="currentColor"
										fill="none"
										viewBox="0 0 8 8"
										aria-label="Remover filtro"
									>
										<title>Remover filtro de preço</title>
										<path
											strokeLinecap="round"
											strokeWidth="1.5"
											d="m1 1 6 6m0-6-6 6"
										/>
									</svg>
								</button>
							</span>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
