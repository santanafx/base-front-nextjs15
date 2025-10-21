import { z } from 'zod'

export const ProdutoEstoqueSchema = z.object({
	produtoId: z.string().uuid('ID do produto deve ser um UUID válido'),
	quantidade: z
		.number()
		.int('Quantidade deve ser um número inteiro')
		.min(0, 'Quantidade não pode ser negativa'),
	reservado: z
		.number()
		.int('Quantidade reservada deve ser um número inteiro')
		.min(0, 'Quantidade reservada não pode ser negativa'),
	disponivel: z
		.number()
		.int('Quantidade disponível deve ser um número inteiro')
		.min(0, 'Quantidade disponível não pode ser negativa'),
	localizacao: z
		.string()
		.max(100, 'Localização deve ter no máximo 100 caracteres')
		.optional(),
})
