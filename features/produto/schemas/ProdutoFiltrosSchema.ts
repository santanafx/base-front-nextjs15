import { z } from 'zod'
import { ProdutoCategoriaEnum } from '../enums/ProdutoCategoriaEnum'
import { ProdutoStatusEnum } from '../enums/ProdutoStatusEnum'

export const ProdutoFiltrosSchema = z
	.object({
		categoria: z.nativeEnum(ProdutoCategoriaEnum).optional(),
		status: z.nativeEnum(ProdutoStatusEnum).optional(),
		precoMin: z
			.number()
			.min(0, 'Preço mínimo deve ser maior ou igual a 0')
			.optional(),
		precoMax: z
			.number()
			.min(0, 'Preço máximo deve ser maior ou igual a 0')
			.optional(),
		busca: z
			.string()
			.max(100, 'Busca deve ter no máximo 100 caracteres')
			.optional(),
	})
	.refine(
		(data) => {
			if (data.precoMin && data.precoMax) {
				return data.precoMin <= data.precoMax
			}
			return true
		},
		{
			message: 'Preço mínimo deve ser menor ou igual ao preço máximo',
			path: ['precoMax'],
		}
	)
