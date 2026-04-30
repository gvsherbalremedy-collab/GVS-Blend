import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// 1. Serve static files (HTML, CSS, JS) from the root directory
app.use(express.static(__dirname));

// 2. Your existing API logic
app.post(['/create-draft-order', '/validate-blend', '/submit-custom-blend'], (req, res) => {
  const variantId = 61615970779506;
  const permalink = `https://www.gvsherbalremedy.com/cart/${variantId}:1`;

  res.status(200).json({
    success: true,
    invoice_url: permalink,
    draft_order: { id: variantId, invoice_url: permalink, status: "open" }
  });
});

// 3. The "Catch-all" route: This serves index.html when you visit the main URL
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
