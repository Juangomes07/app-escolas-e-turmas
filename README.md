# 🏫 App Escolas e Turmas — React Native (Expo)

Aplicativo mobile (Android/iOS) para **centralizar o cadastro de escolas públicas e suas turmas**, substituindo o controle manual em planilhas.  
Projeto desenvolvido com **React Native + Expo**, seguindo boas práticas de arquitetura, tipagem e usabilidade, com **back-end simulado** via **MirageJS**.

---

## ✅ Funcionalidades

### 🏫 Módulo de Escolas
- Listar escolas (nome, endereço, **quantidade de turmas**)
- Cadastrar nova escola (**nome** e **endereço** obrigatórios)
- Editar escola
- Excluir escola

### 📚 Módulo de Turmas
- Listar turmas associadas à escola selecionada
- Cadastrar turma (**nome**, **turno**, **ano letivo**)
- Editar turma
- Excluir turma

### 🌟 Extras (diferenciais)
- Estrutura modular por domínio (School / Classes)
- Reutilização de componentes e hooks
- Tipagem forte com TypeScript
- Mock API local (sem dependência de servidor externo)

---

## 🧰 Stack & Versões

> Versões **atuais do projeto** (conforme `package.json`):

- **Expo SDK**: `~54.0.25`
- **React**: `19.1.0`
- **React Native**: `0.81.5`
- **Expo Router**: `~6.0.15`
- **TypeScript** (dev): `~5.9.2`
- **UI**: Gluestack UI (`@gluestack-ui/core` `^3.0.12`)
- **Mock Backend**: MirageJS (`^0.1.48`)
- **Forms**: React Hook Form (com resolvers)

✅ Este repositório usa **npm** (com `package-lock.json`).

---

## 📦 Requisitos

- **Node.js**: recomendado **LTS** (ex.: 18+ / 20+)
- **npm**: vem junto com Node
- **Expo**: preferencialmente via `npx` (sem instalar global)

Opcional para emuladores:
- Android Studio (Android Emulator)
- Xcode (iOS Simulator — macOS)

---

## 🚀 Como rodar localmente

### 1) Clonar
```bash
git clone https://github.com/Juangomes07/app-escolas-e-turmas.git
cd app-escolas-e-turmas
```

### 2) Instalar dependências
```bash
npm install
```

### 3) Rodar o app
```bash
npx expo start
```

### 4) Executar no dispositivo/emulador
- **Expo Go (celular):** escaneie o QR Code
- **Android emulator:** pressione `a`
- **iOS simulator (macOS):** pressione `i`

---

## 🧪 Mock Backend (MirageJS)

Este projeto simula o back-end usando **MirageJS** com endpoints para `/schools` e `/classes`.

### Onde o mock inicia?
O servidor Mirage é inicializado automaticamente no app layout:

- `app/_layout.tsx` → chama `makeServer()` importado de `@/server` (arquivo `server.js`)

### Endpoints simulados
- `GET /schools`
- `POST /schools`
- `PUT /schools/:id`
- `DELETE /schools/:id`

- `GET /classes` *(pode ser filtrado por escola, dependendo da implementação)*
- `POST /classes`
- `PUT /classes/:id`
- `DELETE /classes/:id`

✅ **Não é necessário subir servidor separado**: o Mirage roda dentro do próprio app.

---

## 🗂️ Estrutura do projeto

Organização modular por domínio + camadas compartilhadas:

```txt
app/                 # Rotas (Expo Router)
modules/
  School/            # Domínio Escolas (screens, hooks, service)
  Classes/           # Domínio Turmas (screens, hooks, service)
providers/           # Providers (UI + context/state)
service/             # Gateway de integração (HTTP)
models/              # Tipos/entidades
components/          # Componentes compartilhados (Header, modais, formulários)
hooks/               # Hooks compartilhados
utils/               # Utilitários
assets/              # Assets estáticos
server.js            # MirageJS server (mock API)
```

---

## 🧠 Arquitetura 

### Camadas e responsabilidades
- **Routes (`app/`)**: ponto de entrada das telas e navegação (Expo Router)
- **Modules (`modules/`)**: implementação por feature/domínio (UI + hooks + service)
- **Providers (`providers/`)**: composição global (tema/UI + estado via Context API)
- **Service (`service/`)**: gateway para operações de dados (abstrai chamadas HTTP/mock)
- **Models (`models/`)**: contratos e tipagem das entidades

✅ Benefícios:
- escalável (adicionar novos domínios é simples)
- fácil de manter (responsabilidades claras)
- testável (services/hooks isoláveis)

---

## 🧾 Scripts disponíveis

| Script | Descrição |
|---|---|
| `npm start` | Inicia o Expo dev server |
| `npm run android` | Abre no Android device/emulador |
| `npm run ios` | Abre no iOS simulator (macOS) |
| `npm run web` | Executa via Expo Web |
| `npm run lint` | Lint (Expo lint) |
| `npm run reset-project` | Script utilitário do projeto |

---

## 🧭 Trade-offs (decisões conscientes)

- **Context API vs Zustand/Jotai/Recoil**  
  Usei Context API via Providers para manter o projeto simples e didático.  
  Para crescimento (muitos estados globais / performance), um store dedicado (Zustand) pode ser melhor.

- **MirageJS dentro do app**  
  Excelente para desafio técnico por ser zero-config e offline-friendly.  
  Em produto real, MSW + API real pode refletir melhor integrações e contratos.

- **Validações e UX**  
  Mantive validações objetivas no form (campos obrigatórios e consistência).  
  Em cenário real, adicionaria mais feedback (toast, skeleton, empty states avançados).

---

## 🧩 Melhorias futuras (roadmap)

- 🔎 Busca e filtro em listas (Schools e Classes)
- 💾 Cache offline com AsyncStorage (ex.: última lista carregada)
- 🧪 Testes com Jest + Testing Library (services, hooks, e componentes críticos)
- 🧱 Repository pattern (SchoolRepository / ClassRepository) para desacoplar ainda mais a camada de dados
- 🎨 Melhorias de UI: empty states, skeleton loading, feedback de erro com toast + rollback
- 🧭 Acessibilidade: labels, foco, tamanhos e contrastes (WCAG)

---

## 🧪 Qualidade de código

- TypeScript com tipagem das entidades
- Separação por domínio
- Reuso de componentes e hooks
- Padronização de comandos via `npm`

Sugestão de próximos passos:
- ESLint + Prettier (se desejar reforçar padrão)
- Conventional Commits (ver abaixo)

---

## ✅ Padrão de Commits (recomendado)

Sugestão (Conventional Commits):
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `refactor:` refatoração sem mudar comportamento
- `chore:` infraestrutura / deps / configs
- `docs:` documentação

Exemplos:
- `feat: implement schools CRUD`
- `fix: align Mirage serializer response`
- `docs: add setup instructions and API mock notes`

---

## 📦 Build 

Para builds de produção, use EAS:

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android
```

---

## 📸 Prints 

- Lista de escolas
- Formulário de escola
- Lista de turmas
- Formulário de turma

---

## 👤 Autor

- GitHub: https://github.com/Juangomes07

---

## 📄 Licença

MIT.

---

# 🇺🇸 Quick Start (English)

```bash
git clone https://github.com/Juangomes07/app-escolas-e-turmas.git
cd app-escolas-e-turmas
npm install
npx expo start
```

Mock API is powered by **MirageJS** and starts automatically from `app/_layout.tsx` via `makeServer()` (defined in `server.js`).
