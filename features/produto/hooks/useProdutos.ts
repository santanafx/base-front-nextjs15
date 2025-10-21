import { useCallback, useEffect, useState } from 'react'
import { ProdutoOrdenacaoEnum } from '../enums/ProdutoOrdenacaoEnum'
import type { Produto } from '../interfaces/Produto'
import type { ProdutoFiltros } from '../interfaces/ProdutoFiltros'
import { ProdutoMock } from '../mocks/ProdutoMock'

interface UseProdutosOptions {
	filtros?: ProdutoFiltros
	ordenacao?: ProdutoOrdenacaoEnum
	pagina?: number
	limite?: number
}

interface UseProdutosReturn {
	produtos: Produto[]
	loading: boolean
	error: string | null
	total: number
	totalPaginas: number
	paginaAtual: number
	filtros: ProdutoFiltros
	ordenacao: ProdutoOrdenacaoEnum
	// Ações
	buscarProdutos: (novosFiltros?: ProdutoFiltros) => void
	alterarOrdenacao: (novaOrdenacao: ProdutoOrdenacaoEnum) => void
	alterarPagina: (novaPagina: number) => void
	limparFiltros: () => void
}

export function useProdutos(
	options: UseProdutosOptions = {}
): UseProdutosReturn {
	const {
		filtros: filtrosIniciais = {},
		ordenacao: ordenacaoInicial = ProdutoOrdenacaoEnum.NOME_ASC,
		pagina: paginaInicial = 1,
		limite = 10,
	} = options

	const [produtos, setProdutos] = useState<Produto[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [total, setTotal] = useState(0)
	const [filtros, setFiltros] = useState<ProdutoFiltros>(filtrosIniciais)
	const [ordenacao, setOrdenacao] =
		useState<ProdutoOrdenacaoEnum>(ordenacaoInicial)
	const [paginaAtual, setPaginaAtual] = useState(paginaInicial)

	const aplicarFiltros = useCallback(
		(produtosBase: Produto[], filtrosAtivos: ProdutoFiltros): Produto[] => {
			let produtosFiltrados = [...produtosBase]

			// Filtro por categoria
			if (filtrosAtivos.categoria) {
				produtosFiltrados = produtosFiltrados.filter(
					(produto) => produto.categoria === filtrosAtivos.categoria
				)
			}

			// Filtro por status
			if (filtrosAtivos.status) {
				produtosFiltrados = produtosFiltrados.filter(
					(produto) => produto.status === filtrosAtivos.status
				)
			}

			// Filtro por preço mínimo
			if (filtrosAtivos.precoMin !== undefined) {
				const precoMin = filtrosAtivos.precoMin
				produtosFiltrados = produtosFiltrados.filter(
					(produto) => produto.preco >= precoMin
				)
			}

			// Filtro por preço máximo
			if (filtrosAtivos.precoMax !== undefined) {
				const precoMax = filtrosAtivos.precoMax
				produtosFiltrados = produtosFiltrados.filter(
					(produto) => produto.preco <= precoMax
				)
			}

			// Filtro por busca textual
			if (filtrosAtivos.busca) {
				const termoBusca = filtrosAtivos.busca.toLowerCase()
				produtosFiltrados = produtosFiltrados.filter(
					(produto) =>
						produto.nome.toLowerCase().includes(termoBusca) ||
						produto.descricao.toLowerCase().includes(termoBusca) ||
						produto.sku.toLowerCase().includes(termoBusca)
				)
			}

			return produtosFiltrados
		},
		[]
	)

	const aplicarOrdenacao = useCallback(
		(
			produtosBase: Produto[],
			ordenacaoAtiva: ProdutoOrdenacaoEnum
		): Produto[] => {
			const produtosOrdenados = [...produtosBase]

			switch (ordenacaoAtiva) {
				case ProdutoOrdenacaoEnum.NOME_ASC:
					return produtosOrdenados.sort((a, b) => a.nome.localeCompare(b.nome))
				case ProdutoOrdenacaoEnum.NOME_DESC:
					return produtosOrdenados.sort((a, b) => b.nome.localeCompare(a.nome))
				case ProdutoOrdenacaoEnum.PRECO_ASC:
					return produtosOrdenados.sort((a, b) => a.preco - b.preco)
				case ProdutoOrdenacaoEnum.PRECO_DESC:
					return produtosOrdenados.sort((a, b) => b.preco - a.preco)
				case ProdutoOrdenacaoEnum.DATA_ASC:
					return produtosOrdenados.sort(
						(a, b) => a.criadoEm.getTime() - b.criadoEm.getTime()
					)
				case ProdutoOrdenacaoEnum.DATA_DESC:
					return produtosOrdenados.sort(
						(a, b) => b.criadoEm.getTime() - a.criadoEm.getTime()
					)
				case ProdutoOrdenacaoEnum.ESTOQUE_ASC:
					return produtosOrdenados.sort((a, b) => a.estoque - b.estoque)
				case ProdutoOrdenacaoEnum.ESTOQUE_DESC:
					return produtosOrdenados.sort((a, b) => b.estoque - a.estoque)
				default:
					return produtosOrdenados
			}
		},
		[]
	)

	const buscarProdutos = useCallback(
		async (novosFiltros?: ProdutoFiltros) => {
			setLoading(true)
			setError(null)

			try {
				// Simula delay de API
				await new Promise((resolve) => setTimeout(resolve, 300))

				const filtrosAtivos = novosFiltros || filtros

				// Aplica filtros
				let produtosFiltrados = aplicarFiltros(ProdutoMock, filtrosAtivos)

				// Aplica ordenação
				produtosFiltrados = aplicarOrdenacao(produtosFiltrados, ordenacao)

				// Calcula paginação
				const totalItens = produtosFiltrados.length
				const _totalPaginasCalculado = Math.ceil(totalItens / limite)
				const inicio = (paginaAtual - 1) * limite
				const fim = inicio + limite
				const produtosPaginados = produtosFiltrados.slice(inicio, fim)

				setProdutos(produtosPaginados)
				setTotal(totalItens)

				if (novosFiltros) {
					setFiltros(novosFiltros)
					setPaginaAtual(1) // Reset página ao filtrar
				}
			} catch (err) {
				setError('Erro ao buscar produtos')
				console.error('Erro ao buscar produtos:', err)
			} finally {
				setLoading(false)
			}
		},
		[filtros, ordenacao, paginaAtual, limite, aplicarFiltros, aplicarOrdenacao]
	)

	const alterarOrdenacao = useCallback(
		(novaOrdenacao: ProdutoOrdenacaoEnum) => {
			setOrdenacao(novaOrdenacao)
			setPaginaAtual(1) // Reset página ao ordenar
		},
		[]
	)

	const alterarPagina = useCallback((novaPagina: number) => {
		setPaginaAtual(novaPagina)
	}, [])

	const limparFiltros = useCallback(() => {
		setFiltros({})
		setPaginaAtual(1)
	}, [])

	// Efeito para buscar produtos quando filtros, ordenação ou página mudarem
	useEffect(() => {
		buscarProdutos()
	}, [buscarProdutos])

	const totalPaginas = Math.ceil(total / limite)

	return {
		produtos,
		loading,
		error,
		total,
		totalPaginas,
		paginaAtual,
		filtros,
		ordenacao,
		buscarProdutos,
		alterarOrdenacao,
		alterarPagina,
		limparFiltros,
	}
}
