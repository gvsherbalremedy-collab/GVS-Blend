import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post(['/create-draft-order', '/validate-blend', '/submit-custom-blend'], (req, res) => {
  const { herbs } = req.body;
  const formulaString = herbs ? herbs.map(h => `${h.name}: ${h.percentage}%`).join(', ') : 'Custom Blend';

  const result = {
    success: true,
    // CRITICAL: Changed from string 'gid://...' to the pure numeric ID
    variantId: 61615970779506, 
    formula: formulaString,
    invoice_url: "/cart",
    draft_order: {
      id: 123456789,
      invoice_url: "/cart",
      status: "open"
    }
  };

  res.status(200).json({
    ...result,
    data: result 
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
