### Diretrizes obrigatórias

- **Gerar somente o componente**: não gere exemplos, páginas ou uso do componente recém-criado. Apenas o arquivo do componente.
- **Destino dos arquivos**: todos os componentes gerados devem ser salvos em `@components/` (alias do projeto).

### Objetivo

- **Entrada**: um frame/camada do Figma (ex.: [Design System PFF](https://www.figma.com/design/B20QtHrNienW0VPLLQWbFb/Design-System-PFF?node-id=45-637&m=dev))
- **Saída**: um componente React (TypeScript) estilizado com Tailwind e composto por componentes do shadcn (`components/ui`).

### Pré-requisitos

- Projeto Next.js com Tailwind configurado e pasta `components/ui` presente.
- `components.json` configurado com o registry do shadcn.
- MCP do Figma e MCP do shadcn ativos.
- Se possível, configure Code Connect no Figma para mapear nodes → componentes do código.

## Caminho rápido (frames pequenos/médios)

1. Identifique o nodeId do Figma

- A partir do link do Figma, extraia `node-id` (ex.: `45-637` → use "45:637").

2. (Opcional) Capture screenshot para fidelidade

- **Figma → get_screenshot**

```json
{ "nodeId": "45:637" }
```

3. Extraia tokens/variáveis usados

- **Figma → get_variable_defs** (local)
- Objetivo: obter cores, spacing e tipografia para guiar a escolha de variantes/estilos dos componentes shadcn.

5. Gere o esqueleto de UI a partir do Figma

- **Figma → get_design_context**
  - Prompt recomendado: "generate my Figma selection using components from components/ui and style with Tailwind"
  - Parâmetros (exemplo):

```json
{
  "nodeId": "45:637",
  "clientLanguages": "typescript,html,css",
  "clientFrameworks": "react,next,tailwind",
  "forceCode": true
}
```

6. Descubra e selecione os componentes shadcn

- **shadcn → get_project_registries**
- **shadcn → search_items_in_registries** com termos do design (ex.: "card, badge, button")

```json
{ "registries": ["@shadcn"], "query": "card, badge, button" }
```

- **shadcn → view_items_in_registries** para detalhes quando necessário.
- **shadcn → get_item_examples_from_registries** para ver usos completos/demos e dependências.

7. Adicione componentes ausentes

- **shadcn → get_add_command_for_items**

```json
{ "items": ["@shadcn/card", "@shadcn/button", "@shadcn/badge"] }
```

- Execute o comando retornado para instalar os componentes e suas dependências.

8. Implemente o componente no projeto

- Crie o arquivo (ex.): `features/<feature>/components/<NomeDoComponente>.tsx`.
- Cole/adapte o código de `get_design_context`, substituindo elementos brutos por componentes shadcn correspondentes e importando de `components/ui`.
- Ajuste variantes/props usando os tokens obtidos em `get_variable_defs`.

9. Checklist final

- **shadcn → get_audit_checklist** e valide a integração (imports, estilos, acessibilidade, interações).
