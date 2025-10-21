import { useCallback, useMemo, useState } from 'react'
import type { ProdutoFiltros } from '../interfaces/ProdutoFiltros'
import { ProdutoFiltrosSchema } from '../schemas/ProdutoFiltrosSchema'

type OrdenacaoOpcoes = 'nome' | 'preco' | 'categoria' | 'status' | 'criadoEm'
type DirecaoOrdenacao = 'asc' | 'desc'

interface ProdutoFiltrosCompleto extends ProdutoFiltros {
	ordenacao?: OrdenacaoOpcoes
	direcaoOrdenacao?: DirecaoOrdenacao
}

interface UseFiltrosProdutoReturn {
	filtros: ProdutoFiltrosCompleto
	filtrosAtivos: boolean
	// Ações de filtro
	definirFiltros: (novosFiltros: Partial<ProdutoFiltrosCompleto>) => void
	limparFiltros: () => void
	// Ações específicas (convenientes)
	alterarCategoria: (categoria: string) => void
	alterarStatus: (status: string) => void
	alterarPrecoMin: (preco: number | undefined) => void
	alterarPrecoMax: (preco: number | undefined) => void
	alterarBusca: (busca: string) => void
	// Validação
	validarFiltros: (filtros: ProdutoFiltros) => {
		sucesso: boolean
		erros?: Record<string, string[]>
	}
	// Helpers
	contarFiltrosAtivos: () => number
	obterTextoFiltros: () => string
}

const filtrosIniciais: ProdutoFiltrosCompleto = {
	busca: '',
	categoria: undefined,
	status: undefined,
	precoMin: undefined,
	precoMax: undefined,
	ordenacao: 'nome',
	direcaoOrdenacao: 'asc',
}

export function useProdutoFiltros(): UseFiltrosProdutoReturn {
	const [filtros, setFiltros] =
		useState<ProdutoFiltrosCompleto>(filtrosIniciais)

	// Verifica se há filtros ativos
	const filtrosAtivos = useMemo(() => {
		return (
			filtros.busca !== '' ||
			filtros.categoria !== undefined ||
			filtros.status !== undefined ||
			filtros.precoMin !== undefined ||
			filtros.precoMax !== undefined ||
			filtros.ordenacao !== 'nome' ||
			filtros.direcaoOrdenacao !== 'asc'
		)
	}, [filtros])

	const validarFiltros = useCallback((filtros: ProdutoFiltros) => {
		try {
			ProdutoFiltrosSchema.parse(filtros)
			return { sucesso: true }
		} catch (err: unknown) {
			return {
				sucesso: false,
				erros: (err as { errors?: { message: string }[] })?.errors?.reduce(
					(acc, error) => {
						acc.geral = acc.geral || []
						acc.geral.push(error.message)
						return acc
					},
					{} as Record<string, string[]>
				) || { geral: ['Filtros inválidos'] },
			}
		}
	}, [])

	const definirFiltros = useCallback(
		(novosFiltros: Partial<ProdutoFiltrosCompleto>) => {
			setFiltros((filtrosAtuais) => {
				const filtrosAtualizados = { ...filtrosAtuais, ...novosFiltros }

				// Valida apenas os filtros básicos (não incluindo ordenação)
				const filtrosBasicos: ProdutoFiltros = {
					busca: filtrosAtualizados.busca,
					categoria: filtrosAtualizados.categoria,
					status: filtrosAtualizados.status,
					precoMin: filtrosAtualizados.precoMin,
					precoMax: filtrosAtualizados.precoMax,
				}

				const validacao = validarFiltros(filtrosBasicos)
				if (!validacao.sucesso) {
					console.warn('Filtros inválidos:', validacao.erros)
					return filtrosAtuais // Mantém os filtros atuais se inválidos
				}

				return filtrosAtualizados
			})
		},
		[validarFiltros]
	)

	const limparFiltros = useCallback(() => {
		setFiltros(filtrosIniciais)
	}, [])

	const contarFiltrosAtivos = useCallback(() => {
		let contador = 0

		if (filtros.busca !== '') contador++
		if (filtros.categoria !== undefined) contador++
		if (filtros.status !== undefined) contador++
		if (filtros.precoMin !== undefined) contador++
		if (filtros.precoMax !== undefined) contador++
		if (filtros.ordenacao !== 'nome') contador++
		if (filtros.direcaoOrdenacao !== 'asc') contador++

		return contador
	}, [filtros])

	const obterTextoFiltros = useCallback(() => {
		const partes: string[] = []

		if (filtros.busca) {
			partes.push(`Busca: "${filtros.busca}"`)
		}

		if (filtros.categoria) {
			partes.push(`Categoria: ${filtros.categoria}`)
		}

		if (filtros.status) {
			partes.push(`Status: ${filtros.status}`)
		}

		if (filtros.precoMin !== undefined || filtros.precoMax !== undefined) {
			if (filtros.precoMin !== undefined && filtros.precoMax !== undefined) {
				partes.push(`Preço: R$ ${filtros.precoMin} - R$ ${filtros.precoMax}`)
			} else if (filtros.precoMin !== undefined) {
				partes.push(`Preço mínimo: R$ ${filtros.precoMin}`)
			} else if (filtros.precoMax !== undefined) {
				partes.push(`Preço máximo: R$ ${filtros.precoMax}`)
			}
		}

		if (filtros.ordenacao !== 'nome' || filtros.direcaoOrdenacao !== 'asc') {
			const direcao =
				filtros.direcaoOrdenacao === 'asc' ? 'Crescente' : 'Decrescente'
			partes.push(`Ordenação: ${filtros.ordenacao} (${direcao})`)
		}

		return partes.length > 0 ? partes.join(' • ') : 'Nenhum filtro ativo'
	}, [filtros])

	// Métodos convenientes para alterar filtros específicos
	const alterarCategoria = useCallback(
		(categoria: string) => {
			definirFiltros({ categoria: categoria || undefined })
		},
		[definirFiltros]
	)

	const alterarStatus = useCallback(
		(status: string) => {
			definirFiltros({ status: status || undefined })
		},
		[definirFiltros]
	)

	const alterarPrecoMin = useCallback(
		(preco: number | undefined) => {
			definirFiltros({ precoMin: preco })
		},
		[definirFiltros]
	)

	const alterarPrecoMax = useCallback(
		(preco: number | undefined) => {
			definirFiltros({ precoMax: preco })
		},
		[definirFiltros]
	)

	const alterarBusca = useCallback(
		(busca: string) => {
			definirFiltros({ busca })
		},
		[definirFiltros]
	)

	return {
		filtros,
		filtrosAtivos,
		definirFiltros,
		limparFiltros,
		alterarCategoria,
		alterarStatus,
		alterarPrecoMin,
		alterarPrecoMax,
		alterarBusca,
		validarFiltros,
		contarFiltrosAtivos,
		obterTextoFiltros,
	}
}
