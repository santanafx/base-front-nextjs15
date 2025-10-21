import { z } from 'zod'
import { ProdutoUnidadeMedidaEnum } from '../enums'

export const ProdutoDimensoesSchema = z
	.object({
		altura: z.number().positive('Altura deve ser um número positivo'),
		largura: z.number().positive('Largura deve ser um número positivo'),
		profundidade: z
			.number()
			.positive('Profundidade deve ser um número positivo'),
		unidade: z.nativeEnum(ProdutoUnidadeMedidaEnum),
	})
	.optional()
