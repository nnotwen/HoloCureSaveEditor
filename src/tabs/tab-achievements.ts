import $ from "jquery";
import { HoloCureSaveData } from "../types/savedata";
import { generateUniqueId } from "../utils/generateUniqueId";
import { Achievement } from "../types/achievement";
import { Tooltip } from "bootstrap";
import { richSwitchInput, RichSwitchOptions } from "../components/forms";

const mtSearchResHeadings = [
	"No achievements found?",
	"Empty like Aqua's wallet after a gacha stream",
	"404: Not Found... like Sora's sense of direction",
	"This search result has Kroniicured",
	"No results? That's rough, buddy — probably Suisei's fault",
	"Oops! All Pekora's laughter — no data here",
];

const mtSearchResSubtext = [
	'Ina would say "INAFF" of search results',
	"Even Miko's search skills couldn't find anything... and she got distracted by a squirrel halfway.",
	"Gura tried to read the results, but she thought they said 'shrimp' instead.",
	"Subaru just ran over your search query with a horse. Again.",
	"This result has been abducted by Space Marine Korone. Yubi yubi!",
	"Moona is staring intensely... but still no results.",
	"Kronii says you wasted perfect time searching for this. She's right.",
	"Fubuki says 'Kon kon!' — which is fox for 'try again, dumb*ss'.",
	"Ollie died 47 times waiting for results to load. She's fine now.",
	"Polka is juggling your search terms but dropped them all. Circus~",
	"Okayu just ate the last result. It was riceball-flavored.",
	"Botan shot down your search query with a single bullet. Headshot.",
	"Coco said 'based' and ended the search. No questions asked.",
	"I think Biboo went and hid 67 of the search results herself.",
	"Don't let this info distract you on the fact that Pekora has a f*cking monkey.",
	"This search has been BaeRyS'd — one half chaotic, the other half nonexistent.",
	"IRyS stopped herself from saying something inappropriate about these missing results.",
];

export default {
	render(parentId: string, data: HoloCureSaveData) {
		const searchInputId = generateUniqueId();
		const actionBtns = [
			{ id: generateUniqueId(), tooltip: "Unlock all achievements", icon: "unlock" },
			{ id: generateUniqueId(), tooltip: "Lock all achievements", icon: "lock" },
			{ id: generateUniqueId(), tooltip: "Reset changes", icon: "arrow-repeat" },
		] as const;

		const actionBtnsHtml = actionBtns.map(
			(x) => /*html*/ `
			<button id="${x.id}" class="btn tw:bg-gray-950/0! tw:hover:bg-gray-950/40! tw:border-gray-700/70!">
				<i class="bi bi-${x.icon}"></i>
			</button>
		`,
		);

		$(`#${parentId}`).html(/*html*/ `
			<div class="tw:my-2">
				<h3 class="font-monocraft">Achievements</h3>
				<p>In game achievements only. All general achievements have an equivalent steam achievement.</p>
				<div class="form-floating mb-3">
					<input type="text" class="form-control tw:bg-gray-950/70!" id="${searchInputId}" placeholder="floating-label">
					<label for="floatingInput" class="font-monocraft">Search Achievements</label>
				</div>
				<div class="tw:flex tw:flex-wrap tw:gap-2">${actionBtnsHtml.join("")}</div>
				<div data-achievements-container="true" class="tw:mt-6">
					<div class="tw:text-center">
						<div class="spinner-border" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					</div>
				</div>
			</div>
		`);

		// Action btn tooltip
		for (const action of actionBtns) {
			new Tooltip(`#${action.id}`, {
				animation: true,
				title: `${action.tooltip}`,
				customClass: "tw:bg-gray-950 tw:border tw:border-gray-700/80 tw:rounded-lg",
				placement: "top",
				trigger: "hover",
			});
		}

		$.getJSON("./data/achievements.json").then((achievements: Achievement[]) => {
			$(`#${parentId} [data-achievements-container]`).html(/*html*/ `
				<div class="row g-2"></div>
			`);

			for (const ach of achievements) {
				const achSaveData = data.achievements[ach.key];
				const options: RichSwitchOptions = {
					heading: ach.label,
					subtext: ach.desc,
					defaultValue: achSaveData.unlocked,
					iconPath: ach.icon,
					wrapperClassName: "col-12 col-sm-6 col-md-4",
				};

				richSwitchInput(`#${parentId} [data-achievements-container] > div`, options, function (val) {
					achSaveData.unlocked = val;
				});
			}

			$(`#${searchInputId}`).on("keyup", function () {
				const query = ($(this).val() as string).trim().toLowerCase();
				$(`[data-achievements-container] [data-container-for]`).each(function () {
					const heading = $(this).find("[data-rs-type='heading']").text().toLowerCase();
					const subtext = $(this).find("[data-rs-type='subtext']").text().toLowerCase();
					$(this).closest(".col-12")[heading.indexOf(query) > -1 || subtext.indexOf(query) > -1 ? "show" : "hide"]();
				});

				if (!$(`[data-achievements-container] [data-container-for]`).closest(".col-12:visible").length) {
					if ($(`#${parentId}-emptysearch`).length) return;

					const heading = mtSearchResHeadings[Math.floor(Math.random() * mtSearchResHeadings.length)];
					const subtext = mtSearchResSubtext[Math.floor(Math.random() * mtSearchResSubtext.length)];
					$("[data-achievements-container] > .row").append(/*html*/ `
						<div class="col-12" id="${parentId}-emptysearch">
							<div class="tw:p-8 tw:text-center tw:flex tw:flex-col tw:justify-center tw:items-center tw:border tw:border-gray-700/70 tw:bg-gray-950/30 tw:rounded-lg tw:min-h-30 tw:text-white/70">
								<p class="tw:mb-0! font-monocraft tw:font-semibold">「 ${heading} 」</p>
								<p class="tw:mb-0! tw:text-white/50">${subtext}</p>
							</div>
						</div>
					`);
				} else {
					$(`#${parentId}-emptysearch`).remove();
				}
			});

			$(actionBtns.map((x) => `#${x.id}`).join(", ")).on("click", async function () {
				const action = actionBtns.find((x) => x.id === $(this).attr("id"))!;

				switch (action.tooltip) {
					case "Unlock all achievements":
						$(`#${parentId} [data-achievements-container] input[type="checkbox"]:not(:checked)`).prop("checked", true).trigger("change");
						break;
					case "Lock all achievements":
						$(`#${parentId} [data-achievements-container] input[type="checkbox"]:checked`).prop("checked", false).trigger("change");
						break;
					case "Reset changes":
						$(`#${parentId} [data-achievements-container] input[type="checkbox"]`)
							.filter(function () {
								return $(this).prop("checked") !== $(this).data("default-val");
							})
							.prop("checked", function (_, cval) {
								return !cval;
							})
							.trigger("change");
						break;
				}
			});
		});
	},
};
