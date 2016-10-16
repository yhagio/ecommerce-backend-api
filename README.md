
```
brew update
brew install postgres
```

### Start
```
npm run start
```

```
psql -l
psql -d postpg -c "SELECT * FROM products"
```

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

