export function generateUsername(firstName: string, userId: number): string {
    return `${firstName.toLowerCase()}${userId}`;
}

