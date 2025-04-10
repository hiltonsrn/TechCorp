# Teste prático Aeon - FrontEnd

## Descrição
Frontend single-page application (SPA) desenvolvido em React. 
Esse frontend provê a interface gráfica para as operações CRUD do cadastro de usuário conforme solicitado no Teste.

## Instruções de instalação e execução
### Pré-requisitos
Docker desktop

Criação da imagem do Frontend através do arquivo Dockerfile localizado na raiz da pasta Frontend (certifique que esteja nesse diretório)
```bash
docker build -t frontend .
```

Criação do container para a imagem da Frontend com o volume especificado no arquivo Dockerfile
```bash
docker run -d --name frontend -v frontend-volume:/var/www/html --network techcorp  frontend
```

Vá para o diretório nginx e siga as instruções do arquivo README.md localizado nesse diretório