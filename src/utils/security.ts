/**
 * Application Security & Attack Defense Utilities
 * Manage With Bhairav
 */

/**
 * Strips dangerous HTML tags, executable script payloads, and injection vectors
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '') // remove HTML tags
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '') // remove event handlers like onload=, onclick=
    .trim();
}

/**
 * Client-Side Anti-Flooding & Rate Limiting Defense
 * Prevents malicious bots and automated scripts from spamming submission requests
 */
export function checkRateLimit(
  actionKey: string,
  maxAttempts: number = 4,
  windowSeconds: number = 60
): { allowed: boolean; waitSeconds: number } {
  try {
    const storageKey = `mb_rl_${actionKey}`;
    const now = Date.now();
    const stored = sessionStorage.getItem(storageKey);
    let timestamps: number[] = stored ? JSON.parse(stored) : [];

    // Filter timestamps within the window
    const windowMs = windowSeconds * 1000;
    timestamps = timestamps.filter(ts => now - ts < windowMs);

    if (timestamps.length >= maxAttempts) {
      const oldest = timestamps[0];
      const waitSeconds = Math.ceil((oldest + windowMs - now) / 1000);
      return { allowed: false, waitSeconds: Math.max(1, waitSeconds) };
    }

    timestamps.push(now);
    sessionStorage.setItem(storageKey, JSON.stringify(timestamps));
    return { allowed: true, waitSeconds: 0 };
  } catch {
    // If sessionStorage is unavailable, permit request
    return { allowed: true, waitSeconds: 0 };
  }
}

/**
 * Strict Document Security Verification
 */
export function validateSecureFile(file: File): { valid: boolean; error?: string } {
  const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];
  const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

  const fileName = file.name.toLowerCase();
  const hasValidExt = allowedExtensions.some(ext => fileName.endsWith(ext));

  if (!hasValidExt || !allowedMimeTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Security Error: Only verified PDF, JPG, and PNG files are permitted.'
    };
  }

  // Max 10MB limit
  const maxBytes = 10 * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: 'Security Error: File exceeds the maximum allowed limit of 10MB.'
    };
  }

  // Reject suspicious executable extensions even if disguised
  const dangerousPatterns = [/\.exe$/i, /\.bat$/i, /\.sh$/i, /\.cmd$/i, /\.scr$/i, /\.js$/i, /\.html$/i, /\.php$/i];
  if (dangerousPatterns.some(p => p.test(fileName))) {
    return {
      valid: false,
      error: 'Security Violation: Executable file upload rejected.'
    };
  }

  return { valid: true };
}
