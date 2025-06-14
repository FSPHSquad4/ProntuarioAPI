# **GEAMBApi**

Este projeto é uma API para gerenciamento de prontuários médicos. Abaixo estão as instruções para configurar e rodar o projeto utilizando Docker.

---

## **Pré-requisitos**

Certifique-se de ter os seguintes softwares instalados no seu ambiente:

- **Docker** (versão 20.10 ou superior)
- **Docker Compose** (versão 1.29 ou superior)

---

## **Configuração do Ambiente**

### **Variáveis de Ambiente**

O projeto utiliza variáveis de ambiente para configurar o banco de dados e outros serviços. Você pode definir essas variáveis no arquivo `.env`. Um exemplo de configuração está disponível no arquivo `.env.example`.

### **Passo 1: Criar o Arquivo `.env`**

1. Copie o arquivo `.env.example` para `.env`:

   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env` com os valores apropriados. Aqui está uma explicação das variáveis:

   | Variável                  | Descrição                                                                 | Exemplo              |
   |---------------------------|---------------------------------------------------------------------------|----------------------|
   | `DB_HOST`                 | Host do banco de dados.                                                   | `db`                |
   | `DB_PORT`                 | Porta do banco de dados.                                                  | `3306`              |
   | `DB_USER`                 | Usuário do banco de dados.                                                | `root`              |
   | `DB_PASSWORD`             | Senha do banco de dados.                                                  | `password`          |
   | `DB_NAME`                 | Nome do banco de dados.                                                   | `SistemaProntuario` |
   | `MARIADB_PORT`            | Porta do MariaDB no container.                                            | `3306`              |
   | `MARIADB_PASSWORD`        | Senha do MariaDB.                                                         | `password`          |
   | `MARIADB_ROOT_PASSWORD`   | Senha do usuário root do MariaDB.                                          | `rootpassword`      |
   | `MARIADB_DATABASE`        | Nome do banco de dados a ser criado no MariaDB.                           | `SistemaProntuario` |
   | `PORT`                    | Porta onde a API será exposta.                                            | `3003`              |
   | `JWT_SECRET`              | Chave secreta para geração de tokens JWT.                                 | `supersecretkey`    |

---

## **Como Rodar o Projeto**

### **Passo 1: Construir e Subir os Containers**

1. Certifique-se de que o Docker está rodando no seu sistema.
2. No diretório raiz do projeto, execute o seguinte comando para construir e subir os containers:

   ```bash
   docker-compose up --build
   ```

   Esse comando irá:
   - Construir a imagem da API.
   - Subir o container do banco de dados MariaDB.
   - Subir o container da API.

3. Aguarde até que os logs indiquem que o banco de dados e a API estão prontos. Você verá algo como:

   ```text
   📦 Connected to database
   🚀 Server running on port 3003
   ```

---

### **Passo 2: Acessar a API**

A API estará disponível em `http://localhost:3003`.

---

## **Comandos Úteis**

### **Parar os Containers**

Para parar os containers sem removê-los:

```bash
docker-compose stop
```

### **Remover os Containers**

Para parar e remover os containers, redes e volumes:

```bash
docker-compose down
```

### **Recriar o Banco de Dados**

Se precisar recriar o banco de dados (por exemplo, para testes):

```bash
docker-compose down -v
docker-compose up --build
```

---

## **Estrutura do Projeto**

A estrutura do projeto é organizada da seguinte forma:

```tree
src/
├── application/       # Lógica de aplicação (serviços, controladores)
├── domain/            # Entidades, DTOs, interfaces e enums
├── infrastructure/    # Banco de dados, injeção de dependências, middlewares
├── presentation/      # Configuração do servidor e rotas
├── shared/            # Constantes, helpers e utilitários
```

---

## **Testes**

### **Rodar Testes Unitários**

Para rodar os testes unitários:

```bash
npm run test:unit
```

### **Rodar Testes de Integração**

Para rodar os testes de integração (usando Docker Compose para o banco de dados de teste):

```bash
npm run test:integration
```

---

## **Problemas Comuns**

### **Erro de Conexão com o Banco de Dados**

Certifique-se de que as variáveis de ambiente no arquivo `.env` estão corretas e que o container do banco de dados está rodando.

### **Porta em Uso**

Se a porta `3003` ou `3306` já estiver em uso, altere as portas no arquivo `.env` e no `docker-compose.yml`.
