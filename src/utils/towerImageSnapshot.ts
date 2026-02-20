// tower-snapshot.ts

export interface TowerSnapshotOptions {
	initialX?: number;
	initialY?: number;
	markerImagePath?: string; // Optional custom marker image
	onCoordinateChange?: (x: number, y: number) => void; // Callback when coordinates change
}

export interface TowerSnapshotController {
	setCoordinates: (x: number, y: number) => void;
	getCoordinates: () => { x: number; y: number };
}

export function createTowerSnapshot(parentId: string, imagePath: string, options: TowerSnapshotOptions = {}): TowerSnapshotController {
	// Get parent element
	const parent = document.getElementById(parentId);
	if (!parent) {
		throw new Error(`Element with id "${parentId}" not found`);
	}

	// Set up variables
	let currentX = options.initialX || 0;
	let currentY = options.initialY || 0;
	let imageWidth = 0;
	let imageHeight = 0;
	const cropHeight = 200; // Fixed crop height

	// Clear parent but preserve its classes
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}

	// Create wrapper
	const wrapper = document.createElement("div");
	wrapper.style.cssText = `
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	`;

	// Create image element - this will display our cropped version
	const displayImg = document.createElement("img");
	displayImg.style.cssText = `
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: contain;
	`;

	// Create marker element
	const marker = document.createElement("img");
	if (options.markerImagePath) {
		marker.src = options.markerImagePath;
	} else {
		// Default marker (red circle with white border)
		marker.src =
			'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%23ff4444" stroke="white" stroke-width="3"/></svg>';
	}
	marker.style.cssText = `
		position: absolute;
		width: 24px;
		height: 24px;
		transform: translate(-50%, -50%);
		pointer-events: none;
		z-index: 10;
		display: none;
	`;

	// Create offscreen canvas for cropping
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	// Append elements
	wrapper.appendChild(displayImg);
	wrapper.appendChild(marker);
	parent.appendChild(wrapper);

	// Load the original image
	const originalImg = new Image();
	originalImg.crossOrigin = "anonymous";

	originalImg.onload = () => {
		imageWidth = originalImg.naturalWidth;
		imageHeight = originalImg.naturalHeight;

		// Set canvas size (keep full width, crop height)
		canvas.width = imageWidth;
		canvas.height = cropHeight;

		// Initial render
		renderSnapshot(currentX, currentY);
	};
	originalImg.src = imagePath;

	function renderSnapshot(x: number, y: number) {
		if (!ctx || !imageWidth || !imageHeight || !originalImg.complete) return;

		// Clamp coordinates to image boundaries
		const clampedX = Math.max(0, Math.min(x, imageWidth));
		const clampedY = Math.max(0, Math.min(y, imageHeight));

		// Calculate crop start Y to place marker in lower half
		// We want marker at Y to be at 75% of crop height (between halfway and bottom)
		const targetPosition = cropHeight * 0.75; // Marker at 75% down from top
		let cropStartY = clampedY - targetPosition;

		// Ensure crop stays within image bounds
		cropStartY = Math.max(0, Math.min(cropStartY, imageHeight - cropHeight));

		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw cropped image
		ctx.drawImage(
			originalImg,
			0,
			cropStartY, // Source x, y
			imageWidth,
			cropHeight, // Source width, height
			0,
			0, // Destination x, y
			imageWidth,
			cropHeight, // Destination width, height
		);

		// Update display image with cropped version
		displayImg.src = canvas.toDataURL("image/png");

		// Calculate marker position in the cropped view
		const markerY = clampedY - cropStartY;

		// Update marker position (X is direct percentage, Y is relative to crop height)
		marker.style.left = `${(clampedX / imageWidth) * 100}%`;
		marker.style.top = `${(markerY / cropHeight) * 100}%`;
		marker.style.display = "block";

		// Store current coordinates
		currentX = clampedX;
		currentY = clampedY;

		// Trigger callback if provided
		if (options.onCoordinateChange) {
			options.onCoordinateChange(clampedX, clampedY);
		}
	}

	// Return controller
	return {
		setCoordinates: (x: number, y: number) => {
			renderSnapshot(x, y);
		},
		getCoordinates: () => ({ x: currentX, y: currentY }),
	};
}
