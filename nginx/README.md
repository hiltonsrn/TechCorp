# Teste prático Aeon - Deploy frontend

## Descrição
Deploy e execução utilizando NGINX. Com a realização desse deploy é possivel acessar a execução do front end

## Instruções de instalação e execução
### Pré-requisitos
Docker desktop
Realizar os passos descritos no arquivo README.md localizado na pasta Backend

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