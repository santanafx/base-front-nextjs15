import { useCallback, useMemo } from 'react'

interface UseProdutoPaginacaoProps {
	paginaAtual: number
	totalPaginas: number
	onPaginaChange: (pagina: number) => void
}

interface UseProdutoPaginacaoReturn {
	paginaAtual: number
	totalPaginas: number
	onPaginaChange: (pagina: number) => void
	gerarNumerosPaginas: () => (number | string)[]
	podeAvancar: boolean
	podeVoltar: boolean
	proximaPagina: () => void
	paginaAnterior: () => void
}

export function useProdutoPaginacao({
	paginaAtual,
	totalPaginas,
	onPaginaChange,
}: UseProdutoPaginacaoProps): UseProdutoPaginacaoReturn {
	const gerarNumerosPaginas = useCallback(() => {
		const paginas: (number | string)[] = []
		const delta = 2 // Número de páginas para mostrar antes e depois da atual

		// Primeira página
		if (paginaAtual - delta > 1) {
			paginas.push(1)
			if (paginaAtual - delta > 2) {
				paginas.push('...')
			}
		}

		// Páginas ao redor da atual
		for (
			let i = Math.max(1, paginaAtual - delta);
			i <= Math.min(totalPaginas, paginaAtual + delta);
			i++
		) {
			paginas.push(i)
		}

		// Última página
		if (paginaAtual + delta < totalPaginas) {
			if (paginaAtual + delta < totalPaginas - 1) {
				paginas.push('...')
			}
			paginas.push(totalPaginas)
		}

		return paginas
	}, [paginaAtual, totalPaginas])

	const podeAvancar = useMemo(
		() => paginaAtual < totalPaginas,
		[paginaAtual, totalPaginas]
	)
	const podeVoltar = useMemo(() => paginaAtual > 1, [paginaAtual])

	const proximaPagina = useCallback(() => {
		if (podeAvancar) {
			onPaginaChange(paginaAtual + 1)
		}
	}, [podeAvancar, onPaginaChange, paginaAtual])

	const paginaAnterior = useCallback(() => {
		if (podeVoltar) {
			onPaginaChange(paginaAtual - 1)
		}
	}, [podeVoltar, onPaginaChange, paginaAtual])

	return {
		paginaAtual,
		totalPaginas,
		onPaginaChange,
		gerarNumerosPaginas,
		podeAvancar,
		podeVoltar,
		proximaPagina,
		paginaAnterior,
	}
}
