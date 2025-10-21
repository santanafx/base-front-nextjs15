import type { Session } from "next-auth";
import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";

// Provider customizado para autenticação com usuário e senha
const CustomUserPasswordProvider = {
  id: "custom-auth",
  name: "Autenticação Customizada",
  type: "credentials" as const,
  credentials: {
    usuario: {
      label: "Usuário",
      type: "text",
      placeholder: "Digite seu usuário",
    },
    senha: {
      label: "Senha",
      type: "password",
      placeholder: "Digite sua senha",
    },
  },
  async authorize(credentials: Partial<Record<string, unknown>>) {
    if (!credentials?.usuario || !credentials?.senha) {
      throw new Error("Usuário e senha são obrigatórios");
    }

    const { usuario, senha } = credentials as {
      usuario: string;
      senha: string;
    };

    // Simulação de delay da API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Dados mockados - diferentes usuários para teste
    const usuariosMock = {
      admin: {
        id: "1",
        usuario: "admin",
        nome: "Administrador do Sistema",
        email: "admin@empresa.com",
        perfil: "ADMIN",
        permissoes: ["READ", "WRITE", "DELETE", "ADMIN_PANEL"],
        senha: "admin123",
      },
      user: {
        id: "2",
        usuario: "user",
        nome: "Usuário Padrão",
        email: "user@empresa.com",
        perfil: "USER",
        permissoes: ["READ"],
        senha: "user123",
      },
      manager: {
        id: "3",
        usuario: "manager",
        nome: "Gerente",
        email: "manager@empresa.com",
        perfil: "MANAGER",
        permissoes: ["READ", "WRITE"],
        senha: "manager123",
      },
    };

    // Busca o usuário mock
    const usuarioMock = usuariosMock[usuario as keyof typeof usuariosMock];

    // Verifica se usuário existe e senha está correta
    if (!usuarioMock || usuarioMock.senha !== senha) {
      throw new Error("Usuário ou senha inválidos");
    }

    // Retorna dados mockados do usuário autenticado
    return {
      id: usuarioMock.id,
      email: usuarioMock.email,
      name: usuarioMock.nome,
      usuario: usuarioMock.usuario,
      accessToken: `mock-jwt-token-${usuarioMock.id}-${Date.now()}`,
      refreshToken: `mock-refresh-token-${usuarioMock.id}-${Date.now()}`,
      perfil: usuarioMock.perfil,
      permissoes: usuarioMock.permissoes,
    };
  },
};

// Função para renovar o access token
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: token.refreshToken,
        }),
      }
    );

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 horas
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Erro ao renovar token:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [CustomUserPasswordProvider],

  // Configuração para usar páginas customizadas
  pages: {
    signIn: "/auth/login", // Página de login customizada
    signOut: "/auth/signout", // Página de logout (opcional)
    error: "/auth/error", // Página de erro (opcional)
  },

  callbacks: {
    async jwt({ token, user, account }): Promise<JWT> {
      // Primeira vez que o usuário faz login
      if (user && account) {
        token.id = user.id;
        token.accessTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 horas
      }

      // Verifica se o token ainda é válido
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Token expirado, tenta renovar
      return await refreshAccessToken(token);
    },

    async session({ session, token }): Promise<Session> {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  // Configurações adicionais para as páginas built-in
  theme: {
    colorScheme: "light", // ou "dark" ou "auto"
    brandColor: "#1f2937", // Cor principal
    logo: "/logo.png", // Logo da empresa (opcional)
  },

  // Configurações de debug (remover em produção)
  debug: process.env.NODE_ENV === "development",
});
