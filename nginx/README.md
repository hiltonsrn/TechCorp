# Teste prático Aeon - Deploy frontend

## Descrição
Deploy e execução utilizando NGINX. Com a realização desse deploy é possivel acessar a execução do front end

## Instruções de instalação e execução
### Pré-requisitos
Docker desktop
Realizar os passos descritos no arquivo README.md localizado na pasta Backend
Realizar os passos descritos no arquivo README.md localizado na pasta Frontend

Criação da imagem do deploy através do arquivo Dockerfile localizado na raiz da pasta nginx (certifique que esteja nesse diretório)
```bash
docker build -t nginx .
```

Criação do container para a imagem da deploy com o volume criado nos passos realizados através do arquivo README.md localizado no diretório Frontend
```bash
docker run -d --name nginx -v frontend-volume:/var/www/html -p 80:80 --network techcorp  nginx
```

Acesse a aplicação no endereço
```bash
http://localhost
```