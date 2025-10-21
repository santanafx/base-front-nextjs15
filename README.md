# Base Frontend Next.js 15

**Base Frontend** é um projeto de boilerplate para aplicações Next.js 15 com arquitetura feature-based e padrão Hook Controller + View. Utiliza as mais modernas tecnologias do ecossistema React para construir aplicações robustas, tipadas e escaláveis.

<!-- TOC -->

- [Base Frontend Next.js 15](#base-frontend-nextjs-15)
  - [Scripts Disponíveis](#scripts-disponíveis)
  - [Stack & Ferramentas](#stack--ferramentas)
  - [Arquitetura](#arquitetura)
  - [Estrutura de Pastas](#estrutura-de-pastas)
  - [Regras de Desenvolvimento](#regras-de-desenvolvimento)
  - [Guia de Features](#guia-de-features)
  - [Ferramentas de Desenvolvimento](#ferramentas-de-desenvolvimento)
  - [Configuração & Ambiente](#configuração-e-ambiente)
  - [FAQ](#faq)

<!-- /TOC -->

## Scripts Disponíveis

```bash
npm run dev          # Servidor desenvolvimento com Turbopack
npm run build        # Build otimizado para produção
npm start            # Servidor de produção
npm run lint         # Executa Biome linter
npm run format       # Formata código com Biome
```

## Stack & Ferramentas

| Categoria         | Tecnologia               | Versão        | Propósito                        |
| ----------------- | ------------------------ | ------------- | -------------------------------- |
| **Core**          | Next.js                  | 15.5.3        | Framework React com App Router   |
|                   | React                    | 19.1.0        | Biblioteca de interface          |
|                   | TypeScript               | 5             | Tipagem estática                 |
| **Estado & Data** | TanStack Query           | 5.90.2        | Gerenciamento de estado servidor |
|                   | React Hook Form          | 1.23.7        | Gerenciamento de formulários     |
|                   | TanStack React Table     | 8.21.3        | Componentes de tabela            |
|                   | Zustand                  | 5.0.8         | Store global de estado           |
| **Validação**     | Zod                      | 4.1.12        | Validação de schemas             |
| **HTTP**          | Axios                    | 1.12.2        | Cliente HTTP                     |
| **Autenticação**  | NextAuth.js              | 5.0.0-beta.29 | Autenticação e autorização       |
| **UI & Estilo**   | TailwindCSS              | 4             | Framework CSS utilitário         |
|                   | Lucide React             | 0.545.0       | Ícones                           |
|                   | React Icons              | 5.5.0         | Biblioteca de ícones             |
|                   | Class Variance Authority | 0.7.1         | Variantes de componentes         |
|                   | Clsx                     | 2.1.1         | Utilitário de classes CSS        |
|                   | Tailwind Merge           | 3.3.1         | Merge inteligente de classes     |
| **Utilitários**   | Date-fns                 | 4.1.0         | Manipulação de datas             |
|                   | React Markdown           | 10.1.0        | Renderização de Markdown         |
|                   | Sharp                    | 0.34.4        | Otimização de imagens            |
| **Dev Tools**     | Biome                    | 2.2.0         | Linter e formatter               |

_Referências: `package.json`_

## Arquitetura

Este projeto segue uma **arquitetura feature-based modular** combinada com o padrão **Hook Controller + View**, organizando o código em camadas bem definidas:

### Princípios Arquiteturais

1. **Feature-based**: Cada funcionalidade é auto-contida em `features/[nome]/`
2. **Hook Controller + View**: Separação clara entre lógica (controllers/hooks) e apresentação (components)
3. **Shared Resources**: Recursos reutilizáveis em `shared/`
4. **Libs Integration**: Integrações externas em `libs/`
5. **Core Utilities**: Utilitários base em `core/`

_Referências: estrutura de pastas do projeto_

## Estrutura de Pastas

```
├── app/                          # Next.js 15 App Router
│   ├── layout.tsx               # Layout raiz com providers
│   ├── page.tsx                 # Página inicial
│   ├── globals.css              # Estilos globais
│   ├── produtos/page.tsx        # Página de produtos
│   └── auth/                    # Rotas de autenticação
├── features/                     # Features modulares
│   ├── produto/                 # Feature de produtos
│   │   ├── components/          # Views da feature
│   │   ├── controllers/         # Lógica de controle
│   │   ├── hooks/              # Hooks customizados
│   │   ├── interfaces/         # Tipagens TypeScript
│   │   ├── schemas/            # Schemas Zod
│   │   ├── enums/              # Enumerações
│   │   ├── mocks/              # Dados mockados
│   │   └── services/           # Serviços de API
│   └── exemplo/                # Template de feature *(vazio)*
├── shared/                      # Recursos compartilhados
│   ├── components/             # Componentes reutilizáveis *(vazio)*
│   ├── hooks/                  # Hooks globais *(vazio)*
│   └── services/               # Serviços compartilhados *(vazio)*
├── core/                       # Utilitários base *(vazio - N/D)*
└── libs/                       # Integrações externas
    ├── auth-js/                # Configuração NextAuth.js
    └── shad-cn/                # Utilitários shadcn/ui
```

_Referência: estrutura do workspace_

## Regras de Desenvolvimento

### 🏷️ Nomenclatura e Estrutura

#### Regras Gerais

- **Não usar abreviações**: Seja claro nos nomes
- **Pastas**: Sempre em `kebab-case` (exceto subpastas de `services`)
- **Um export por arquivo**: Cada arquivo deve conter apenas um export
- **Evitar export default**: Preferir exports nomeados

#### Prefixos por Camada

1. **Features**: Prefixo deve ser o nome da feature (`ProdutoView`, `ProdutoController`)
2. **Core**: Prefixo deve ser `Core` (`CoreUtils`, `CoreTypes`)
3. **Shared**: Prefixo deve ser o nome do módulo (`AuthUtils`, `ApiService`)

#### Arquivos e Pastas

- **Pastas**: `kebab-case` (`produto`, `auth-js`)
- **Componentes React**: `PascalCase.tsx` (`ProdutoView.tsx`, `ProdutoCard.tsx`)
- **Hooks**: `camelCase.ts` com prefixo `use` (`useProdutos.ts`, `useProdutoFiltros.ts`)
- **Controllers**: `camelCase.ts` com sufixo `Controller` (`useProdutoController.ts`)
- **Interfaces**: `PascalCase.ts` (`Produto.ts`, `ProdutoFiltros.ts`)
- **Schemas**: `PascalCase.ts` com sufixo `Schema` (`ProdutoSchema.ts`)
- **Enums**: `PascalCase.ts` com sufixo `Enum` (`ProdutoStatusEnum.ts`)
- **Services**: `PascalCase` + pasta (`ExemploService/index.ts`)

### 🎣 Hooks

#### Convenções de Nomenclatura

- **Prefixo obrigatório**: `use` seguido de substantivo ou verbo no infinitivo
- **Mutações**: Ação primeiro (`useCreateUser`, `useUpdateProposal`)
- **Controllers**: Sufixo `Controller` (`useProdutoController`)
- **Estado/Controle**: Domínio primeiro (`useUserAuth`, `useProjectController`)

#### Implementação

```typescript
// ✅ Correto - Export nomeado
export function useCreateProduto() {
  return useMutation(/* ... */);
}

// ✅ Correto - Controller
export function useProdutoController() {
  return {
    /* lógica de controle */
  };
}

// ❌ Incorreto - Export default
export default function useProduto() {
  /* ... */
}
```

### 🧩 Componentes

- **Objetivo claro**: Nome deve referenciar o propósito do componente
- **Componentes filhos**: Agrupar em pasta com nome do componente pai
- **Exemplo**:
  ```
  components/
  ├── ProdutoCard/
  │   ├── ProdutoCard.tsx
  │   ├── ProdutoCardHeader.tsx
  │   └── ProdutoCardActions.tsx
  ```

### 📂 Separação de Arquivos por Domínio

1. **Core**: Arquivo não faz parte de nenhum subdomínio específico
2. **Features**: Arquivo faz parte de 1 subdomínio específico
3. **Shared**: Arquivo faz parte de mais de um domínio

#### Fluxograma de Decisão

```
Arquivo pertence a quantos domínios?
├── 0 domínios → core/
├── 1 domínio → features/[dominio]/
└── 2+ domínios → shared/
```

### 📋 Exemplos Práticos

```typescript
// ✅ Correto - Seguindo regras de nomenclatura
features / produto / components / ProdutoView.tsx; // View da feature produto
features / produto / controllers / useProdutoController.ts; // Controller
features / produto / hooks / useProdutos.ts; // Hook de dados
features / produto / interfaces / Produto.ts; // Interface TypeScript
features / produto / schemas / ProdutoSchema.ts; // Schema Zod

// ✅ Correto - Prefixos por camada
core / components / CoreButton.tsx; // Componente core
shared / hooks / useApiClient.ts; // Hook compartilhado
features / auth / services / AuthService / index.ts; // Serviço de feature

// ❌ Incorreto
features / produto / components / produto - view.tsx; // kebab-case em arquivo
features / produto / controllers / ProdutoController.ts; // Sem prefixo 'use'
core / components / Button.tsx; // Sem prefixo 'Core'
```

### 🔧 Diretrizes de Código

#### Imports e Aliases

```typescript
// tsconfig.json paths configurado
"paths": { "@/*": ["./*"] }

// ✅ Uso correto de imports
import { ProdutoView } from '@/features/produto/components/ProdutoView'
import type { Produto } from '@/features/produto/interfaces/Produto'
```

#### Exports

```typescript
// ✅ Exports nomeados (recomendado)
export function useProdutos() {
  /* ... */
}
export const ProdutoView = () => {
  /* ... */
};

// ❌ Export default (evitar)
export default function Component() {
  /* ... */
}
```

#### Formulários e Validação

```typescript
// Padrão: React Hook Form + Zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProdutoSchema } from "../schemas/ProdutoSchema";

const form = useForm({
  resolver: zodResolver(ProdutoSchema),
  defaultValues: {
    /* ... */
  },
});
```

#### Data Fetching e Estado

```typescript
// TanStack Query para estado servidor
const { data: produtos, isLoading } = useQuery({
  queryKey: ["produtos", filtros],
  queryFn: () => ProdutoService.buscarProdutos(filtros),
});

// Zustand para estado global (quando necessário)
// N/D - store não implementado ainda
```

_Referências: `features/produto/` estrutura, README.md original_

## Guia de Features

### Padrão Arquitetural: Hook Controller + View

Cada feature segue a estrutura **Hook Controller + View** para separar claramente responsabilidades:

- **View**: Componentes de apresentação (`.tsx`)
- **Controller**: Lógica de controle e estado local (`.ts`)
- **Hook**: Lógica de dados e API (`.ts`)
- **Interface/Schema**: Tipagem e validação (`.ts`)

### Exemplo Completo: Feature Produto

#### 1. View Layer (`features/produto/components/ProdutoView.tsx`)

```typescript
export const ProdutoView: React.FC<ProdutoViewProps> = ({
  onEdit,
  onDelete,
  onView,
  onCreate,
}) => {
  // Controller para filtros
  const { filtros, limparFiltros } = useProdutoFiltros();

  // Hook geral para dados dos produtos
  const { produtos, loading } = useProdutos({ filtros });

  return (
    <div>
      <ProdutoFiltrosComponent />
      <ProdutoLista produtos={produtos} loading={loading} />
      <ProdutoPaginacao />
    </div>
  );
};
```

#### 2. Controller Layer (`features/produto/controllers/useProdutoFiltros.ts`)

```typescript
export function useProdutoFiltros() {
  const [filtros, setFiltros] = useState<ProdutoFiltrosCompleto>({});

  const definirFiltros = useCallback((novosFiltros) => {
    setFiltros((prev) => ({ ...prev, ...novosFiltros }));
  }, []);

  const validarFiltros = useCallback((filtros) => {
    return ProdutoFiltrosSchema.safeParse(filtros);
  }, []);

  return { filtros, definirFiltros, validarFiltros, limparFiltros };
}
```

#### 3. Data Hook (`features/produto/hooks/useProdutos.ts`)

```typescript
export function useProdutos(options: UseProdutosOptions) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);

  const buscarProdutos = useCallback(async (filtros) => {
    setLoading(true);
    const resultado = await ProdutoMock.buscar(filtros);
    setProdutos(resultado.dados);
    setLoading(false);
  }, []);

  return { produtos, loading, buscarProdutos };
}
```

#### 4. Interface e Schema

```typescript
// Interface TypeScript (features/produto/interfaces/Produto.ts)
export interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
  status: string;
}

// Schema Zod (features/produto/schemas/ProdutoSchema.ts)
export const ProdutoSchema = z.object({
  id: z.string().uuid(),
  nome: z.string().min(2).max(100),
  preco: z.number().positive(),
  categoria: z.nativeEnum(ProdutoCategoriaEnum),
});
```

### Template para Nova Feature

Para criar uma nova feature, siga esta estrutura:

```bash
mkdir -p features/[nome-feature]/{components,controllers,hooks,interfaces,schemas,enums,mocks,services}
```

#### Template Mínimo

**Interface** (`interfaces/MinhaFeature.ts`):

```typescript
export interface MinhaFeature {
  id: string;
  nome: string;
  criadoEm: Date;
}
```

**Schema** (`schemas/MinhaFeatureSchema.ts`):

```typescript
import { z } from "zod";

export const MinhaFeatureSchema = z.object({
  id: z.string().uuid(),
  nome: z.string().min(1),
  criadoEm: z.date(),
});
```

**Hook** (`hooks/useMinhaFeatures.ts`):

```typescript
export function useMinhaFeatures() {
  return { dados: [], loading: false };
}
```

**Controller** (`controllers/useMinhaFeatureController.ts`):

```typescript
export function useMinhaFeatureController() {
  return {
    /* ações e estado */
  };
}
```

**View** (`components/MinhaFeatureView.tsx`):

```typescript
export function MinhaFeatureView() {
  const { dados } = useMinhaFeatures();
  const controller = useMinhaFeatureController();

  return <div>{/* UI da feature */}</div>;
}
```

_Referências: `app/produtos/page.tsx`, `features/produto/`_

## Ferramentas de Desenvolvimento

### � Qualidade e Linting

- **Biome**: Linter e formatter unificado
- **Organização automática**: Imports organizados automaticamente
- **Regras customizadas**: Configurações específicas para React/Next.js

### ⚡ Performance

- **Turbopack**: Habilitado para dev e build (`--turbopack`)
- **Sharp**: Otimização de imagens configurada
- **Next.js 15**: App Router com RSC (React Server Components)

### 🐛 Debug e Desenvolvimento

#### Configurações VS Code Debug (`.vscode/launch.json`)

```json
{
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/next/dist/bin/next",
      "runtimeArgs": ["--inspect"],
      "skipFiles": ["<node_internals>/**"],
      "serverReadyAction": {
        "action": "debugWithEdge",
        "killOnServerStop": true,
        "pattern": "- Local:.+(https?://.+)",
        "uriFormat": "%s",
        "webRoot": "${workspaceFolder}"
      }
    }
  ]
}
```

### 🔧 Extensões Recomendadas VS Code

#### Essenciais

| Extensão                      | Propósito                    | Integração                  |
| ----------------------------- | ---------------------------- | --------------------------- |
| **Biome**                     | Linting/formatting unificado | `biome.json`                |
| **GitLens**                   | Git avançado                 | Blame, history, comparisons |
| **Path Intellisense**         | Autocomplete de caminhos     | Aliases `@/*`               |
| **Tailwind CSS IntelliSense** | Autocomplete CSS             | Classes + preview           |

#### Produtividade

| Extensão               | Propósito                     |
| ---------------------- | ----------------------------- |
| **Auto Rename Tag**    | Renomeação automática de tags |
| **Auto Close Tag**     | Fechamento automático de tags |
| **Import Cost**        | Tamanho dos imports           |
| **Error Lens**         | Erros inline no editor        |
| **Code Spell Checker** | Verificação ortográfica       |

#### Debug

| Extensão            | Propósito                   |
| ------------------- | --------------------------- |
| **Console Ninja**   | Debug console.log avançado  |
| **Thunder Client**  | Cliente REST integrado      |
| **SonarLint**       | Análise de qualidade        |
| **Color Highlight** | Destaque de cores no código |

#### Configuração VS Code Recomendada

```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
  }
}
```

## Configuração e Ambiente

### 🔧 Arquivos de Configuração

#### Next.js (`next.config.ts`)

```typescript
const nextConfig: NextConfig = {
  images: {
    domains: ["example.com"], // Domínios para otimização de imagens
  },
};
```

#### TypeScript (`tsconfig.json`)

- **Target**: ES2017
- **Modo Estrito**: Habilitado
- **Paths**: Alias `@/*` para imports absolutos
- **Plugins**: Next.js plugin para tipagem automática

#### Biome (`biome.json`)

- **Formatter**: Tabs (width: 2), line width: 80
- **Linter**: Regras recommended + customizações React/Next.js
- **Imports**: Organização automática habilitada
- **Regras customizadas**: `useExhaustiveDependencies: warn`, `useImportType: error`

#### TailwindCSS

- **Versão**: 4 _(package.json)_
- **PostCSS**: Configurado (`postcss.config.mjs`)
- **Configuração**: N/D _(arquivo tailwind.config não encontrado)_

### 🔐 Variáveis de Ambiente

```bash
AUTH_SECRET="your-secret-here"
```

### 🔒 Segurança & Autenticação

- **NextAuth.js v5**: Provider customizado para usuário/senha
- **Session Management**: JWT + Database sessions
- **Headers de Segurança**: N/D _(sugestão: CSP, HSTS, X-Frame-Options)_

_Referências: `next.config.ts`, `tsconfig.json`, `biome.json`, `libs/auth-js/auth.ts`_

## FAQ

**P: Qual a diferença entre `features/`, `shared/` e `core/`?**
R: `features/` contém funcionalidades específicas, `shared/` tem recursos reutilizáveis entre features, `core/` seria para utilitários base (atualmente não utilizado).

**P: Por que Biome ao invés de ESLint + Prettier?**
R: Biome é mais rápido, tem configuração unificada e melhor suporte para projetos TypeScript/React modernos.

**P: Como debugar a aplicação no VS Code?**
R: Use as configurações em `.vscode/launch.json`: "debug server-side" para backend, "debug client-side" para frontend, ou "debug full stack" para ambos.

**P: Quando criar um arquivo em `core/`, `shared/` ou `features/`?**
R: Use o fluxograma: 0 domínios → `core/`, 1 domínio → `features/[dominio]/`, 2+ domínios → `shared/`.
