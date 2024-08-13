# Como rodar o projeto

- Instalar Dependências<br/>
  ``npm install``

- Crie e configure um arquivo .env (*Use o arquivo .env.example como base*)

- Agora você pode rodar o banco de dados utilizando o comando<br/>
  ``docker-compose up``

- Crie uma migratation do prisma (*Confirme se o BD já está rodando*)<br/>
  ``npx prisma migrate dev``

- Agora só rodar o projeto (*O arquivo Request_Lib tem as chamadas comtempladas na aplicação e pode ser importado no postman ou insomnia.*)<br/>
  ``npm start``


# Tecnologias usadas no projeto

- Framework: NestJs
- ORM: Prisma
- BD: Postgresql
- Containerização: Docker
- Estratégia de autenticação com tokens: JWT
