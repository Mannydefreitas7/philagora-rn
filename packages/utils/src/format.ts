/**
 * Formats a date into a human-readable string.
 *
 * @param date - The date to format
 * @param locale - The locale to use for formatting (defaults to "en-US")
 * @returns A formatted date string
 */
export function formatDate(date: Date, locale: string = "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Formats a number as a currency string.
 *
 * @param amount - The amount to format
 * @param currency - The currency code (defaults to "USD")
 * @param locale - The locale to use for formatting (defaults to "en-US")
 * @returns A formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Slugifies a string for use in URLs.
 *
 * @param text - The text to slugify
 * @returns A URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}
