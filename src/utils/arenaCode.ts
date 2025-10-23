/**
 * Generate a random 6-character arena code in format ABC-123
 */
export function generateArenaCode(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  
  let code = '';
  
  // Generate 3 random letters
  for (let i = 0; i < 3; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  
  code += '-';
  
  // Generate 3 random numbers
  for (let i = 0; i < 3; i++) {
    code += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  
  return code;
}

/**
 * Generate a unique arena code (for localStorage implementation)
 */
export async function generateUniqueArenaCode(): Promise<string> {
  // For localStorage, we just generate a code
  // In a real implementation with a database, we'd check for uniqueness
  return generateArenaCode();
}

/**
 * Format arena code for display (adds hyphen if not present)
 */
export function formatArenaCode(code: string): string {
  if (code.includes('-')) {
    return code;
  }
  
  // If code doesn't have hyphen, add it after 3rd character
  if (code.length === 6) {
    return `${code.slice(0, 3)}-${code.slice(3)}`;
  }
  
  return code;
}
