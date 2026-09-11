/**
 * Input Validation Utilities for Indian Taxation & Business Forms
 */

export function isValidIndianMobile(mobile: string): boolean {
  const cleaned = mobile.replace(/\D/g, '');
  // 10 digits starting with 6, 7, 8, or 9
  return /^[6-9]\d{9}$/.test(cleaned);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPan(pan: string): boolean {
  if (!pan) return false;
  // 5 letters + 4 digits + 1 letter (e.g. ABCDE1234F)
  return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.trim().toUpperCase());
}

export function isValidGstin(gstin: string): boolean {
  if (!gstin) return false;
  // 15-character GSTIN format
  return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstin.trim().toUpperCase());
}

export function formatIndianCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
