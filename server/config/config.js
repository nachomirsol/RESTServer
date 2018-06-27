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
process.env.EXPIRATION_TOKEN = '48h';

// ========================================
// SEED authentication
// ========================================

process.env.SEED = process.env.SEED || 'this is develop seed';

// ========================================
// GOOGLE CLIENT ID
// ========================================
process.env.CLIENT_ID = process.env.CLIENT_ID || '99619117363-04j16d62fpoq3rjbi2o0rtceo46sm3cc.apps.googleusercontent.com';