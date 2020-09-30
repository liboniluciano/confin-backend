console.log(process.env.DATABASE_URL);
module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [
     "dist/database/models/**/*.ts"
  ],  
  "migrations": [
   "dist/database/migrations/**/*.ts"
 ],
  "cli":{
   "migrationsDir": [
     "src/database/migrations/"
   ],
   "entitiesDir": "src/database/models"
   }
 }