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

 process.env.URLDB = 'mongodb://cafe-user:123456a@ds261660.mlab.com:61660/cafedb';


// ========================================
// Token expiration
// ========================================
// 60 secs
process.env.EXPIRATION_TOKEN = 60*60*24*30;

// ========================================
// SEED authentication
// ========================================

process.env.SEED = process.env.SEED || 'this is develop seed';

