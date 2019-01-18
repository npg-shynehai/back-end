# DB Init
### Init:  
node_modules/.bin/sequelize init

### Tao file models:  
node_modules/.bin/sequelize model:generate --name Person --attributes name:string,age:integer,comment:text
### Create table : 
node_modules/.bin/sequelize db:migrate

### Test (include standard check and run test export to html mochawesome-report folder)
npm test