import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Simplified endpoint for the AJAX flow
app.post('/validate-blend', (req, res) => {
  const { herbs, bottleSize } = req.body;

  // Ensure herbs exist and total 100%
  const total = herbs.reduce((sum, h) => sum + h.percentage, 0);
  
  if (total !== 100) {
    return res.status(400).json({ error: 'Formula must total 100%' });
  }

  // Format the formula for the Cart properties
  const formulaString = herbs.map(h => `${h.name}: ${h.percentage}%`).join(', ');

  res.json({ 
    success: true, 
    formula: formulaString,
    variantId: 61615970779506 
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
