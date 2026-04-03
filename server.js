import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Catch BOTH the early AI check and the final Add to Cart
app.post(['/create-draft-order', '/validate-blend'], (req, res) => {
  const { herbs, bottleSize } = req.body;
  const total = herbs ? herbs.reduce((sum, h) => sum + h.percentage, 0) : 0;
  
  if (total !== 100 && req.path === '/validate-blend') {
    return res.status(400).json({ error: 'Formula must total 100%' });
  }

  const formulaString = herbs ? herbs.map(h => `${h.name}: ${h.percentage}%`).join(', ') : '';

  // We send EVERYTHING: The new data for Shopify AND the old field to stop the React crash
  res.json({ 
    success: true, 
    formula: formulaString,
    variantId: 61615970779506,
    invoice_url: "/cart" // This trick tells the React app "Go to the cart page" instead of crashing
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
