import { useCallback, useState } from 'react'
import type { Produto } from '../interfaces/Produto'
import type { ProdutoFormData } from '../interfaces/ProdutoFormData'
import { ProdutoFuncaoBuscarPorId } from '../mocks/ProdutoFuncaoBuscarPorId'
import { ProdutoMock } from '../mocks/ProdutoMock'
import { ProdutoFormDataSchema } from '../schemas/ProdutoFormDataSchema'

interface UseProdutoReturn {
	produto: Produto | null
	loading: boolean
	error: string | null
	// Ações
	buscarProduto: (id: string) => Promise<void>
	criarProduto: (dados: ProdutoFormData) => Promise<Produto>
	atualizarProduto: (id: string, dados: ProdutoFormData) => Promise<Produto>
	excluirProduto: (id: string) => Promise<void>
	validarDados: (dados: ProdutoFormData) => {
		sucesso: boolean
		erros?: Record<string, string[]>
	}
}

export function useProduto(): UseProdutoReturn {
	const [produto, setProduto] = useState<Produto | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const buscarProduto = useCallback(async (id: string) => {
		setLoading(true)
		setError(null)

		try {
			// Simula delay de API
			await new Promise((resolve) => setTimeout(resolve, 200))

			const produtoEncontrado = ProdutoFuncaoBuscarPorId(id)

			if (!produtoEncontrado) {
				throw new Error('Produto não encontrado')
			}

			setProduto(produtoEncontrado)
		} catch (err) {
			const mensagem =
				err instanceof Error ? err.message : 'Erro ao buscar produto'
			setError(mensagem)
			setProduto(null)
		} finally {
			setLoading(false)
		}
	}, [])

	const validarDados = useCallback((dados: ProdutoFormData) => {
		try {
			ProdutoFormDataSchema.parse(dados)
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
				) || { geral: ['Dados inválidos'] },
			}
		}
	}, [])

	const criarProduto = useCallback(
		async (dados: ProdutoFormData): Promise<Produto> => {
			setLoading(true)
			setError(null)

			try {
				// Valida os dados
				const validacao = validarDados(dados)
				if (!validacao.sucesso) {
					throw new Error('Dados inválidos')
				}

				// Simula delay de API
				await new Promise((resolve) => setTimeout(resolve, 500))

				// Verifica se SKU já existe
				const skuExiste = ProdutoMock.some((p) => p.sku === dados.sku)
				if (skuExiste) {
					throw new Error('SKU já existe')
				}

				// Cria novo produto
				const novoProduto: Produto = {
					id: `550e8400-e29b-41d4-a716-${Date.now()}`,
					...dados,
					criadoEm: new Date(),
					atualizadoEm: new Date(),
				}

				// Simula adição ao banco (em uma aplicação real seria uma chamada de API)
				ProdutoMock.push(novoProduto)

				setProduto(novoProduto)
				return novoProduto
			} catch (err) {
				const mensagem =
					err instanceof Error ? err.message : 'Erro ao criar produto'
				setError(mensagem)
				throw err
			} finally {
				setLoading(false)
			}
		},
		[validarDados]
	)

	const atualizarProduto = useCallback(
		async (id: string, dados: ProdutoFormData): Promise<Produto> => {
			setLoading(true)
			setError(null)

			try {
				// Valida os dados
				const validacao = validarDados(dados)
				if (!validacao.sucesso) {
					throw new Error('Dados inválidos')
				}

				// Simula delay de API
				await new Promise((resolve) => setTimeout(resolve, 500))

				const indice = ProdutoMock.findIndex((p) => p.id === id)
				if (indice === -1) {
					throw new Error('Produto não encontrado')
				}

				// Verifica se SKU já existe em outro produto
				const skuExiste = ProdutoMock.some(
					(p) => p.sku === dados.sku && p.id !== id
				)
				if (skuExiste) {
					throw new Error('SKU já existe')
				}

				// Atualiza produto
				const produtoAtualizado: Produto = {
					...ProdutoMock[indice],
					...dados,
					atualizadoEm: new Date(),
				}

				// Simula atualização no banco
				ProdutoMock[indice] = produtoAtualizado

				setProduto(produtoAtualizado)
				return produtoAtualizado
			} catch (err) {
				const mensagem =
					err instanceof Error ? err.message : 'Erro ao atualizar produto'
				setError(mensagem)
				throw err
			} finally {
				setLoading(false)
			}
		},
		[validarDados]
	)

	const excluirProduto = useCallback(
		async (id: string): Promise<void> => {
			setLoading(true)
			setError(null)

			try {
				// Simula delay de API
				await new Promise((resolve) => setTimeout(resolve, 300))

				const indice = ProdutoMock.findIndex((p) => p.id === id)
				if (indice === -1) {
					throw new Error('Produto não encontrado')
				}

				// Simula exclusão do banco
				ProdutoMock.splice(indice, 1)

				if (produto?.id === id) {
					setProduto(null)
				}
			} catch (err) {
				const mensagem =
					err instanceof Error ? err.message : 'Erro ao excluir produto'
				setError(mensagem)
				throw err
			} finally {
				setLoading(false)
			}
		},
		[produto]
	)

	return {
		produto,
		loading,
		error,
		buscarProduto,
		criarProduto,
		atualizarProduto,
		excluirProduto,
		validarDados,
	}
}
