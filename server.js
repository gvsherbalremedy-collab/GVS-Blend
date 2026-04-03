import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post(['/create-draft-order', '/validate-blend'], (req, res) => {
  const { herbs, bottleSize } = req.body;
  
  // Create the formula string for Shopify
  const formulaString = herbs ? herbs.map(h => `${h.name}: ${h.percentage}%`).join(', ') : 'Custom Blend';

  // NESTED RESPONSE: This mimics the exact Shopify API structure the React app is looking for
  res.json({
    success: true,
    variantId: 61615970779506,
    formula: formulaString,
    // The React app looks for data.draft_order.invoice_url
    draft_order: {
      invoice_url: "/cart" 
    },
    // Adding it at the top level too just in case
    invoice_url: "/cart"
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
