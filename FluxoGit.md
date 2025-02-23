# Convenções de Trabalho do Projeto

## ⚠️ Por que não vamos commitar direto na `main`/`master`?

- **Qualidade do código**: Todo código precisa ser revisado antes de entrar na versão principal
- **Evitar conflitos**: Trabalhar em branches separadas previne quebras acidentais
- **Rastreabilidade**: Issues e PRs documentam **por que** cada mudança foi feita
- **Controle de versões**: Garantir que apenas código testado e aprovado entre na branch principal

---

## 📝 Convenções de Commit

### Formato

```text
<tipo>(escopo-da-arquitetura/componente): mensagem concisa em imperativo

Corpo detalhado (se necessário)

[Fechar #issue-número]
```

### Exemplo

```text
feat(login): adiciona autenticação via Google

- Integração com OAuth2
- Novas variáveis de ambiente adicionadas

[Fechar #12]
```

- **Evite**:
    - ❌ Gerúndio ("adicionando", "corrigindo")
    - ❌ Mensagens vagas ("ajustes", "atualizações")

### Exemplos de Mensagens

| ❌ **Incorreto**                  | ✅ **Correto (Imperativo)**                                                |
| --------------------------------- | -------------------------------------------------------------------------- |
| `feat: mudando o controller`      | `feat(application/controller): padroniza validação de entrada`             |
| `fix: corrigindo bug no login`    | `fix(services/login): remove caracteres inválidos do email`                |
| `docs: atualizando o README`      | `docs(readme): adiciona guia de instalação`                                |
| `chore: atualizando dependências` | `chore(libs): atualiza axios para v2.0.0`                                  |
| `refactor: melhorando o código`   | `refactor(infra/server): adiciona o novo middleware para validar requests` |

---

### Tipos Permitidos

| Tipo       | Quando Usar                                   |
| ---------- | --------------------------------------------- |
| `feat`     | Nova funcionalidade                           |
| `fix`      | Correção de bug                               |
| `docs`     | Mudanças na documentação                      |
| `refactor` | Alterações que não corrigem bugs/add features |
| `test`     | Adição/ajuste de testes                       |
| `chore`    | Tarefas de infra (ex: atualizar dependências) |

---

## 🌿 Estratégia de Branches

### Passo-a-Passo

1. **Sincronize com a branch principal**:

    ```bash
    git checkout main
    git pull origin main
    ```

2. **Crie uma nova branch**:

    ```bash
    git checkout -b tipo/descricao-breve
    ```

    Padrão de nomes:

    - `feat/nome-da-feature` (novas funcionalidades)
    - `fix/corrige-erro-login` (correções)
    - `docs/atualiza-readme`

3. **Faça commits**:

    ```bash
    git commit -m "feat(api): adiciona endpoint de usuários [Fechar #5]"
    ```

4. **Envie a branch**:

    ```bash
    git push origin nome-da-sua-branch
    ```

---

## 🛠 Processo de Pull Request (PR)

### Como Criar um PR

1. No GitHub: **Pull Requests** → **New Pull Request**
2. Selecione:
    - `base: main` (destino)
    - `compare: sua-branch` (sua branch)
3. Preencha o template:

    ```markdown
    ### Descrição

    O que esse PR faz?

    ### Issues Relacionadas

    Closes #123

    ### Checklist

    - [ ] Testes passando
    - [ ] Documentação atualizada
    - [ ] Revisado por outro membro
    ```

4. **Não clique em "Merge"!** Apenas administradores farão o merge.

---

## ✅ Regras para PRs Aprovados

1. **Revisão obrigatória**: Mínimo 1 aprovação
2. **Sem conflitos**: Branch atualizada com `main`
3. **Builds OK**: CI/CD (quando houver) deve passar

---
