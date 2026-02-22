import $ from "jquery";
import { HoloCureSaveData } from "../types/savedata";
import { input, InputOptions, range, RangeOptions, switchInput, SwitchOptions, tagSelect, TagSelectOptions } from "../components/forms";
import toast from "../components/toast";
import { generateUniqueId } from "../utils/generateUniqueId";
import { createTowerSnapshot } from "../utils/towerImageSnapshot";

// This should be imported so that there is only one reference
const stages = [
	{ slug: "STAGE 1", name: "Grassy Plains", requires: null },
	{ slug: "STAGE 2", name: "Holo Office", requires: "STAGE 1" },
	{ slug: "STAGE 3", name: "Halloween Castle", requires: "STAGE 2" },
	{ slug: "STAGE 1 (HARD)", name: "Grassy Plains (Night)", requires: "STAGE 2" },
	{ slug: "STAGE 2 (HARD)", name: "Holo Office (Evening)", requires: "STAGE 1 (HARD)" },
	{ slug: "STAGE 4", name: "Gelora Bung Yagoo", requires: "STAGE 3" },
	{ slug: "STAGE 3 (HARD)", name: "Halloween Castle (Myth)", requires: "STAGE 2 (HARD)" },
	{ slug: "STAGE 5", name: "Fantasy Island", requires: "STAGE 4" },
	{ slug: "STAGE 4 (HARD)", name: "Gelora Bung Yagoo (Night)", requires: "STAGE 4" },
	{ slug: "TIME STAGE 1", name: "Time Stage 1 - Concert Stage", requires: "STAGE 3" },
	{ slug: "HOLO HOUSE", name: "Holo House", requires: "STAGE 1" },
	{ slug: "USADA CASINO", name: "Usada Casino", requires: "HOLO HOUSE" },
	{ slug: "DUNGEON", name: "Tower of Suffering", requires: "HOLO HOUSE" },
] as const;

// Holohouse Progression
const holoHouseLevelsProgression = [
	{ slug: "manageLevel", name: "Manager Level", max: 4, icon: "Management_Icon.gif" },
	{ slug: "woodLevel", name: "Woodworking Level", max: 10, icon: "ckia/Old Axe.webp" },
	{ slug: "mineLevel", name: "Mining Level", max: 10, icon: "ckia/Old Pickaxe.webp" },
] as const;

const statsProgression = [
	{ slug: "HP", name: "Max HP Up", max: 10 },
	{ slug: "ATK", name: "ATK Up", max: 10 },
	{ slug: "SPD", name: "SPD Up", max: 10 },
	{ slug: "crit", name: "Crit Up", max: 10 },
	{ slug: "pickupRange", name: "Pick Up Range", max: 10 },
	{ slug: "haste", name: "Haste Up", max: 5 },
	{ slug: "regen", name: "Regeneration", max: 5 },
	{ slug: "DR", name: "Defense Up", max: 5 }, // "DR" in save file (Damage Reduction)
	{ slug: "specCDR", name: "Special Cooldown Reduction", max: 5 },
	{ slug: "skillDamage", name: "Skill Up", max: 10 },
	{ slug: "EXP", name: "EXP Gain Up", max: 5 },
	{ slug: "food", name: "Food Drops Up", max: 5 },
	{ slug: "moneyGain", name: "Money Gain Up", max: 5 },
	{ slug: "enhanceUp", name: "Enhancement Rate Up", max: 5 },
	{ slug: "mobUp", name: "Marketing", max: 5 },
] as const;

export default {
	render(parentId: string, data: HoloCureSaveData) {
		$(`#${parentId}`).html(/*html*/ `
            <div class="tw:my-2">
                <h3 class="font-monocraft">Progress</h3>
				<div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:my-6">
                    <h5 class="font-monocraft tw:font-semibold tw:ps-2">HOLO HOUSE</h5>
                    <div data-progresstype="holo-house" class="row g-2"></div>
                </div>
				<div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:my-6">
                    <h5 class="font-monocraft tw:font-semibold tw:ps-2">STATS PROGRESSION (SHOP)</h5>
                    <div data-progresstype="shop-stats" class="row g-2"></div>
                </div>
                <div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:my-6">
                    <h5 class="font-monocraft tw:font-semibold tw:ps-2">COMPLETED STAGES</h5>
					<p class="tw:text-sm tw:text-gray-400 tw:ps-2">
						Adds list of characters that completed the following stages. Ensure that each clear from the character has at least the number of trophies (i.e. If ame is listed in STAGE 1, STAGE 2, and STAGE 3, she should at least have 3 Trophies in the Character editor tab), and that the added character is already unlocked.
					</p>
                    <div data-progresstype="completed-stages" class="row g-2"></div>
                </div>
				<div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:my-6">
                    <h5 class="font-monocraft tw:font-semibold tw:ps-2 tw:flex tw:items-center tw:gap-2">
						TOWER OF SUFFERING
						<span class="tw:text-xs! tw:font-sans tw:font-normal! tw:px-2 tw:py-0.5 tw:border tw:border-amber-700/70 tw:bg-amber-500/30 tw:text-amber-500 tw:rounded-full tw:inline-flex tw:items-center">
							Experimental
						</span>
					</h5>
                    <p class="tw:text-sm tw:text-gray-400 tw:ps-2">
						I still don't know what some variable does. For now, you're free to experiment with values, but please proceed with caution.
					</p>
					<div data-progresstype="tower" class="row g-2"></div>
                </div>
			</div>`);

		// Holo House Progression
		for (const { slug, name, max, icon } of holoHouseLevelsProgression) {
			const options: InputOptions = {
				label: name,
				defaultValue: data[slug],
				iconPath: `./gameicons/${icon}`,
				wrapperClassName: "col-12 col-sm-6 col-md-4",
				max,
			};

			input('[data-progresstype="holo-house"]', options, function (val) {
				data[slug] = val;
			});
		}

		// Shop Abilities Progression
		statsProgression.forEach((x) => {
			const options: InputOptions = {
				label: x.name,
				defaultValue: data[x.slug] ?? 0,
				max: x.max,
				iconPath: `./gameicons/${x.slug}.webp`,
				wrapperClassName: "col-12 col-sm-6 col-md-4 col-lg-3",
			};

			input('[data-progresstype="shop-stats"]', options, function (val) {
				data[x.slug] = val;
			});
		});

		// Character Progression
		(async function () {
			const characters: HoloCureCharacters = await $.getJSON("./data/characters.json");

			for (const stage of stages.filter((x) => !["HOLO HOUSE", "USADA CASINO", "DUNGEON"].includes(x.slug))) {
				const options: TagSelectOptions = {
					label: `${stage.name} (${stage.slug})`,
					options: (Object.entries(characters) as [keyof HoloCureCharacters, HoloCureCharacter][]).map(([k, v]) => ({
						value: k,
						text: v.fullname,
						subtext: v.generation.full,
						icon: `./gameicons/characters/${k}.webp`,
					})),
					items: data.completedStages.find((x) => x[0] === stage.slug)?.[1] ?? [],
					tomSettings: { maxItems: null, create: false, placeholder: "Add a character...", hidePlaceholder: true },
					wrapperClassName: "col-12 col-md-6",
				};

				tagSelect('[data-progresstype="completed-stages"]', options, function (val) {
					const stageData = data.completedStages.find((x) => x[0] === stage.slug);
					if (!stageData) return toast.error(`Unable to supply data to SaveData.completedStages: Missing slug ${stage.slug} at index 0.`);
					stageData[1] = val;
				});
			}
		})();

		// Tower progression
		for (const slug of ["towerlastPos", "towerCheckPoint", "towerJumps", "towerFalls", "towerCoins", "towerFlags", "towerSave", "towerTime"] as const) {
			const value = data[slug];

			if (typeof value === "number") {
				const labels = {
					towerJumps: "Current Jumps",
					towerFalls: "Current Falls",
					towerFlags: "Checkpoint Used",
				};

				const options: InputOptions = {
					label: (labels as any)[slug] ?? slug,
					defaultValue: value,
					wrapperClassName: "col-12 col-sm-6 col-md-4",
				};

				input('[data-progresstype="tower"]', options, function (val) {
					(data[slug] as any) = val;
				});
				continue;
			}

			if (typeof value === "boolean") {
				const options: SwitchOptions = {
					heading: "Current state saved",
					subtext: "Turning this off will reset progress",
					defaultValue: value,
					wrapperClassName: "col-12 col-sm-6 col-md-4",
				};

				switchInput('[data-progresstype="tower"]', options, function (val) {
					(data[slug] as any) = val;
				});
				continue;
			}

			if (slug === "towerlastPos" || slug === "towerCheckPoint") {
				const minX = 74,
					maxX = 567,
					minY = 811,
					maxY = 15840;

				let lastXCoordinate: number = data[slug][0] || minX + 38,
					lastYCoordinate: number = data[slug][1] || maxY;
				const id = generateUniqueId();

				$("[data-progresstype='tower']").append(/*html*/ `
					<div class="col-12 col-md-6">
						<div class="tw:p-2 tw:border tw:border-gray-700/70 tw:bg-gray-950/30 tw:rounded-lg">
							<div data-label-slug="${slug}" class="tw:ps-2 tw:font-semibold tw:tracking-tight tw:text-lg font-monocraft"></div>
							<div data-desc-slug="${slug}" class="tw:ps-2 tw:mb-4 tw:tracking-tight tw:text-sm tw:text-gray-400"></div>
							<div data-input-slug="${slug}" class="row g-1"></div>
						</div>
					</div>
				`);

				$(`[data-label-slug="${slug}"]`).text(slug === "towerlastPos" ? "Tower Last Position" : "Tower Checkpoint");
				$(`[data-desc-slug="${slug}"]`).text(
					slug === "towerlastPos"
						? "The position of your character when you enter the tower."
						: "Position to where you can warp by pressing the Ctrl key.",
				);

				data[slug].map((c, i) => {
					const options: InputOptions = {
						label: i === 0 ? "X coordinate" : "Y coordinate",
						defaultValue: i === 0 ? lastXCoordinate : lastYCoordinate,
						wrapperClassName: "col-6",
						diff: false,
						max: i === 0 ? maxX : maxY,
					};

					input(`[data-input-slug="${slug}"]`, options, function (val) {
						(data[slug][i] as any) = val;
						if (i === 0) lastXCoordinate = val === 0 ? minX : val;
						if (i === 1) lastYCoordinate = val === 0 ? minY : val;
						towerPreview.setCoordinates(lastXCoordinate - minX, lastYCoordinate - minY - 13);
					});
				});

				$(`[data-input-slug="${slug}"]`).append(/*html*/ `
					<div class="col">
						<div id="${id}" class="tw:h-46.25 tw:border tw:border-gray-600/70 tw:rounded-lg tw:overflow-hidden"></div>
					</div>
				`);

				const towerPreview = createTowerSnapshot(id, "./images/tower-full.png", {
					initialX: lastXCoordinate - minX,
					initialY: lastYCoordinate - minY - 13,
				});

				continue;
			}

			if (slug === "towerCoins") {
				const options: RangeOptions = {
					label: "Coins Collected",
					initlalValue: data[slug].length,
					min: 0,
					max: 42, // Total of 420 coins
					steps: 1,
					wrapperClassName: "col-12 col-sm-6 col-md-4",
				};

				range('[data-progresstype="tower"]', options, function (val) {
					data[slug] = Array.from({ length: val }, (_, i) => i);
				});

				continue;
			}

			if (Array.isArray(value) && value.length == 2) {
				for (const [idx, innerVal] of Object.entries(value)) {
					const options: InputOptions = {
						label: `${slug}.${idx}`,
						defaultValue: innerVal,
						wrapperClassName: "col-12 col-sm-6 col-md-4",
					};

					input('[data-progresstype="tower"]', options, function (val) {
						(data[slug] as any)[parseInt(idx)] = val;
					});
				}

				continue;
			}

			$('[data-progresstype="tower"]').append(/*html*/ `
				<div class="col-12 col-sm-6 col-md-4">
					<div class="tw:bg-gray-950 tw:border tw:border-gray-500 tw:h-full tw:opacity-50 tw:p-2 tw:rounded-md">
						<div class="tw:text-sm tw:text-gray-500">${slug} - Unsupported</div>
						<div>${JSON.stringify(data[slug])}</div>
					</div>
				</div>
			`);
		}
	},
};
