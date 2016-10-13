
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
psql -d postpg -c "SELECT * FROM todos"
```

| APIs | REST | 
| --- |---| 
| /api/products | GET | 
| /api/products/:id | GET | 
| /api/admin/products/ | POST | 
| /api/admin/products/:id/ | PUT / DELETE | 
| /api/signup | POST | 
| /api/login | POST | 
| /api/logout | GET | 
| /api/reset_password | POST | 
| /api/account | GET / PUT / DELETE | 
| /api/account/invoices | GET | 

