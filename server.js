app.post(['/create-draft-order', '/validate-blend', '/submit-custom-blend'], (req, res) => {
  const { herbs } = req.body;
  const formulaString = herbs ? herbs.map(h => `${h.name}: ${h.percentage}%`).join(', ') : 'Custom Blend';

  console.log("GVS Request Received:", formulaString);

  // The builder likely only wants the 'draft_order' object. 
  // Extra keys like 'success' or 'data' might be causing the parser to fail.
  res.status(200).json({
    draft_order: {
      id: 61615970779506, // Using your numeric variant ID as a fallback
      invoice_url: "https://www.gvsherbalremedy.com/cart",
      status: "open"
    },
    // We keep these here just in case our Shopify script needs them
    success: true,
    variantId: 61615970779506,
    formula: formulaString
  });
});
