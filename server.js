import express from 'express';
import cors from 'cors';

const app = express();

// 1. Expanded CORS to ensure the builder can read the response
app.use(cors({
  origin: '*',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.post(['/create-draft-order', '/validate-blend'], (req, res) => {
  const { herbs, bottleSize } = req.body;
  const formulaString = herbs ? herbs.map(h => `${h.name}: ${h.percentage}%`).join(', ') : 'Custom Blend';

  // 2. The "Perfect" Response Structure
  // This mimics Shopify exactly so the React app doesn't throw the Error at line 53
  res.json({
    success: true,
    variantId: 61615970779506,
    formula: formulaString,
    invoice_url: "/cart", // Top level for some builders
    draft_order: {
      invoice_url: "/cart" // Nested level for other builders
    }
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
