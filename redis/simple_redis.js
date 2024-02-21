const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');

console.log('set value');
client.set('swag', 'swagvalue')

console.log('get data');
console.log(client.get('swag'));