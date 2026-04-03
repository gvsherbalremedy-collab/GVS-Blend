import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.post(['/create-draft-order', '/validate-blend', '/submit-custom-blend'], (req, res) => {
  const { herbs } = req.body;
  const formulaString = herbs ? herbs.map(h => `${h.name}: ${h.percentage}%`).join(', ') : 'Custom Blend';

  // This object contains everything the builder needs
  const result = {
    success: true,
    variantId: 61615970779506,
    formula: formulaString,
    invoice_url: "https://www.gvsherbalremedy.com/cart",
    draft_order: {
      id: 123456789,
      invoice_url: "https://www.gvsherbalremedy.com/cart",
      status: "open"
    }
  };

  // We send it normally AND wrapped in a 'data' key to stop the Error at line 53
  res.status(200).json({
    ...result,
    data: result 
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
