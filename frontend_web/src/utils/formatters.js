export const formatCurrency = (value) => {
  if (!value) return '₹0';
  return `₹${Number(value).toLocaleString('en-IN')}`;
};

export const formatPercentage = (value) => {
  if (!value) return '0%';
  return `${Number(value).toFixed(2)}%`;
};