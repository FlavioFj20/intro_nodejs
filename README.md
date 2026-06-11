# intro_nodejs

Projeto simples de notas com interface de linha de comando (CLI) e visualização via servidor web.

**Descrição**

- **Objetivo:** Gerenciar notas simples (criar, listar, buscar, remover) via CLI e visualizar no navegador.
- **Funcionalidades principais:** criar nova nota com tags, listar todas, buscar por termo, remover por id, limpar todas as notas e abrir uma interface web para visualização.

**Requisitos**

- **Node.js:** recomendado Node 18+.
- **Dependências:** definidas em [package.json](package.json). Use `npm install` para instalar.

**Instalação**

- Clone o repositório e instale dependências:

```bash
git clone https://github.com/FlavioFj20/intro_nodejs.git
cd intro_nodejs
npm install
```

**Instalação global (opções)**

1. Instalar o pacote globalmente (a partir do diretório do projeto):

```bash
npm install -g .
```

Após a instalação global, o comando `note` ficará disponível globalmente:

```bash
note new "Minha nota"
note all
```

2. Durante o desenvolvimento, para linkar o pacote localmente (modo dev):

```bash
npm link
# desfazer: npm unlink -g intro_node
```

3. Alternativa sem instalar globalmente — usar `npx`:

```bash
npx . new "Minha nota"
```

Observações: evitar usar `sudo` para instalações globais; prefira gerenciadores de versão como `nvm` ou ajustar `npm` prefix se necessário.

**Uso (CLI)**

- O binário/entrypoint é `index.js` (há um atalho configurado em `package.json` para `note`).
- Comandos disponíveis (via `node index.js <comando>` ou `note` se instalado globalmente):

- **Criar nota:**

```bash
node index.js new "Texto da nota" -t tag1,tag2
```

- **Listar todas as notas:**

```bash
node index.js all
```

- **Buscar notas por termo (filtrar por `content`):**

```bash
node index.js find termo
```

- **Remover nota por id:**

```bash
node index.js remove 123456789
```

- **Remover todas as notas:**

```bash
node index.js clean
```

- **Executar interface web (porta opcional):**

```bash
node index.js web 5000
# ou
npm start  # inicia: node --watch index.js web
```

**Interface Web**

- Ao executar `node index.js web`, o servidor HTTP serve o template localizado em [src/template.html](src/template.html) e abre automaticamente o navegador (usa o pacote `open`).
- Porta padrão: 5000.

**Armazenamento**

- O projeto salva as notas em [bd.json](bd.json) com a estrutura:

```json
{
  "notes": [{ "id": 123, "content": "texto", "tags": ["exemplo"] }]
}
```

- Módulo de persistência: [src/bd.js](src/bd.js) — funções `getDB`, `saveDB`, `insertDB`.

**Estrutura do projeto**

- **Entrada:** [index.js](index.js) — importa `src/command.js`.
- **Comandos/CLI:** [src/command.js](src/command.js) (usa `yargs`).
- **Lógica das notas:** [src/note.js](src/note.js) — `newNote`, `getAllNotes`, `findNote`, `removeNote`, `removeAll`.
- **Persistência:** [src/bd.js](src/bd.js).
- **Servidor web:** [src/server.js](src/server.js) — render simples do template.
- **Template HTML:** [src/template.html](src/template.html).

**Exemplos rápidos**

- Criar nota com tags:

```bash
node index.js new "Comprar leite" -t compras,urgente
```

- Abrir visualização no navegador (porta 5000):

```bash
node index.js web 5000
```

**Contribuição**

- Abra uma issue ou envie um pull request no repositório GitHub: https://github.com/FlavioFj20/intro_nodejs
- Não há testes automatizados inclusos atualmente.

**Licença**

- Consulte o arquivo [LICENSE](LICENSE) no repositório para detalhes.

---
