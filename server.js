import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post(['/create-draft-order', '/validate-blend', '/submit-custom-blend'], (req, res) => {
  const { herbs } = req.body;
  const formulaString = herbs ? herbs.map(h => `${h.name}: ${h.percentage}%`).join(', ') : 'Custom Blend';

  // We provide the invoice_url in EVERY possible format the React app might want
  const dataPayload = {
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

  // Some Axios/Fetch wrappers expect the data to be nested inside a 'data' property
  res.status(200).json({
    ...dataPayload,
    data: dataPayload 
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
