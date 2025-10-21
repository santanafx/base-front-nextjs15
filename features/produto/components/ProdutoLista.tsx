import type React from 'react'
import type { Produto } from '../interfaces'
import { ProdutoCard } from './ProdutoCard'

interface ProdutoListaProps {
	produtos: Produto[]
	loading?: boolean
	error?: string | null
	onEdit?: (produto: Produto) => void
	onDelete?: (id: string) => void
	onView?: (id: string) => void
}

const LoadingSkeleton: React.FC = () => (
	<div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 animate-pulse">
		<div className="flex items-start space-x-4 mb-4">
			<div className="w-16 h-16 rounded-lg bg-gray-200"></div>
			<div className="flex-1 space-y-2">
				<div className="h-4 bg-gray-200 rounded w-3/4"></div>
				<div className="h-3 bg-gray-200 rounded w-1/2"></div>
				<div className="h-5 bg-gray-200 rounded w-1/4"></div>
			</div>
		</div>
		<div className="space-y-2 mb-4">
			<div className="h-3 bg-gray-200 rounded"></div>
			<div className="h-3 bg-gray-200 rounded w-5/6"></div>
		</div>
		<div className="grid grid-cols-2 gap-3 mb-4">
			<div className="space-y-1">
				<div className="h-3 bg-gray-200 rounded w-1/2"></div>
				<div className="h-3 bg-gray-200 rounded w-3/4"></div>
			</div>
			<div className="space-y-1">
				<div className="h-3 bg-gray-200 rounded w-1/2"></div>
				<div className="h-3 bg-gray-200 rounded w-3/4"></div>
			</div>
		</div>
		<div className="flex justify-end space-x-2 pt-4 border-t border-gray-100">
			<div className="h-8 bg-gray-200 rounded w-20"></div>
			<div className="h-8 bg-gray-200 rounded w-16"></div>
		</div>
	</div>
)

const EmptyState: React.FC = () => (
	<div className="text-center py-12">
		<svg
			className="mx-auto h-12 w-12 text-gray-400"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			aria-hidden="true"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
			/>
		</svg>
		<h3 className="mt-2 text-sm font-medium text-gray-900">
			Nenhum produto encontrado
		</h3>
		<p className="mt-1 text-sm text-gray-500">
			Não há produtos que correspondam aos filtros aplicados.
		</p>
	</div>
)

const ErrorState: React.FC<{ error: string }> = ({ error }) => (
	<div className="text-center py-12">
		<svg
			className="mx-auto h-12 w-12 text-red-400"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			aria-hidden="true"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
			/>
		</svg>
		<h3 className="mt-2 text-sm font-medium text-gray-900">
			Erro ao carregar produtos
		</h3>
		<p className="mt-1 text-sm text-gray-500">{error}</p>
	</div>
)

export const ProdutoLista: React.FC<ProdutoListaProps> = ({
	produtos,
	loading = false,
	error = null,
	onEdit,
	onDelete,
	onView,
}) => {
	if (error) {
		return <ErrorState error={error} />
	}

	if (loading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{Array.from({ length: 6 }, (_, index) => (
					<LoadingSkeleton key={`skeleton-loading-${Math.random()}-${index}`} />
				))}
			</div>
		)
	}

	if (produtos.length === 0) {
		return <EmptyState />
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{produtos.map((produto) => (
				<ProdutoCard
					key={produto.id}
					produto={produto}
					onEdit={onEdit}
					onDelete={onDelete}
					onView={onView}
				/>
			))}
		</div>
	)
}
