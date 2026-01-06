# Manual de Execução - React + Vite

## 📋 Pré-requisitos

- Node.js (versão 14+ recomendado)
- npm instalado

## 🚀 Primeiros Passos

### 1. Instalar Dependências

Abra o terminal na pasta do projeto e execute:

```bash
cd frontend
npm install
```


### 2. Executar em Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O servidor será iniciado em `http://localhost:5173` (por padrão)

## 🔨 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento com HMR (Hot Module Replacement) |
| `npm run build` | Cria build otimizado para produção |
| `npm run preview` | Visualiza a build de produção localmente |
| `npm run lint` | Executa verificação ESLint |

## 📦 Build para Produção

Para gerar os arquivos otimizados para produção:

```bash
npm run build
```

Os arquivos compilados estarão na pasta `dist/`

## 👀 Visualizar Build Localmente

Depois de fazer build, você pode testar a versão de produção:

```bash
npm run preview
```

## 💡 Dicas Úteis

- **HMR Ativo**: Qualquer mudança nos arquivos é refletida automaticamente no navegador
- **Modo Stricto React**: O projeto roda em modo stricto, ideal para desenvolvimento
- **ESLint**: Configure as regras em `.eslintrc.cjs` conforme sua necessidade

## ❓ Troubleshooting

### Porta 5173 já está em uso?

```bash
npm run dev -- --port 3000
```

### Limpar cache e reinstalar

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build com erro?

Certifique-se de que todas as dependências estão instaladas:

```bash
npm install
npm run build
```

---

**Pronto!** 🎉 Seu projeto React + Vite está configurado e pronto para desenvolvimento.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
