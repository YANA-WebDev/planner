const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.get('/api/music/jazz', (req, res) => {
    const jazzPlaylistURL = 'https://www.youtube.com/watch?v=CfPxlb8-ZQ0'; 
    res.json({ url: jazzPlaylistURL });
});

const PORT = 3001; 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
