export default function saveStringAsFile(content: string, filename: string, extension: string) {
	// Ensure filename has the correct extension
	const fullFilename = filename.endsWith(`.${extension}`) ? filename : `${filename}.${extension}`;

	// Create a blob with the content
	const blob = new Blob([content], { type: "text/plain" });

	// Create a download link
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = fullFilename;

	// Trigger download
	document.body.appendChild(a);
	a.click();

	// Clean up
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}
