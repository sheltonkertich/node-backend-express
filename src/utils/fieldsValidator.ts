
export function validateUsername(username: string): boolean {
    console.log(username)
    const regex = /^[a-zA-Z0-9_]{3,9}$/;  // alphanumeric characters and underscores, 3-16 characters long
    return regex.test(username);
}