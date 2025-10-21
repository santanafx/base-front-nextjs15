import { SessionProvider } from 'next-auth/react'
import AuthDemo from '@/components/AuthDemo'

export default function TestePage() {
	return (
		<SessionProvider>
			<div className="min-h-screen bg-gray-100 py-8">
				<div className="container mx-auto">
					<h1 className="text-3xl font-bold text-center mb-8">
						Teste das Páginas Built-in do NextAuth
					</h1>
					<AuthDemo />
				</div>
			</div>
		</SessionProvider>
	)
}
