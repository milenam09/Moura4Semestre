# 🚀 Tecnologias do Projeto Chama Jussa

Este documento lista todas as tecnologias, linguagens, frameworks e ferramentas que compõem o sistema **Chama Jussa**.

---

## 📱 1. Frontend (Mobile & Web)

Desenvolvido em **React Native** com **Expo**, permitindo rodar o mesmo código no **Android**, **iOS** e **Navegador (Web)**.

### 🔹 Principais Tecnologias:
- **React (v19.1.0):** Biblioteca base para a construção das interfaces reativas.
- **React Native (v0.81.5):** Framework para criar componentes nativos de celular.
- **Expo (SDK 54):** Plataforma para desenvolvimento rápido, testes no celular com Expo Go e acesso a recursos nativos.
- **Expo Router (v6):** Gerenciamento de rotas e telas baseado em estrutura de pastas (`/app`).

### 🔹 Bibliotecas e Recursos Visuais:
- **@react-navigation/bottom-tabs:** Barra inferior de navegação rápida entre telas.
- **expo-image-picker:** Permite ao usuário tirar foto com a câmera ou escolher da galeria.
- **expo-image:** Carregamento otimizado de imagens com cache automático.
- **expo-navigation-bar:** Deixa a barra de navegação do Android (◁ ○ □) preta combinando com o tema escuro.
- **expo-status-bar:** Deixa os ícones de bateria, Wi-Fi e relógio brancos no topo do celular.
- **@expo/vector-icons (MaterialCommunityIcons):** Ícones em todo o aplicativo.
- **AsyncStorage:** Banco local no celular para salvar login, token e permitir uso offline.
- **React Native Reanimated & Gesture Handler:** Animações fluidas e suporte a gestos de toque.

---

## ⚙️ 2. Backend (API REST)

Construído em **C# / .NET** com arquitetura em camadas (Controllers, Repositórios, DTOs e Interfaces).

### 🔹 Principais Tecnologias:
- **C# / .NET 10:** Linguagem e ambiente de execução de alta performance.
- **ASP.NET Core Web API:** Criação dos endpoints e rotas HTTP da API.
- **Entity Framework Core (EF Core 10):** ORM responsável por consultar e salvar dados no banco sem comandos SQL manuais.
- **JWT (JSON Web Token):** Sistema de login seguro com tokens criptografados.
- **BCrypt.Net:** Criptografia e proteção com hash de todas as senhas dos usuários.
- **Swagger / OpenAPI:** Tela interativa no navegador para testar as rotas da API em tempo real.
- **Static Files (wwwroot):** Armazenamento e entrega das fotos enviadas pelos usuários.

---

## 🗄️ 3. Banco de Dados

- **Microsoft SQL Server (LocalDB):** Banco de dados relacional oficial do projeto.
- **Nome do Banco:** `Chama_JussaDB`
- **Principais Tabelas:**
  - `UsuarioTb` (Contas de usuários, e-mail, senha criptografada e foto)
  - `ServicoTb` (Ordens de serviço, máquina, setor, foto, situação e autor)
  - `NotificacaoTb` (Histórico de notificações para os usuários)

---

## 💡 4. Resumo Rápido da Arquitetura

```
[ App Mobile / Web (Expo) ]
             ↕  (HTTP / JSON com Token JWT)
[ Backend API (.NET 10) ]
             ↕  (Entity Framework Core)
[ Banco SQL Server (LocalDB) ]
```
