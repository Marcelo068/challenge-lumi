# challenge-lumi

## Objetos do Projeto
O projeto visa extrair informações de documentos PDF utilizando inteligência artificial, categorizando os dados e apresentando-os através de um dashboard intuitivo, além de disponibilizar funcionalidades de download dos arquivos processados.

## Tecnologias Utilizadas
### Front-end
- **React**: Poderosa biblioteca para construção de interfaces visuais em JavaScript.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática ao código.
- **Material-UI**: Biblioteca de componentes React para um design consistente e responsivo.
### Back-end
- **Node.js**: Ambiente de execução JavaScript server-side.
- **TypeORM**: ORM (Object-Relational Mapping) para TypeScript e JavaScript.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.

## Intruções
### Front-end
Para configurar o frontend, basta executar "npm i" seguido de "npm start". Isso será suficiente para iniciar a aplicação. Para executar os testes, utilize o comando "npm test".

### Back-end
Para configurar o backend, execute "npm i" e depois ajuste o arquivo "data-source.ts", localizado em "api/src/data-source.ts", onde as credenciais devem ser alteradas para o banco de dados local ou de acesso.

Após configurar as credenciais, há duas alternativas para os dados :

- **Alternativa 1 (Script)**:
Após executar "npm i", inicie o servidor com "npm run start:dev" para iniciar o banco de dados via TypeORM, assegurando que as credenciais no arquivo "data-source.ts" estejam corretas. Em seguida, crie um arquivo .env e defina a variável de ambiente API_KEY, inserindo a chave da API do ChatGPT.
Para inserir dados de faturas de energia, execute o script localizado em "\api\src\scripts\InsertEnergyBills.ts" usando o comando "ts-node InsertEnergyBills.ts" em outra linha de comando. É crucial ter uma chave de API do ChatGPT para que o script funcione corretamente.

- **Alternativa 2 (Restore do Banco)**:
Após executar "npm i", faça a restauração do banco de dados. Para isso, crie um banco de dados no PostgreSQL e utilize o arquivo localizado em "\api\dump\challenge-lumi-database" para realizar o restore. Após a restauração, inicie a API com "npm run start:dev".

