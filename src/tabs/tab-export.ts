import $ from "jquery";
import { HoloCureSaveData, Snapshot } from "../types/savedata";
import { Tooltip } from "bootstrap";
import saveStringAsFile from "../utils/saveStringAsFile";
import toast from "../components/toast";
import { generateUniqueId } from "../utils/generateUniqueId";
import "@andypf/json-viewer";
import $storage from "../utils/storage";

export default {
	render(parentId: string, data: HoloCureSaveData) {
		const jsonModalId = generateUniqueId();
		$("body").append(/*html*/ `
			<div class="modal fade" id="${jsonModalId}" aria-labelledby="${jsonModalId}-label" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
				<div class="modal-lg modal-dialog modal-dialog-scrollable modal-dialog-centered">
					<div class="modal-content tw:bg-gray-900!">
						<div class="modal-header">
							<h1 class="modal-title fs-5" id="${jsonModalId}-label">JSON Data</h1>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body tw:p-0!"></div>
					</div>
				</div>
			</div>
		`);

		const snapshotModalId = generateUniqueId();
		const saveSnapshotId = generateUniqueId();
		$("body").append(/*html*/ `
			<div class="modal fade" id="${snapshotModalId}" aria-labelledby="${snapshotModalId}-label" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
				<div class="modal-lg modal-dialog modal-dialog-scrollable modal-dialog-centered">
					<div class="modal-content tw:bg-gray-900!">
						<div class="modal-body">
							<div class="tw:space-y-4">
								<div>
									<div class="tw:flex tw:items-center">
										<h3 class="tw:text-lg! tw:font-medium! tw:shrink-0 tw:flex-1 font-monocraft">Save a Snapshot</h3>
										<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div>
										<p class="tw:mb-1! tw:text-sm tw:text-gray-400">
											Store your current save in your browser. Perfect for backups, testing builds, or saving progress.
										</p>
										<div class="tw:flex tw:flex-wrap tw:gap-2">
											<span class="tw:px-2 tw:py-1 tw:bg-blue-900/30 tw:text-blue-300 tw:text-xs tw:rounded-full"><i class="bi bi-floppy2-fill me-1"></i> Backup before edits</span>
											<span class="tw:px-2 tw:py-1 tw:bg-blue-900/30 tw:text-blue-300 tw:text-xs tw:rounded-full"><i class="bi bi-camera2 me-1"></i> Save different states</span>
											<span class="tw:px-2 tw:py-1 tw:bg-blue-900/30 tw:text-blue-300 tw:text-xs tw:rounded-full"><i class="bi bi-flask-fill me-1"></i> Experiment freely</span>
										</div>
									</div>
								</div>
								<div class="tw:flex tw:flex-nowrap">
									<input type="text" 
										class="tw:flex-1! tw:px-3! tw:py-2! tw:border! tw:border-gray-700! tw:rounded-l-lg! tw:bg-gray-950! tw:text-sm!" 
										placeholder="Snapshot name" 
										aria-label="Snapshot name" 
										aria-describedby="${saveSnapshotId}">
									
									<button class="tw:px-4 tw:py-2 tw:bg-blue-500 tw:hover:bg-blue-600 tw:text-white tw:rounded-r-lg! tw:transition-colors tw:text-sm tw:-ms-px!" 
											type="button" 
											id="${saveSnapshotId}">
										Save
									</button>
								</div>
								<p class="tw:text-xs tw:text-gray-400 tw:mb-0!">
									<span><i class="bi bi-key-fill me-1"></i>Stored locally in your browser: never uploaded.</span>
									<span class="tw:mx-2">•</span>
									<span><i class="bi bi-box-fill me-1"></i>Export as <span class="tw:bg-gray-900! tw:border tw:border-gray-700/70 tw:px-1 tw:rounded tw:font-mono tw:wrap-break-word">.dat</span> anytime.</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		`);

		$(`#${parentId}`).html(/*html*/ `
            <div class="tw:my-2">
                <h3 class="font-monocraft">Export</h3>
				<button data-action="export" class="btn btn-primary">Export current state</button>
				<div class="tw:my-6 tw:p-3 tw:gap-2 tw:flex tw:rounded-lg tw:border tw:border-gray-700/70 tw:bg-gray-950/30 tw:text-white/70">
					<div class="tw:font-mono tw:flex-1 tw:break-all tw:line-clamp-6" data-base64-output="true">
						<div class="tw:text-center tw:h-full tw:content-center">Waiting for file export...</div>
					</div>
					<div data-base64-clipcopy="true" class="tw:w-8 tw:p-2 tw:h-full tw:cursor-pointer tw:pointer-events-none">
						<i class="bi bi-clipboard"></i>
					</div>
				</div>
				<div data-actions="true" class="tw:flex tw:gap-2">
					<button data-action-type="download" class="btn btn-primary" disabled>Download file</button>
					<button data-bs-toggle="modal" data-bs-target="#${jsonModalId}" class="btn btn-primary" disabled>View JSON output</button>
					<button data-bs-toggle="modal" data-bs-target="#${snapshotModalId}" data-action-type="save-snapshot" class="btn btn-primary" disabled>Save a snapshot</button>
				</div>
				<div class="tw:space-y-4 tw:mt-6!">
					<div class="tw:bg-gray-950/70 tw:border tw:border-gray-700/70 tw:p-4 tw:rounded-lg">
						<p class="tw:text-lg tw:font-semibold tw:mb-2 tw:flex tw:items-center tw:gap-2">
							How do I use my edited save file?
						</p>
						<p class="tw:mb-0! tw:text-gray-400 tw:leading-relaxed">
							After making your changes, click <code class="tw:bg-gray-950 tw:border tw:border-gray-700 tw:px-2 tw:py-1 tw:rounded tw:text-sm">Export current state</code> 
							to generate the latest save data. Then press <code class="tw:bg-gray-950 tw:border tw:border-gray-700 tw:px-2 tw:py-1 tw:rounded tw:text-sm">Download file</code> 
							to save it to your computer. Navigate to <code class="tw:bg-gray-950 tw:border tw:border-gray-700 tw:px-2 tw:py-1 tw:rounded tw:text-sm tw:font-mono">%LOCALAPPDATA%/HoloCure</code> 
							(paste this directly into your File Explorer's address bar) and replace the existing <code class=" tw:bg-gray-950 tw:border tw:border-gray-700 tw:px-2 tw:py-1 tw:rounded tw:text-sm">save_n.dat</code> 
							file with your downloaded one. The game will load your edited save on next launch.
						</p>
					</div>
					<div class="tw:bg-gray-950/70 tw:border tw:border-gray-700/70 tw:p-4 tw:rounded-lg">
						<p class="tw:text-lg tw:font-semibold tw:mb-2 tw:flex tw:items-center tw:gap-2">
							What's that random text after exporting?
						</p>
						<p class="tw:mb-3! tw:text-gray-400 tw:leading-relaxed">
							That garbled text is your save data encoded in <strong>Base64 format</strong> — exactly how HoloCure stores it internally. If you open <code class="tw:bg-gray-950 tw:border tw:border-gray-700 tw:px-2 tw:py-1 tw:rounded tw:text-sm">save_n.dat</code> 
							in Notepad, you'll see the same encoded string. The editor decodes this into the readable JSON structure you see in the viewer, lets you make changes, then re-encodes it back to the format the game expects.
						</p>
						<p class="tw:mb-0! tw:text-gray-400 tw:leading-relaxed tw:text-sm tw:opacity-75">
							<i class="bi bi-lightbulb-fill me-1 tw:text-yellow-500"></i> Think of Base64 as a "safe wrapper" that turns complex game data into plain text that won't get corrupted during file saving.
						</p>
					</div>
					<div class="tw:bg-gray-950/70 tw:border tw:border-gray-700/70 tw:p-4 tw:rounded-lg">
						<p class="tw:text-lg tw:font-semibold tw:mb-2 tw:flex tw:items-center tw:gap-2">
							What is the JSON Output?
						</p>
						<p class="tw:mb-3! tw:text-gray-400 tw:leading-relaxed">
							The <strong>JSON Output</strong> is your decoded save data presented in a clean, organized format. Unlike the Base64 export, JSON (JavaScript Object Notation) structures everything with proper indentation so you can easily browse through your entire save.
						</p>
						<p class="tw:mb-0! tw:text-gray-400 tw:leading-relaxed tw:text-sm tw:bg-amber-500/10 tw:p-2 tw:rounded tw:border tw:border-amber-500/20">
							<strong class="tw:text-amber-400"><i class="bi bi-hourglass-bottom me-1"></i> Note:</strong> The JSON viewer shows a snapshot from when you last clicked <code class="tw:bg-gray-950 tw:border tw:border-gray-700 tw:px-2 tw:py-0.5 tw:rounded tw:text-xs">Export current state</code>. 
							Changes made in the editor won't appear here until you export again — this prevents the viewer from refreshing while you're trying to read it.
						</p>
					</div>
				</div>
			</div>`);

		const copyTooltip = new Tooltip("[data-base64-clipcopy]", {
			animation: true,
			title: "Copy to clipboard",
			customClass: "tw:bg-gray-950 tw:border tw:border-gray-700/80 tw:rounded-lg",
			placement: "top",
			trigger: "hover",
		});

		$("button[data-action='export']").on("click", function () {
			const base64Enc = btoa(JSON.stringify(data));
			$("[data-base64-output]").html(base64Enc).data("base64-output", base64Enc);
			$("[data-base64-clipcopy='true']").removeClass("tw:pointer-events-none");
			$('[data-actions="true"] button').prop("disabled", false);

			// Update modal
			$(`#${jsonModalId} .modal-body`).html(/*html*/ `
				<andypf-json-viewer
					indent="4"
					expanded="1"
					theme="harmonic-dark"
					show-data-types="false"
					show-toolbar="false"
					expand-icon-type="square"
					show-copy="true"
					show-size="false"
					data='${JSON.stringify(data)}'>
				</andypf-json-viewer>
			`);
		});

		let clipboardTimeout: number = 0;
		$("[data-base64-clipcopy]").on("click", function () {
			navigator.clipboard
				.writeText($("[data-base64-output]").data("base64-output"))
				.then(() => {
					clearTimeout(clipboardTimeout);
					copyTooltip.setContent({ ".tooltip-inner": "Copied!" });
					clipboardTimeout = setTimeout(() => {
						copyTooltip.setContent({ ".tooltip-inner": "Copy to clipboard" });
					}, 5_000);
				})
				.catch((err) => toast.error(`Error while copying to clipboard: ${(err as Error).message}`));
		});

		$('[data-action-type="download"]').on("click", function () {
			saveStringAsFile($("[data-base64-output]").data("base64-output"), "save_n", "dat");
		});

		$(`#${saveSnapshotId}`).on("click", function () {
			const val = $(this).siblings("input").val();
			if (!val || !val.trim()) return toast.error("Snapshot name cannot be empty!");
			const snapshot: Snapshot = {
				uuid: crypto.randomUUID(),
				name: val,
				timestamp: Date.now(),
				data: JSON.parse(atob($("[data-base64-output]").data("base64-output"))),
			};

			$storage.set("snapshots", [...$storage.getOrSet<Snapshot[]>("snapshots", []), snapshot]);
			$("[data-bs-dismiss='modal']").trigger("click");
			$("[data-action-type='save-snapshot']").prop("disabled", true);
			toast.success("Snapshot saved!");
		});
	},
};
