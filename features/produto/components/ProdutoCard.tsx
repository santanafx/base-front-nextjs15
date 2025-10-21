import Image from 'next/image'
import type React from 'react'
import { ProdutoStatusEnum } from '../enums/ProdutoStatusEnum'
import type { Produto } from '../interfaces/Produto'

interface ProdutoCardProps {
	produto: Produto
	onEdit?: (produto: Produto) => void
	onDelete?: (id: string) => void
	onView?: (id: string) => void
}

const StatusBadge: React.FC<{ status: ProdutoStatusEnum }> = ({ status }) => {
	const getStatusStyle = (status: ProdutoStatusEnum) => {
		switch (status) {
			case ProdutoStatusEnum.ATIVO:
				return 'bg-green-100 text-green-800 border-green-200'
			case ProdutoStatusEnum.INATIVO:
				return 'bg-gray-100 text-gray-800 border-gray-200'
			case ProdutoStatusEnum.DESCONTINUADO:
				return 'bg-red-100 text-red-800 border-red-200'
			case ProdutoStatusEnum.RASCUNHO:
				return 'bg-yellow-100 text-yellow-800 border-yellow-200'
			case ProdutoStatusEnum.ESGOTADO:
				return 'bg-orange-100 text-orange-800 border-orange-200'
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200'
		}
	}

	const getStatusLabel = (status: ProdutoStatusEnum) => {
		switch (status) {
			case ProdutoStatusEnum.ATIVO:
				return 'Ativo'
			case ProdutoStatusEnum.INATIVO:
				return 'Inativo'
			case ProdutoStatusEnum.DESCONTINUADO:
				return 'Descontinuado'
			case ProdutoStatusEnum.RASCUNHO:
				return 'Rascunho'
			case ProdutoStatusEnum.ESGOTADO:
				return 'Esgotado'
			default:
				return status
		}
	}

	return (
		<span
			className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(status)}`}
		>
			{getStatusLabel(status)}
		</span>
	)
}

export const ProdutoCard: React.FC<ProdutoCardProps> = ({
	produto,
	onEdit,
	onDelete,
	onView,
}) => {
	const formatarPreco = (preco: number) => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(preco)
	}

	const formatarData = (data: Date) => {
		return new Intl.DateTimeFormat('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		}).format(data)
	}

	const truncarTexto = (texto: string, limite: number = 100) => {
		if (texto.length <= limite) return texto
		return `${texto.substring(0, limite)}...`
	}

	return (
		<div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
			{/* Header com imagem e info básica */}
			<div className="flex items-start space-x-4 mb-4">
				{produto.imagemUrl ? (
					<Image
						src={produto.imagemUrl}
						alt={produto.nome}
						width={64}
						height={64}
						className="rounded-lg object-cover bg-gray-100"
						onError={(e) => {
							e.currentTarget.src =
								'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAzNkgxNlYyOEgyNFYzNloiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTQwIDM2SDMyVjI4SDQwVjM2WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K'
						}}
					/>
				) : (
					<div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
						<svg
							className="w-8 h-8 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-label="Placeholder de imagem"
						>
							<title>Imagem do produto não disponível</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					</div>
				)}

				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between">
						<h3 className="text-lg font-semibold text-gray-900 truncate">
							{produto.nome}
						</h3>
						<StatusBadge status={produto.status as ProdutoStatusEnum} />
					</div>
					<p className="text-sm text-gray-500 mt-1">SKU: {produto.sku}</p>
					<p className="text-xl font-bold text-green-600 mt-2">
						{formatarPreco(produto.preco)}
					</p>
				</div>
			</div>

			{/* Descrição */}
			<p className="text-sm text-gray-600 mb-4 leading-relaxed">
				{truncarTexto(produto.descricao)}
			</p>

			{/* Informações adicionais */}
			<div className="grid grid-cols-2 gap-3 mb-4 text-sm">
				<div>
					<span className="font-medium text-gray-700">Categoria:</span>
					<p className="text-gray-600 capitalize">
						{produto.categoria.replace('_', ' ')}
					</p>
				</div>
				<div>
					<span className="font-medium text-gray-700">Estoque:</span>
					<p
						className={`font-medium ${produto.estoque > 10 ? 'text-green-600' : produto.estoque > 0 ? 'text-yellow-600' : 'text-red-600'}`}
					>
						{produto.estoque} unidades
					</p>
				</div>
				<div>
					<span className="font-medium text-gray-700">Criado em:</span>
					<p className="text-gray-600">{formatarData(produto.criadoEm)}</p>
				</div>
				<div>
					<span className="font-medium text-gray-700">Atualizado em:</span>
					<p className="text-gray-600">{formatarData(produto.atualizadoEm)}</p>
				</div>
			</div>

			{/* Ações */}
			<div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-100">
				{onView && (
					<button
						type="button"
						onClick={() => onView(produto.id)}
						className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors duration-200"
					>
						Visualizar
					</button>
				)}
				{onEdit && (
					<button
						type="button"
						onClick={() => onEdit(produto)}
						className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200"
					>
						Editar
					</button>
				)}
				{onDelete && (
					<button
						type="button"
						onClick={() => onDelete(produto.id)}
						className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors duration-200"
					>
						Excluir
					</button>
				)}
			</div>
		</div>
	)
}
