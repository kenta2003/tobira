/**
 * Admin user utilities
 */

/**
 * Get list of admin user IDs from ADMIN_USER_IDS environment variable
 * Parses comma-separated list and filters empty strings
 */
export function getAdminUserIds(): string[] {
  return (process.env.ADMIN_USER_IDS ?? '')
    .split(',')
    .map(id => id.trim())
    .filter(Boolean);
}
