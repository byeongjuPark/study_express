const redis = require('redis');
const client = redis.createClient({ legacyMode: true } ,6379, '127.0.0.1');
client.connect();
client.on('connect', () => {
    console.info('Redis connected!');
});
client.on('error', (err) => {
    console.error('Redis Client Error', err);
});

client.set('key', '123');
var a = client.get('key', (err, value) => {
	console.log(value); // 123
    return;
})

console.log(a);