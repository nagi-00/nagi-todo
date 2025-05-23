const express = require('express');
const fetch   = require('node-fetch');
const app     = express();
const PORT    = 3000;

// CORS 허용
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/discord-latest', async (req, res) => {
  try {
    const token     = process.env.DISCORD_BOT_TOKEN;
    const channelId = process.env.DISCORD_CHANNEL_ID;
    const apiUrl    = `https://discord.com/api/v10/channels/${channelId}/messages?limit=5`;
    const resp      = await fetch(apiUrl, {
      headers: { Authorization: `Bot ${token}` }
    });
    if (!resp.ok) throw new Error('Discord API error');
    const msgs   = await resp.json();
    const latest = msgs.find(m => m.content !== '😴 휴식의 시간.');
    res.json({ content: latest?.content || '' });
  } catch {
    res.status(500).json({ content: '' });
  }
});

// 정적 파일 서빙
app.use(express.static('.'));

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
const express = require('express');
const fetch   = require('node-fetch');
const app     = express();
const PORT    = 3000;

// 모든 출처 허용(CORS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/discord-latest', async (req, res) => {
  try {
    const token     = process.env.DISCORD_BOT_TOKEN;
    const channelId = process.env.DISCORD_CHANNEL_ID;
    const apiUrl    = `https://discord.com/api/v10/channels/${channelId}/messages?limit=5`;
    const resp      = await fetch(apiUrl, {
      headers: { Authorization: `Bot ${token}` }
    });
    if (!resp.ok) throw new Error('Discord API error');
    const msgs   = await resp.json();
    const latest = msgs.find(m => m.content !== '😴 휴식의 시간.');
    return res.json({ content: latest?.content || '' });
  } catch {
    return res.status(500).json({ content: '' });
  }
});

// 정적 파일 서빙
app.use(express.static('.'));

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
