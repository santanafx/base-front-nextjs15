import { z } from 'zod'
import { ProdutoCategoriaEnum, ProdutoStatusEnum } from '../enums'
import { ProdutoDimensoesSchema } from './ProdutoDimensoesSchema'

export const ProdutoSchema = z.object({
	id: z.string().uuid('ID deve ser um UUID válido'),
	nome: z
		.string()
		.min(2, 'Nome deve ter pelo menos 2 caracteres')
		.max(100, 'Nome deve ter no máximo 100 caracteres'),
	descricao: z
		.string()
		.min(10, 'Descrição deve ter pelo menos 10 caracteres')
		.max(1000, 'Descrição deve ter no máximo 1000 caracteres'),
	preco: z
		.number()
		.positive('Preço deve ser um número positivo')
		.max(999999.99, 'Preço deve ser menor que R$ 999.999,99'),
	categoria: z.nativeEnum(ProdutoCategoriaEnum),
	status: z.nativeEnum(ProdutoStatusEnum),
	imagemUrl: z.string().url('URL da imagem inválida').optional(),
	estoque: z
		.number()
		.int('Estoque deve ser um número inteiro')
		.min(0, 'Estoque não pode ser negativo'),
	sku: z
		.string()
		.min(3, 'SKU deve ter pelo menos 3 caracteres')
		.max(50, 'SKU deve ter no máximo 50 caracteres')
		.regex(
			/^[A-Z0-9-_]+$/,
			'SKU deve conter apenas letras maiúsculas, números, hífens e underscores'
		),
	peso: z.number().positive('Peso deve ser um número positivo').optional(),
	dimensoes: ProdutoDimensoesSchema,
	criadoEm: z.date(),
	atualizadoEm: z.date(),
})
