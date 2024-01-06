# Projeto InstaTwo: mini instagram

Este projeto é um pequeno clone do Instagram, apelidado carinhosamente de InstaTwo. Possui funcionalidades básicas para um mini Instagram, dividido em Backend, Frontend e MyAPI.

## Estrutura do Projeto 🏗️
O projeto está organizado da seguinte maneira:

- backend: Contém o código do Django para o backend do aplicativo.
- frontend: Contém o código do React para o frontend do aplicativo.
- myapi: Contém APIs adicionais desenvolvidas usando o Django Rest Framework.
- 
## Configuração do Backend 🚀
A pasta backend contém toda a lógica do servidor Django. Para configurar o ambiente, siga as etapas abaixo:

```
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
O servidor estará rodando em http://localhost:8000.

## Configuração do Frontend ⚛️
A pasta frontend contém o código do aplicativo React. Para configurar o ambiente, siga as etapas abaixo:

```
cd frontend
npm install
npm start
```
O aplicativo estará rodando em http://localhost:3000.

O frontend usa Axios para manipular a API fornecida pelo backend. Também ocorre o uso do framework bootstrap para acelerar a crição de layouts.

## MyAPI - Django Rest Framework 🌐
A pasta myapi contém APIs adicionais desenvolvidas usando o Django Rest Framework. Essas APIs podem ser integradas ao backend principal conforme necessário. 

```
cd myapi
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
As APIs estarão disponíveis em http://localhost:8000/api/.
