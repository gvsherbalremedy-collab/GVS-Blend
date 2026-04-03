import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Using a "neutral" name to bypass ad-blockers
app.post(['/submit-custom-blend', '/validate-blend', '/create-draft-order'], (req, res) => {
  const { herbs } = req.body;
  const formulaString = herbs ? herbs.map(h => `${h.name}: ${h.percentage}%`).join(', ') : 'Custom Blend';

  res.json({
    success: true,
    variantId: 61615970779506,
    formula: formulaString,
    draft_order: { invoice_url: "/cart" }
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
