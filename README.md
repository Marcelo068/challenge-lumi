# challenge-lumi

## Objetos do Projeto
O projeto visa extrair informações de documentos PDF utilizando inteligência artificial, categorizando os dados e apresentando-os através de um dashboard intuitivo, além de disponibilizar funcionalidades de download dos arquivos processados.

## Tecnologias Utilizadas
### Front-end
- React: Framework JavaScript para construção da interface do usuário.
- TypeScript: Superset de JavaScript que adiciona tipagem estática ao código.
- Material-UI: Biblioteca de componentes React para um design consistente e responsivo.
### Back-end
- Node.js: Ambiente de execução JavaScript server-side.
- TypeORM: ORM (Object-Relational Mapping) para TypeScript e JavaScript.
- PostgreSQL: Sistema de gerenciamento de banco de dados relacional.

## Intruções
### Front-end
Para configurar o frontend, basta executar "npm i" seguido de "npm start". Isso será suficiente para iniciar a aplicação. Para executar os testes, utilize o comando "npm test".

### Back-end
Para configurar o backend, execute "npm i" e depois ajuste o arquivo "data-source.ts", localizado em "api/src/data-source.ts", onde as credenciais devem ser alteradas para o banco de dados local ou de acesso.

Após configurar as credenciais, há duas alternativas para os dados:

### Alternativa 1 (Script)
Após executar "npm i", inicie o servidor com "npm run start:dev", o que iniciará o banco de dados via TypeORM, desde que as credenciais no "data-source.ts" estejam corretas. Em seguida, execute o script localizado em "\api\src\scripts\InsertEnergyBills.ts" com o comando "ts-node InsertEnergyBills.ts" em outra linha de comando. É importante mencionar que é necessário uma "api_key" do ChatGPT para que o script funcione corretamente, pois envolve categorização utilizando inteligência artificial.

### Alternativa 2 (Restore do Banco)
Após executar "npm i", faça a restauração do banco de dados. Para isso, crie um banco de dados no PostgreSQL e utilize o arquivo localizado em "\api\dump\challenge-lumi-database" para realizar o restore. Após a restauração, inicie a API com "npm run start:dev".

