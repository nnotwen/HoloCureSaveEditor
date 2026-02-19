import $ from "jquery";
import { generateUniqueId } from "../utils/generateUniqueId";
import { HoloCureSaveData } from "../types/savedata";
import tabGeneral from "./tab-general";
import tabAchievements from "./tab-achievements";
import tabResources from "./tab-resources";
import tabCharacters from "./tab-characters";
import tabUnlockables from "./tab-unlockables";
import tabProgress from "./tab-progress";
import tabExport from "./tab-export";

// Order by how they appear on web
const tabs = {
	GENERAL: { id: generateUniqueId(), renderer: tabGeneral },
	ACHIEVEMENTS: { id: generateUniqueId(), renderer: tabAchievements },
	RESOURCES: { id: generateUniqueId(), renderer: tabResources },
	CHARACTERS: { id: generateUniqueId(), renderer: tabCharacters },
	UNLOCKABLES: { id: generateUniqueId(), renderer: tabUnlockables },
	PROGRESS: { id: generateUniqueId(), renderer: tabProgress },
	EXPORT: { id: generateUniqueId(), renderer: tabExport },
} as const;

export default {
	render(tablistSelector: string, tabcontentSelector: string, data: HoloCureSaveData) {
		for (const [label, val] of Object.entries(tabs) as [keyof typeof tabs, (typeof tabs)[keyof typeof tabs]][]) {
			$(tablistSelector).append(/*html*/ `
                <li class="nav-item" role="presentation">
                    <button class="nav-link tw:[&.active]:bg-gray-950/30! tw:[&.active]:border-b-transparent!" data-bs-toggle="tab" data-bs-target="#${val.id}" type="button" role="tab" aria-controls="${val.id}">${label}</button>
                </li>
            `);

			$(tabcontentSelector).append(/*html*/ `
                <div class="tab-pane fade" id="${val.id}" role="tabpanel" aria-labelledby="${label.toLowerCase()}-tab" tabindex="0">${label}</div>
            `);

			val.renderer.render(val.id, data);
		}

		$(`#${tabs.GENERAL.id}`).addClass("show active");
		$(`[data-bs-target="#${tabs.GENERAL.id}"]`).addClass("active");

		// Scrolltop icon
		(function () {
			$("main").append(/*html*/ `
				<btn data-navigation="scrolltop" class="tw:fixed tw:bottom-8 tw:flex tw:justify-center tw:items-center tw:right-8 tw:w-15 tw:h-15 tw:rounded-full tw:bg-blue-500 tw:shadow tw:cursor-pointer">
					<i class="bi bi-arrow-up tw:text-2xl"></i>
				</btn>
			`);

			$("[data-navigation='scrolltop']")
				.hide()
				.on("click", function () {
					if ("scrollBehavior" in document.documentElement.style) {
						window.scrollTo({ top: 0, behavior: "smooth" });
					} else {
						$("html, body").animate({ scrollTop: 0 }, 500);
					}
				});

			$(window).on("scroll", function () {
				$("[data-navigation='scrolltop']")[($(this).scrollTop() ?? 0 > 300) ? "fadeIn" : "fadeOut"]();
			});
		})();
	},
};
