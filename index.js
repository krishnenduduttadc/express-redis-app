const express = require('express');
const { createClient } = require('redis');

const app = express();
const port = 3000;

const redisClient = createClient({ url: 'redis://redis:6379' }); // "redis" is the service name

redisClient.connect().then(() => {
  console.log("✅ Connected to Redis");

  app.get('/', async (req, res) => {
    await redisClient.set('message', 'Hello from Redis via Docker Compose!');
    const msg = await redisClient.get('message');
    res.send(msg);
  });

  app.listen(port, () => console.log(`🚀 App on http://localhost:${port}`));
}).catch(console.error);
