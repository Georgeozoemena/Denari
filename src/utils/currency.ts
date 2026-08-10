export const CURRENCIES = [
  { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬', symbol: '₦' },
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', symbol: '$' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', symbol: '£' },
] as const;

export function getCurrencySymbol(code: string = 'NGN'): string {
  const currency = CURRENCIES.find((c) => c.code === code);
  return currency?.symbol || '₦';
}

export function formatCurrency(amount: number, currencyCode: string = 'NGN'): string {
  const symbol = getCurrencySymbol(currencyCode);
  
  // Format with K for thousands, M for millions
  if (amount >= 1000000) {
    return `${symbol}${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `${symbol}${(amount / 1000).toFixed(0)}K`;
  }
  return `${symbol}${amount.toLocaleString()}`;
}

export function formatCurrencyFull(amount: number, currencyCode: string = 'NGN'): string {
  const symbol = getCurrencySymbol(currencyCode);
  return `${symbol}${amount.toLocaleString()}`;
}
