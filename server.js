import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post(['/create-draft-order', '/validate-blend', '/submit-custom-blend'], (req, res) => {
  const variantId = 61615970779506;
  // This is a Shopify Permalink: it adds the item and goes to checkout/cart automatically
  const permalink = `https://www.gvsherbalremedy.com/cart/${variantId}:1`;

  res.status(200).json({
    success: true,
    invoice_url: permalink, // Top level
    invoiceUrl: permalink,  // CamelCase just in case
    url: permalink,         // Simple URL just in case
    draft_order: {
      id: variantId,
      invoice_url: permalink,
      status: "open"
    },
    data: {
      invoice_url: permalink
    }
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
