

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


| APIs | VERB | Parameters | Description |
| --- | --- | --- | --- |
| /api/users | POST | (first_name, last_name, email, password) | SignUp |
| /auth/signin | POST | (email, password) | SignIn |
| /auth/userdata | GET | none | Profile Data |
| /api/products | GET | None | List of products |
| /api/products/:product_id | GET | (product_id) | A product |
| /api/admin/products/ | POST | (name, price, description) | Create product |
| /api/admin/products/:product_id | PUT / DELETE | (product_id) | Update or delete product |
| /api/products/:product_id | POST | (product_id) | Add product to cart |
| /api/users/reset_password | POST | (email) | Reset password via Mailgun |
| /api/account | GET / PUT / DELETE | (none) | Account info |
| /api/account/invoices | GET | (none) | Invoice list |
| /api/account/invoices/:id | GET | (none) | An invoice info |
| /api/cart | GET | (none) | Shopping cart |
| /api/cart | POST | (none) | Place the order |

