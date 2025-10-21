import type React from 'react'
import { useProdutoPaginacao } from '../controllers/useProdutoPaginacao'

interface ProdutoPaginacaoProps {
	paginaAtual: number
	totalPaginas: number
	onPaginaChange: (pagina: number) => void
	loading?: boolean
}

export const ProdutoPaginacao: React.FC<ProdutoPaginacaoProps> = ({
	paginaAtual,
	totalPaginas,
	onPaginaChange,
	loading = false,
}) => {
	// Usar o controller específico dentro do componente
	const {
		gerarNumerosPaginas,
		podeAvancar,
		podeVoltar,
		proximaPagina,
		paginaAnterior,
	} = useProdutoPaginacao({
		paginaAtual,
		totalPaginas,
		onPaginaChange,
	})

	if (totalPaginas <= 1) return null

	const paginas = gerarNumerosPaginas()

	return (
		<div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 border border-gray-200 rounded-lg shadow-sm">
			<div className="flex flex-1 justify-between sm:hidden">
				{/* Mobile */}
				<button
					type="button"
					onClick={paginaAnterior}
					disabled={!podeVoltar || loading}
					className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Anterior
				</button>
				<button
					type="button"
					onClick={proximaPagina}
					disabled={!podeAvancar || loading}
					className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Próxima
				</button>
			</div>

			<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p className="text-sm text-gray-700">
						Página <span className="font-medium">{paginaAtual}</span> de{' '}
						<span className="font-medium">{totalPaginas}</span>
					</p>
				</div>
				<div>
					<nav
						className="isolate inline-flex -space-x-px rounded-md shadow-sm"
						aria-label="Paginação"
					>
						{/* Botão Anterior */}
						<button
							type="button"
							onClick={paginaAnterior}
							disabled={!podeVoltar || loading}
							className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<span className="sr-only">Página anterior</span>
							<svg
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
									clipRule="evenodd"
								/>
							</svg>
						</button>

						{/* Números das páginas */}
						{paginas.map((pagina, index) => {
							if (pagina === '...') {
								return (
									<span
										key={`ellipsis-${Math.random()}-${index}`}
										className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
									>
										...
									</span>
								)
							}

							const numeroPagina = pagina as number
							const isAtual = numeroPagina === paginaAtual

							return (
								<button
									type="button"
									key={numeroPagina}
									onClick={() => onPaginaChange(numeroPagina)}
									disabled={loading}
									className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 disabled:cursor-not-allowed ${
										isAtual
											? 'z-10 bg-blue-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
											: 'text-gray-900 hover:bg-gray-50'
									}`}
								>
									{numeroPagina}
								</button>
							)
						})}

						{/* Botão Próximo */}
						<button
							type="button"
							onClick={proximaPagina}
							disabled={!podeAvancar || loading}
							className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<span className="sr-only">Próxima página</span>
							<svg
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</nav>
				</div>
			</div>
		</div>
	)
}
