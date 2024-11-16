export function validateUsername(username: string): boolean {
    // Convert username to lowercase to enforce case-insensitivity
    username = username.trim().toLowerCase();
  
    // Reject empty or whitespace-only usernames
    if (username.length === 0) {
      return false;
    }
  
    // Regex to match alphanumeric characters, underscores, hyphens, and periods (3-15 characters long)
    const regex = /^[a-z0-9_.-]{3,15}$/;
  
    return regex.test(username);
  }
  