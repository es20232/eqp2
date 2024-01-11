# Mini Instagram Project (InstaTwo) 📸
Este é um projeto simples de Mini Instagram com frontend em React.js, utilizando Axios para requisições HTTP e Bootstrap para estilização. O backend é construído com Django e Django Rest Framework para criar uma API.

![image](https://github.com/es20232/eqp2/assets/40923082/cda08bc9-7f52-43b6-89ff-f5afb2d26da5)

## Frontend (React.js) 🌐
### Requisitos 🛠️
Certifique-se de ter o Node.js e o npm instalados no seu sistema.
Link: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

### Passo a Passo 🚀
- Clone o Repositório:
```
git clone https://github.com/seu-usuario/instatwo.git
cd instatwo/frontend
```
- Instale as Dependências:
```
npm install
```
- Inicie o Servidor de Desenvolvimento:

```
npm start
```
O aplicativo estará disponível em http://localhost:3000.

## Backend (Django + Django Rest Framework)⚙️
### Requisitos 🛠️
Certifique-se de ter Python e pip instalados no seu sistema.

### Passo a Passo 🚀
- Mude para a Pasta do Backend:
```
cd ../backend
```
- Instale as Dependências do Backend:
```
pip install -r requirements.txt
```
- Execute as Migrações do Banco de Dados:
```
python manage.py migrate
```
- Crie um Superusuário (Opcional):
```
python manage.py createsuperuser
```
- Inicie o Servidor do Django:
```
python manage.py runserver
```
O backend estará disponível em http://localhost:8000.
