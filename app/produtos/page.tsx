'use client'

import { ProdutoView } from '@/features/produto/components/ProdutoView'
import type { Produto } from '@/features/produto/interfaces/Produto'

export default function ProdutosPage() {
	const handleEdit = (produto: Produto) => {
		console.log('Editar produto:', produto)
		// Aqui você implementaria a navegação para a página de edição
		// ou abriria um modal de edição
	}

	const handleDelete = (id: string) => {
		console.log('Excluir produto:', id)
		// Aqui você implementaria a confirmação e exclusão do produto
		if (confirm('Tem certeza que deseja excluir este produto?')) {
			// Lógica de exclusão
		}
	}

	const handleView = (id: string) => {
		console.log('Visualizar produto:', id)
		// Aqui você implementaria a navegação para a página de detalhes
		// ou abriria um modal de visualização
	}

	const handleCreate = () => {
		console.log('Criar novo produto')
		// Aqui você implementaria a navegação para a página de criação
		// ou abriria um modal de criação
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<ProdutoView
					onEdit={handleEdit}
					onDelete={handleDelete}
					onView={handleView}
					onCreate={handleCreate}
				/>
			</div>
		</div>
	)
}
