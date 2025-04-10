# Teste prático Aeon - BackEnd

## Descrição
Api desenvolvida em NodeJS com Express e Prisma ORM e banco de dados MySQL. 
Essa Api provê as rotas para operações CRUD de cadastro de usuários, conforme solicitado no Teste enviado.

## Instruções de instalação e execução
### Pré-requisitos
Docker desktop

Criar NetWork para comunicação entre os contêineres
```bash
docker network create techcorp
```

Criação do container do banco de dados
```bash
docker run -p 32031:3306 --network techcorp --name usersdb  -e MYSQL_ROOT_PASSWORD=123456 -d mysql:latest
```

Criação da imagem da Api através do arquivo Dockerfile localizado na raiz da pasta Backend (certifique que esteja nesse diretório)
```bash
docker build -t backend .
```

Criação do container para a imagem da Api
```bash
docker run --name backend --network techcorp -dp 127.0.0.1:5002:5002 backend
```