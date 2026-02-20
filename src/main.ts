import $ from "jquery";
import filedrag from "./components/filedrag";
import entry from "./tabs/entry";
import { generateUniqueId } from "./utils/generateUniqueId";
import { DateTime } from "luxon";

// Fonts
import "./styles/fonts.css";
import toast from "./components/toast";
import { Snapshot } from "./types/savedata";
import $storage from "./utils/storage";

$(function () {
	const newfileId = generateUniqueId();
	const snapshotSelectModalId = generateUniqueId();

	$("main").append(/*html*/ `
		<div class="content tw:lg:w-5xl tw:my-2 tw:m-auto tw:p-6 tw:bg-gray-900 tw:border tw:border-gray-700 tw:rounded-lg">
			<div class="tw:flex tw:flex-col tw:md:flex-row tw:flex-nowrap tw:gap-4 tw:mb-6">
				<div data-savefile-type="upload" class="tw:flex-1 tw:flex tw:flex-col"></div>
				<div class="tw:text-center tw:self-center tw:font-semibold tw:text-gray-400">- OR -</div>
				<div data-savefile-type="new" class="tw:flex-1 tw:flex tw:flex-col">
					<p class="text-center tw:font-bold tw:text-xl">Create one from scratch</p>
					<div class="tw:flex-1 tw:flex tw:flex-col tw:gap-2 tw:w-full tw:text-gray-400">
						<div id="${newfileId}" class="tw:py-8 tw:flex-1 tw:flex tw:flex-col tw:gap-4 tw:justify-center tw:items-center tw:border-3 tw:border-dashed tw:border-gray-400 tw:hover:border-blue-500 tw:rounded-t-lg tw:cursor-pointer tw:hover:text-white tw:transition-all tw:duration-300 tw:hover:bg-gray-950/50">
							<i class="bi bi-file-earmark-plus tw:text-6xl"></i>
							<span>New File</span>
						</div>
						<div data-bs-toggle="modal" data-bs-target="#${snapshotSelectModalId}" class="tw:py-8 tw:flex-1 tw:flex tw:flex-col tw:gap-4 tw:justify-center tw:items-center tw:border-3 tw:border-dashed tw:border-gray-400 tw:hover:border-blue-500 tw:rounded-b-lg tw:cursor-pointer tw:hover:text-white tw:transition-all tw:duration-300 tw:hover:bg-gray-950/50">
							<i class="bi bi-box-arrow-in-down tw:text-6xl"></i>
							<span>Load Snapshot</span>
						</div>
					</div>
				</div>
			</div>
			<div class="tw:space-y-3 ">
				<div class="tw:space-y-2 tw:bg-gray-950/70 tw:p-5 tw:rounded-xl tw:border-gray-700 tw:border">
					<p class="tw:text-lg tw:font-semibold tw:flex tw:items-center tw:gap-2">
						Where is the save file located?
					</p>
					<p class="tw:text-gray-400 tw:leading-relaxed">
						On Windows, your HoloCure save <code class="tw:bg-gray-950 tw:border tw:border-gray-700/70 tw:px-1 tw:rounded-md">save_n.dat</code> is stored at:
					</p>
					<div class="tw:select-all tw:bg-gray-900 tw:p-3 tw:rounded-lg tw:font-mono tw:text-sm">
						<code class="tw:text-blue-400">%LOCALAPPDATA%/HoloCure</code>
					</div>
					<p class="tw:text-sm tw:text-gray-500 tw:mt-1 tw:mb-0!">
						<i class="bi bi-lightbulb-fill me-2"></i>You can paste this path directly into your File Explorer's address bar.
					</p>
				</div>
				<div class="tw:space-y-2 tw:bg-gray-950/70 tw:p-5 tw:rounded-xl tw:border-gray-700 tw:border">
					<p class="tw:text-lg tw:font-semibold tw:flex tw:items-center tw:gap-2">
						Will my save file get corrupted?
					</p>
					<p class="tw:mb-0! tw:text-gray-400 tw:leading-relaxed">
						<strong class="tw:text-green-400">No — this editor never touches your original file.</strong> It only reads the file you upload and creates a modified copy for download. Your original save remains untouched in its folder.
					</p>
					<div class="tw:bg-yellow-500/10 tw:border tw:border-yellow-500/20 tw:p-3 tw:rounded-lg tw:mt-2">
						<p class="tw:text-sm tw:mb-0! tw:flex tw:items-start tw:gap-2">
							<span class="tw:text-yellow-500"><i class="bi bi-shield-lock-fill"></i></span>
							<span class="tw:text-gray-400">Still, it's good practice to keep a backup. Copy <code class="tw:bg-gray-900 tw:px-2 tw:rounded tw:text-sm">save_n.dat</code> somewhere safe before experimenting.</span>
						</p>
					</div>
				</div>
				<div class="tw:space-y-2 tw:bg-gray-950/70 tw:p-5 tw:rounded-xl tw:border tw:border-gray-700">
					<p class="tw:text-lg tw:font-semibold tw:flex tw:items-center tw:gap-2">
						Can I edit connected properties?
					</p>
					<p class="tw:mb-0! tw:text-gray-400 tw:leading-relaxed">
						Yes, but proceed with caution. Some values in the save file are meant to change together — for example, unlocking an achievement without meeting its requirements (like collecting all weapons first) creates an unverified save state (Haven't tested if the game automatically fills incorrect data, ignore it, or worse, create a fresh save data from scratch).
					</p>
					<div class="tw:mt-3! row g-2">
						<div class="col-12 col-sm-6">
							<div class="tw:bg-red-500/5 tw:border tw:border-red-500/20 tw:p-3 tw:rounded-lg">
								<p class="tw:font-medium tw:text-sm tw:mb-1! tw:text-red-400"><i class="bi bi-exclamation-lg"></i> Possible risks</p>
								<ul class="tw:mb-0! tw:text-xs tw:space-y-1 tw:text-gray-400 tw:list-disc tw:pl-4">
									<li>Game crashes or freezes</li>
									<li>Broken progression or soft-locks</li>
									<li>Unexpected behavior</li>
								</ul>
							</div>
						</div>
						<div class="col-12 col-md-6">
							<div class="tw:bg-green-500/5 tw:border tw:border-green-500/20 tw:p-3 tw:rounded-lg">
								<p class="tw:font-medium tw:text-sm tw:mb-1! tw:text-green-400"><i class="bi bi-check-lg"></i> Best practices</p>
								<ul class="tw:mb-0! tw:text-xs tw:space-y-1 tw:text-gray-400 tw:list-disc tw:pl-4">
									<li>Always keep a backup</li>
									<li>Make small, incremental changes</li>
									<li>Test in-game frequently</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="tw:space-y-2 tw:bg-gray-950/70 tw:p-5 tw:rounded-xl tw:border tw:border-gray-700">
					<p class="tw:mb-0! tw:text-lg tw:font-semibold">
						What is HoloCure?
					</p>
					<div class="tw:mb-4">
						<span class="tw:px-2 tw:border tw:border-blue-700/70 tw:bg-blue-900/30 tw:rounded-full tw:text-xs tw:text-blue-300 tw:font-semibold tw:select-none tw:whitespace-nowrap"><i class="bi bi-controller me-1"></i>Action</span>
						<span class="tw:px-2 tw:border tw:border-blue-700/70 tw:bg-blue-900/30 tw:rounded-full tw:text-xs tw:text-blue-300 tw:font-semibold tw:select-none tw:whitespace-nowrap"><i class="bi bi-shield-shaded me-1"></i> Roguelike</span>
						<span class="tw:px-2 tw:border tw:border-blue-700/70 tw:bg-blue-900/30 tw:rounded-full tw:text-xs tw:text-blue-300 tw:font-semibold tw:select-none tw:whitespace-nowrap"><i class="bi bi-joystick me-1"></i>Bullet Heaven</span>
						<span class="tw:px-2 tw:border tw:border-green-700/70 tw:bg-green-900/30 tw:rounded-full tw:text-xs tw:text-green-300 tw:font-semibold tw:select-none tw:whitespace-nowrap"><i class="bi bi-dpad-fill me-1"></i>Free to Play</span>
					</div>
					<p class="tw:text-gray-400 tw:leading-relaxed">
						<strong>HoloCure - Save the Fans!</strong> is a free, unofficial fan-game featuring the VTuber talents of Hololive. 
                        Developed by <strong>Kay Yu</strong> (KayAnimate), this "bullet heaven" game draws heavy inspiration from Vampire Survivors and Magic Survival.
					</p>
					<p class="tw:mb-0! tw:text-gray-400 tw:leading-relaxed">
						Players control their favorite Hololive talents, fighting through waves of brainwashed fans, collecting weapons and items, 
						and experimenting with character builds to survive and reach the top rankings.
					</p>
				</div>
				
				<div class="tw:space-y-2!">
					<div class="row g-2">
						<div class="col-12 col-md-6">
							<div class="tw:bg-gray-950/70 tw:p-5 tw:rounded-xl tw:border tw:border-gray-700 tw:h-full">
								<p class="tw:text-lg tw:font-semibold">
									Quick HoloCure Facts
								</p>
								<ul class="list-unstyled tw:text-gray-400 tw:leading-relaxed">
									<li class="tw:mb-1"><i class="bi bi-calendar-event me-2 text-muted"></i> <strong>Initial Release:</strong> June 24, 2022 (itch.io)</li>
									<li class="tw:mb-1"><i class="bi bi-steam me-2 text-muted"></i> <strong>Steam Release:</strong> August 17, 2023</li>
									<li class="tw:mb-1"><i class="bi bi-person-workspace me-2 text-muted"></i> <strong>Developer:</strong> Kay Yu (KayAnimate)</li>
									<li class="tw:mb-1"><i class="bi bi-windows me-2 text-muted"></i> <strong>Platform:</strong> Windows</li>
									<li class="tw:mb-1"><i class="bi bi-cpu me-2 text-muted"></i> <strong>Engine:</strong> GameMaker </li>
									<li class="tw:mb-1"><i class="bi bi-translate me-2 text-muted"></i> <strong>Languages:</strong> English, Japanese</li>
									<li class="tw:mb-1"><i class="bi bi-tag me-2 text-muted"></i> <strong>Price:</strong> Free</li>
								</ul>
							</div>
						</div>
						<!-- Links & Community -->
						<div class="col-12 col-md-6">
							<div class="tw:bg-gray-950/70 tw:p-5 tw:rounded-xl tw:border tw:border-gray-700 tw:h-full">
								<p class="tw:text-lg tw:font-semibold">
									Official Links
								</p>
								<div class="tw:mb-4">
									<h6 class="tw:font-bold">Download the Game</h6>
									<div class="tw:flex tw:gap-2 tw:flex-wrap">
										<a href="https://store.steampowered.com/app/2420510/HoloCure__Save_the_Fans/" target="_blank" class="btn btn-outline-primary btn-sm">
											<i class="bi bi-steam tw:me-1"></i> Steam Store
										</a>
										<a href="https://kay-yu.itch.io/holocure" target="_blank" class="btn btn-outline-primary btn-sm">
											<i class="bi bi-download tw:me-1"></i> itch.io
										</a>
									</div>
								</div>
								<div class="mb-4">
									<h6 class="tw:font-bold">Community & Socials</h6>
									<div class="tw:flex tw:gap-2 tw:flex-wrap">
										<a href="https://x.com/HoloCureGame" target="_blank" class="btn btn-outline-secondary btn-sm tw:hover:bg-blue-600! tw:hover:border-blue-600!">
											<i class="bi bi-twitter-x me-1"></i> Official Twitter
										</a>
										<a href="https://www.reddit.com/r/holocure/" target="_blank" class="btn btn-outline-secondary btn-sm  tw:hover:bg-orange-600! tw:hover:border-orange-600!">
											<i class="bi bi-reddit me-1"></i> Reddit Community
										</a>
										<a href="https://holocure.wiki.gg/" target="_blank" class="btn btn-outline-secondary btn-sm">
											<i class="bi bi-wikipedia me-1"></i> HoloCure Wiki
										</a>
									</div>
								</div>
								<div>
									<h6 class="tw:font-bold">Game Stats</h6>
									<div class="tw:bg-gray-900 tw:p-3 rounded">
										<div class="tw:flex tw:justify-between tw:mb-1">
											<span>Steam Reviews:</span>
											<span class="tw:font-bold tw:text-green-400">99% Positive</span>
										</div>
										<div class="tw:flex tw:justify-between tw:mb-1">
											<span>Peak Players (Steam):</span>
											<span class="tw:font-bold">46,000+</span>
										</div>
										<div class="tw:flex tw:justify-between tw:mb-1">
											<span>Steam Deck:</span>
											<span class="tw:font-bold tw:text-blue-400">Playable</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`);

	// Action for dragged file
	filedrag.render("[data-savefile-type='upload']");

	// Load editor when save file is loaded
	$(document).on("saveFileLoaded", function (e, evtData) {
		const tablistId = generateUniqueId();
		const tabcontentId = generateUniqueId();

		$("main > .content").html(/*html*/ `
			<ul id="${tablistId}" class="nav nav-tabs" role="tablist"></ul>
			<div id="${tabcontentId}" class="tab-content"></div>
		`);

		entry.render(`#${tablistId}`, `#${tabcontentId}`, evtData.data);
	});

	$(`#${newfileId}`).on("click", function () {
		toast.info("Generating save file...");
		$.get("./data/default.dat").then((data: string) => {
			$(document).trigger("saveFileLoaded", [
				{
					data: JSON.parse(atob(data)),
					file: undefined,
					timestamp: Date.now(),
				},
			]);
		});
	});

	$("body").append(/*html*/ `
		<div class="modal fade" id="${snapshotSelectModalId}" aria-labelledby="${snapshotSelectModalId}-label" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
			<div class="modal-lg modal-dialog modal-dialog-scrollable modal-dialog-centered">
				<div class="modal-content tw:bg-gray-900!">
					<div class="modal-header">
						<h1 class="modal-title fs-5" id="${snapshotSelectModalId}-label">Select Snapshot</h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body tw:min-h-75! tw:flex tw:flex-col tw:gap-2">
						<div class="tw:hidden tw:only:flex tw:justify-center tw:items-center tw:text-lg tw:font-semibold tw:m-auto tw:text-white/50">
							You have no saved snapshots yet~
						</div>
					</div>
				</div>
			</div>
		</div>
	`);

	$storage.getOrSet<Snapshot[]>("snapshots", []).forEach((snap) => {
		const date = DateTime.fromMillis(snap.timestamp);
		$(`#${snapshotSelectModalId} .modal-body`).prepend(/*html*/ `
			<div data-uuid="${snap.uuid}" class="snapshot-item tw:flex tw:gap-2 tw:rounded-lg tw:bg-gray-950/30 tw:border tw:border-gray-700/70 tw:hover:bg-gray-950/50 tw:transition-all tw:duration-200">
				<div class="tw:flex-1 tw:flex tw:flex-col tw:p-3 tw:pr-0 tw:cursor-pointer">
					<span class="tw:font-semibold tw:text-lg tw:line-clamp-1 tw:break-all">${snap.name}</span>
					<div class="tw:text-xs tw:text-white/50">${date.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}\u2000•\u2000${date.toRelative()}</div>
				</div>
				<div class="snapshot-delete tw:flex tw:justify-center tw:items-center tw:pr-3 tw:cursor-pointer">
					<button class="btn tw:text-red-300!">
						<i class="bi bi-trash tw:text-xl"></i>
					</button>
				</div>
			</div>
		`);

		$(`#${snapshotSelectModalId} .snapshot-delete`).on("click", function (e) {
			e.stopImmediatePropagation();
			const $item = $(this).closest(".snapshot-item");
			const uuid = $item.data("uuid");

			$storage.set("snapshots", [...$storage.getOrSet<Snapshot[]>("snapshots", []).filter((x) => x.uuid !== uuid)]);
			$item.remove();
		});

		$(`#${snapshotSelectModalId} .snapshot-item > div`).on("click", function (e) {
			e.stopImmediatePropagation();
			const $item = $(this).closest(".snapshot-item");
			const uuid = $item.data("uuid");

			const snapshot: Snapshot | undefined = $storage.get("snapshots")?.find((x: Snapshot) => x.uuid === uuid);
			if (!snapshot) return toast.error(`Unable to find snapshot with uuid:${uuid}~`);

			$("[data-bs-dismiss='modal']").trigger("click");
			toast.info(`Loading snapshot [${snapshot.name}]`);
			$(document).trigger("saveFileLoaded", [
				{
					data: snapshot.data,
					file: undefined,
					timestamp: Date.now(),
				},
			]);
		});
	});

	$(".current-year").text(new Date().getFullYear());
	$("[data-luxon-timestamp]").each((_, el) => {
		const ms = $(el).data("luxon-timestamp") as number;
		const date = DateTime.fromMillis(ms);
		$(el).html(/*html*/ `${date.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}<span class="tw:mx-1">•</span>${date.toRelative()}`);
	});
});
