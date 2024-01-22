const Redis = require ("ioredis");
const REDIS_CLI = process.env.REDIS_CLI

const redis =  new Redis(REDIS_CLI)
module.exports = redis