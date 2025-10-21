import type { ProdutoEstoque } from '../interfaces/ProdutoEstoque'

export const ProdutoEstoqueMock: ProdutoEstoque[] = [
	{
		produtoId: '550e8400-e29b-41d4-a716-446655440001',
		quantidade: 25,
		reservado: 3,
		disponivel: 22,
		localizacao: 'A-01-15',
	},
	{
		produtoId: '550e8400-e29b-41d4-a716-446655440002',
		quantidade: 150,
		reservado: 12,
		disponivel: 138,
		localizacao: 'B-05-30',
	},
	{
		produtoId: '550e8400-e29b-41d4-a716-446655440003',
		quantidade: 8,
		reservado: 1,
		disponivel: 7,
		localizacao: 'C-02-08',
	},
	{
		produtoId: '550e8400-e29b-41d4-a716-446655440004',
		quantidade: 12,
		reservado: 0,
		disponivel: 12,
		localizacao: 'D-10-01',
	},
	{
		produtoId: '550e8400-e29b-41d4-a716-446655440005',
		quantidade: 45,
		reservado: 5,
		disponivel: 40,
		localizacao: 'B-03-22',
	},
	{
		produtoId: '550e8400-e29b-41d4-a716-446655440006',
		quantidade: 30,
		reservado: 2,
		disponivel: 28,
		localizacao: 'E-01-05',
	},
]
