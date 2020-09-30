console.log(process.env.DATABASE_URL);
module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [
     "dist/database/models/**/*.js"
  ],  
  "migrations": [
   "dist/database/migrations/**/*.js"
 ],
  "cli":{
   "migrationsDir": [
     "src/database/migrations/"
   ],
   "entitiesDir": "src/database/models"
   }
 }