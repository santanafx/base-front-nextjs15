import { type NextRequest, NextResponse } from 'next/server'
import { auth } from './libs/auth-js/auth'

// Configuração de rotas
const ROUTE_CONFIG = {
	// Rotas públicas (não requerem autenticação)
	publicRoutes: ['/auth/*', '/api/auth/*', '/produtos'],

	// Rotas protegidas por autenticação
	protectedRoutes: ['/*'],

	// Rotas que requerem roles específicos
	roleBasedRoutes: {
		'/admin': ['admin'],
		'/admin/users': ['admin', 'user-manager'],
		'/admin/settings': ['admin'],
		'/moderator': ['admin', 'moderator'],
	},

	// Rotas de redirecionamento
	redirects: {
		authenticated: '/me', // Para onde redirecionar usuários logados
		unauthenticated: '/auth/login', // Para onde redirecionar usuários não logados
		unauthorized: '/403', // Para onde redirecionar usuários sem permissão
	},
} as const

// interface MiddlewareContext {
// 	request: NextRequest;
// 	session: Session | null;
// 	pathname: string;
// }

// Função para verificar se a rota é pública
function isPublicRoute(pathname: string): boolean {
	return ROUTE_CONFIG.publicRoutes.some((route) => {
		if (route === pathname) return true
		if (route.endsWith('*')) {
			const baseRoute = route.slice(0, -1)
			return pathname.startsWith(baseRoute)
		}
		return false
	})
}

// Função para verificar se a rota é protegida
function isProtectedRoute(pathname: string): boolean {
	return ROUTE_CONFIG.protectedRoutes.some((route) => {
		if (route === pathname) return true
		if (route.endsWith('*')) {
			const baseRoute = route.slice(0, -1)
			return pathname.startsWith(baseRoute)
		}
		return false
	})
}

// Função para verificar se a rota requer roles específicos
function getRequiredRoles(pathname: string): string[] | null {
	for (const [route, roles] of Object.entries(ROUTE_CONFIG.roleBasedRoutes)) {
		if (
			route === pathname ||
			(route.endsWith('*') && pathname.startsWith(route.slice(0, -1)))
		) {
			//FAZER IMPLEMENTAÇÃO COM SERVIDOR
			return [...roles] // Converter readonly array para array mutável
		}
	}
	return null
}

// Função para criar resposta de redirecionamento
function createRedirectResponse(
	request: NextRequest,
	path: string
): NextResponse {
	const url = new URL(path, request.url)
	return NextResponse.redirect(url)
}

// Middleware principal
export default auth(async function middleware(request: NextRequest) {
	const session = await auth()
	const pathname = request.nextUrl.pathname

	//   const context: MiddlewareContext = {
	//     request,
	//     session,
	//     pathname,
	//   };

	// Log para debug (remover em produção)
	console.log(
		`[Middleware] ${pathname} - User: ${session?.user?.email || 'Anonymous'}`
	)

	// 1. Permitir todas as rotas públicas
	if (isPublicRoute(pathname)) {
		// Se usuário está logado e tenta acessar página de login, redirecionar para dashboard
		if (session?.user && pathname === '/auth/login') {
			return createRedirectResponse(
				request,
				ROUTE_CONFIG.redirects.authenticated
			)
		}
		return NextResponse.next()
	}

	// 2. Verificar autenticação para rotas protegidas
	const requiredRoles = getRequiredRoles(pathname)
	if (!session?.user) {
		// Usuário não autenticado tentando acessar rota protegida
		if (isProtectedRoute(pathname) || requiredRoles) {
			return createRedirectResponse(
				request,
				ROUTE_CONFIG.redirects.unauthenticated
			)
		}
		return NextResponse.next()
	}

	// 3. Verificar roles para rotas específicas

	if (requiredRoles) {
		//FAZER IMPLEMENTAÇÃO DE ROLES AQUI
	}

	// 4. Permitir acesso - lógica customizada pode ser adicionada aqui
	return NextResponse.next()
})

// Configuração do matcher para otimização
export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)'],
}
