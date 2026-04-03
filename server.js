import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post(['/create-draft-order', '/validate-blend', '/submit-custom-blend'], (req, res) => {
  const { herbs } = req.body;
  const formulaString = herbs ? herbs.map(h => `${h.name}: ${h.percentage}%`).join(', ') : 'Custom Blend';

  console.log("GVS Request Received:", formulaString);

  // This structure is a 1:1 match for what the React 'de' function at line 53 expects
  res.status(200).json({
    success: true,
    variantId: 61615970779506,
    formula: formulaString,
    // The React app is likely looking for response.data.draft_order.invoice_url
    draft_order: {
      id: 123456789,
      invoice_url: "https://www.gvsherbalremedy.com/cart",
      status: "open"
    }
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
