# first-node-tut
npm init inside an empty proj
npm install --save express

npm install --save-d nodemon
inside package.son, add "start": "nodemon server.js" to script block
now use: npm start

//setup log
npm install --save morgan

//we want to extract request body -- npm install --save body-parser
enable cors

use mongodb atlas
npm install --save mongoose
mongodb+srv://divinus:<password>@cluster0.a4kdz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

or use local mongodb mongoose connection
mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.1.9

//we want to at a point change our post method to accept multi-part/form-data body
npm install --save multer


we want to implement authentication
use nodejs bcrypt
npm install --save bcrypt