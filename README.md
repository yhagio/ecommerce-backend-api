

```
git clone git@github.com:yhagio/ecommerce-backend-api.git ec
cd ec
npm i -g yarn
yarn
```

#### Postgres Installation
```
brew update
brew install postgres
```

### Start locally
```
npm run start
```

```
psql -l
psql -d postpg -c "SELECT * FROM products"
```

#### To create database
```
createdb your_db_name
```
To check
```
psql
\l
```
Reference: https://www.postgresql.org/docs/9.1/static/app-createdb.html


| APIs | VERB | Parameters |
| --- |---| ---|
| /auth/signin | POST | (email, password) |
| /auth/userdata | GET | none |
| /api/products | GET | None |
| /api/products/:product_id | GET | (product_id) |
| /api/admin/products/ | POST | (name, price, description) |
| /api/admin/products/:product_id | PUT / DELETE | (product_id) |
| /api/users | POST | (first_name, last_name, email, password) |
| /api/users/reset_password | POST | (email) |
| /api/account | GET / PUT / DELETE | (none) |
| /api/account/invoices | GET | (none) |

