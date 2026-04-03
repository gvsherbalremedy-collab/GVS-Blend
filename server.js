import express from 'express';
import cors from 'cors';

const app = express();

// 1. Precise CORS setup to ensure the React app can read the JSON
app.use(cors({
  origin: '*',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.post(['/create-draft-order', '/validate-blend', '/submit-custom-blend'], (req, res) => {
  const { herbs } = req.body;
  const formulaString = herbs ? herbs.map(h => `${h.name}: ${h.percentage}%`).join(', ') : 'Custom Blend';

  console.log("GVS: Success for formula:", formulaString);

  // 2. The "Mirror" Structure
  // We send the invoice_url in 3 different places to ensure the React 'de' function finds it
  const successResponse = {
    success: true,
    variantId: 61615970779506,
    formula: formulaString,
    invoice_url: "https://www.gvsherbalremedy.com/cart",
    draft_order: {
      id: 999999999,
      invoice_url: "https://www.gvsherbalremedy.com/cart",
      status: "open"
    }
  };

  // Some React apps look for { data: { ... } }
  res.status(200).json({
    ...successResponse,
    data: successResponse 
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
