import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Handle all paths the builder might try to call
app.post(['/create-draft-order', '/validate-blend', '/submit-custom-blend'], (req, res) => {
  const { herbs } = req.body;
  const formulaString = herbs ? herbs.map(h => `${h.name}: ${h.percentage}%`).join(', ') : 'Custom Blend';

  console.log("GVS: Request received for:", formulaString);

  // This specific 'draft_order' nesting is what prevents the Error at line 53
  res.json({
    success: true,
    variantId: 61615970779506,
    formula: formulaString,
    draft_order: {
      invoice_url: "/cart" 
    }
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
