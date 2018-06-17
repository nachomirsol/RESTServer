// ========================================
// Port
// ========================================
process.env.PORT = process.env.PORT || 3000;


// ========================================
// Environment
// ========================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ========================================
// Database
// ========================================
let URLDB;

 if (process.env.NODE_ENV === 'dev') {

     urlDB = 'mongodb://localhost:27017/cafe';

 } else {

     URLDB = 'mongodb://cafe-user:123456a@ds261660.mlab.com:61660/cafedb';

 }

process.env.URLDB = URLDB