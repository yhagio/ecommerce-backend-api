* [X] JWT Token issued on signup / login
* [X] User authentication (signup) + Validation
* [X] User authentication (signin) + Validation
* [X] GET all products
* [X] POST create product + Validation
* [X] PUT update product + Validation
* [X] DELETE product
* [X] ONLY Admin can add/update/delete product 
* [ ] Mailgun notification (Signup confirmation) 
  * Resource: https://www.quora.com/How-can-you-send-a-password-email-verification-link-using-NodeJS-1
* [ ] Mailgun notification (Reset password)
* [ ] Search products
* [ ] Add a review of a product user purchased
* [ ] Social share buttons

#### Stripe integration
* [X] User can purchase a product 
* [ ] User has access to the purchased product (downloadable link)
* [ ] Receipts, User can see them in account page
* [ ] Refund

#### Testing
* [ ] Unit Testing
* [ ] E2E Testing?


#### Resource
- [Sequelize](http://docs.sequelizejs.com/en/v3/)

To add admin, run this
```
psql -d <Your DB Name> -c "DROP TABLE users"
export ADMIN_FNAME=Yuichi
export ADMIN_LNAME=Hagio
export ADMIN_EMAIL=admin@cc.cc
export ADMIN_PASSWORD=Pass123!
export STRIPE_API_KEY=sk_test_OJz03Gsmewauak1Y2dSEuUtJ
npm run start
```

DB Design
http://stackoverflow.com/questions/8865272/designing-a-rudimentary-shopping-cart-database
https://www.princeton.edu/~rcurtis/ultradev/ecommdatabase2.html

Sequelize Relation / Foreign Key
https://github.com/sequelize/sequelize/issues/5792

Social Network DB Relationship
http://www.codedodle.com/2014/12/social-network-friends-database.html

Example (tutorial)
http://mherman.org/blog/2015/10/22/node-postgres-sequelize/#.WAfXh5MrKRv

http://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/#.WAfXTpMrKRu

https://github.com/andvote/andvote

https://github.com/MaxC24/twitter-sql/tree/master/twitter-sql


#### Sequelize-CLI
```
sequelize init
```


