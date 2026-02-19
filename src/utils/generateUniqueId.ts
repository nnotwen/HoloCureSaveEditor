// Store all generated IDs here
const usedIds = new Set<string>();

// Character sets
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const alphanumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * Generate a secure, unique 8-character alphanumeric ID.
 * First character is always a letter (a-z, A-Z) for CSS selector compatibility.
 */
export function generateUniqueId(): string {
	let id: string;

	do {
		// Generate 8 random values securely
		const randomValues = crypto.getRandomValues(new Uint8Array(8));

		// First character MUST be a letter
		const firstChar = letters[randomValues[0] % letters.length];

		// Remaining characters can be alphanumeric
		const restChars = Array.from(randomValues.slice(1))
			.map((n) => alphanumeric[n % alphanumeric.length])
			.join("");

		id = firstChar + restChars;
	} while (usedIds.has(id)); // Retry if duplicate

	// Store the new ID in the set
	usedIds.add(id);

	return id;
}
