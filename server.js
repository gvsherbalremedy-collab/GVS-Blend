import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// 1. Serve static files from the root directory
app.use(express.static(__dirname));

// 2. Your API Routes
app.post(['/create-draft-order', '/validate-blend', '/submit-custom-blend'], (req, res) => {
  const variantId = 61615970779506;
  const permalink = `https://www.gvsherbalremedy.com/cart/${variantId}:1`;
  res.status(200).json({ success: true, invoice_url: permalink });
});

// 3. Catch-all: Serve index.html for any GET request
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
