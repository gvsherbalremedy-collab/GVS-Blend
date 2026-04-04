import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post(['/create-draft-order', '/validate-blend', '/submit-custom-blend'], (req, res) => {
  const { herbs } = req.body;
  const formulaString = herbs ? herbs.map(h => `${h.name}: ${h.percentage}%`).join(', ') : 'Custom Blend';

  res.status(200).json({
    draft_order: {
      id: 61615970779506, 
      invoice_url: "https://www.gvsherbalremedy.com/cart",
      status: "open"
    },
    success: true,
    variantId: 61615970779506,
    formula: formulaString
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
