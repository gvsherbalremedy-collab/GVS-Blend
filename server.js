// Example Frontend trigger
const response = await fetch('https://gvs-blend-1.onrender.com/create-draft-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
const data = await response.json();
window.location.href = data.invoiceUrl; // Redirects to Shopify