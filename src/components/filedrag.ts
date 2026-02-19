import $ from "jquery";
import { generateUniqueId } from "../utils/generateUniqueId";
import toast from "./toast";
import { HoloCureSaveData } from "../types/savedata";

// Define the event data interfaces
interface SaveFileLoadedEventData {
	data: HoloCureSaveData; // Replace 'any' with your HoloCureSaveData type
	file: File;
	timestamp: number;
}

// Extend jQuery's event handling with your custom events
declare global {
	interface JQuery {
		on(event: "saveFileLoaded", handler: (event: JQuery.Event, data: SaveFileLoadedEventData) => void): this;
	}
}

export default {
	render(containerSelector: string) {
		const sectionId = generateUniqueId();
		const fileInputId = generateUniqueId();

		$(containerSelector).append(/*html*/ `
            <p class="tw:flex-1 text-center tw:font-bold tw:text-xl">Upload your save file</p>
            <div id="${sectionId}" class="tw:flex tw:border-3 tw:group tw:border-dashed tw:border-gray-400 tw:rounded-lg tw:text-center tw:cursor-pointer tw:hover:border-blue-500 tw:transition-colors tw:text-gray-400 tw:hover:text-white tw:h-100 tw:hover:bg-gray-950/50">
                <div class="tw:flex tw:flex-col tw:gap-4 m-auto">
                    <i class="bi bi-file-earmark-arrow-up tw:text-6xl"></i>
                    <p class="tw:mb-0!">Drag and drop save_n.dat file here or <strong class="tw:text-blue-800 tw:group-hover:text-blue-500 tw:hover:underline tw:transition-colors">browse</strong></p>
                </div>
                <input type="file" id="${fileInputId}" class="tw:hidden" accept=".dat">
            </div>
        `);

		$(`#${sectionId}`)
			.on("dragenter dragover dragleave drop", function (e) {
				e.preventDefault();
				e.stopPropagation();
			})
			.on("dragenter dragover", function () {
				$(this).addClass("tw:border-blue-500 tw:bg-gray-950").removeClass("tw:border-gray-400");
			})
			.on("dragleave", function () {
				$(this).removeClass("tw:border-blue-500 tw:bg-gray-950").addClass("tw:border-gray-400");
			})
			.on("drop", function (e) {
				$(this).removeClass("tw:border-blue-500 tw:bg-gray-950").addClass("tw:border-gray-400");
				const file = e.originalEvent?.dataTransfer?.files?.[0];
				if (!file) return;

				handleFile(file);
			})
			.on("click", function (e) {
				$(`#${fileInputId}`).trigger("click");
			});

		$(`#${fileInputId}`)
			.on("click", function (e) {
				e.stopPropagation();
			})
			.on("change", function (e) {
				// Add this change handler
				const file = (this as HTMLInputElement).files?.[0];
				if (!file) return;

				handleFile(file);
			});

		return sectionId;
	},
};

function handleFile(file: File) {
	if (!file.name.endsWith(".dat")) {
		return toast.error(`Incorrect file type .${file.name.split(".").pop()}. Upload only .dat file.`);
	}

	const reader = new FileReader();

	reader.onload = function (e) {
		try {
			const content = e.target?.result;
			if (!content) return toast.error("The uploaded save file is empty!");
			const data: HoloCureSaveData = JSON.parse(atob(content as string));

			if (!data.GameVersionNumberMajor || !data.GameVersionNumberMinor) return toast.error("Unsupported version {GameVersionNotFound}!");
			if (data.GameVersionNumberMajor < 0.7)
				return toast.error(`Unsupported version ${data.GameVersionNumberMajor}.${data.GameVersionNumberMinor}. Only supported version is >= 0.7`);

			toast.success(`Loaded data for version ${data.GameVersionNumberMajor}.${data.GameVersionNumberMinor}`);

			$(document).trigger("saveFileLoaded", [
				{
					data,
					file,
					timestamp: Date.now(),
				},
			]);
		} catch (error) {
			toast.error((error as Error).message);
		}
	};

	reader.readAsText(file);
}
