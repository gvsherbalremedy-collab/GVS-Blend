import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-draft-order', async (req, res) => {
  try {
    const { blendName, herbs, price, bottleSize, selectionType } = req.body;

    const payload = {
      draft_order: {
        line_items: [{
          title: blendName,
          original_custom_description: `Type: ${selectionType} | Size: ${bottleSize}`,
          price: price.toString(),
          quantity: 1,
          properties: herbs.map(h => ({
            name: h.name,
            value: `${h.percentage}%`
          }))
        }]
      }
    };

    const response = await axios.post(
      `https://${process.env.SHOPIFY_SHOP_DOMAIN}/admin/api/2024-01/draft_orders.json`,
      payload,
      {
        headers: {
          'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_TOKEN,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ invoiceUrl: response.data.draft_order.invoice_url });
  } catch (error) {
    console.error('Shopify Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create Shopify order' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
