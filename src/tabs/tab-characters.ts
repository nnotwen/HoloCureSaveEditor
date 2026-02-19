import $ from "jquery";
import { HoloCureSaveData } from "../types/savedata";
import { characterFormGroup, CharacterFormGroupOptions } from "../components/forms";

export default {
	render(parentId: string, data: HoloCureSaveData) {
		$(`#${parentId}`).html(/*html*/ `
            <div class="tw:my-2">
                <h3 class="font-monocraft">CHARACTERS</h3>
                <div class="tw:p-2 tw:pt-3 tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold">HOLOMYTH</h5>
                    <div data-characters-gen="myth" class="row g-2"></div>
                </div>
				<div class="tw:p-2 tw:pt-3 tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold">COUNCILHOPE</h5>
                    <div data-characters-gen="councilHope" class="row g-2"></div>
                </div>
				<div class="tw:p-2 tw:pt-3 tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold">GAMERS</h5>
                    <div data-characters-gen="gamers" class="row g-2"></div>
                </div>
				<div class="tw:p-2 tw:pt-3 tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold">JP GEN 0</h5>
                    <div data-characters-gen="gen0" class="row g-2"></div>
                </div>
				<div class="tw:p-2 tw:pt-3 tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold">JP GEN 1</h5>
                    <div data-characters-gen="gen1" class="row g-2"></div>
                </div>
				<div class="tw:p-2 tw:pt-3 tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold">JP GEN 2</h5>
                    <div data-characters-gen="gen2" class="row g-2"></div>
                </div>
				<div class="tw:p-2 tw:pt-3 tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold">HOLOFANTASY</h5>
                    <div data-characters-gen="gen3" class="row g-2"></div>
                </div>
				<div class="tw:p-2 tw:pt-3 tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold">HOLOFORCE</h5>
                    <div data-characters-gen="gen4" class="row g-2"></div>
                </div>
				<div class="tw:p-2 tw:pt-3 tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold">AREA 15</h5>
                    <div data-characters-gen="id1" class="row g-2"></div>
                </div>
				<div class="tw:p-2 tw:pt-3 tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold">HOLORO</h5>
                    <div data-characters-gen="id2" class="row g-2"></div>
                </div>
				<div class="tw:p-2 tw:pt-3 tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold">HOLOH3RO</h5>
                    <div data-characters-gen="id3" class="row g-2"></div>
                </div>
            </div>
        `);

		$.getJSON("./data/characters.json").then((characters: HoloCureCharacters) => {
			for (const [key, character] of Object.entries(characters) as [keyof HoloCureCharacters, HoloCureCharacter][]) {
				const defaultGRank = data.characters.find((x) => x[0] === key)?.[1] ?? 0;
				const defaultFandomEXP = data.fandomEXP.find((x) => x[0] === key)?.[1] ?? 0;
				const defaultTrophyCount = data.characterClears.find((x) => x[0] === key)?.[1] ?? 0;

				const options: CharacterFormGroupOptions = {
					key,
					character,
					unlockedOutfits: data.unlockedOutfits,
					defaultValue: (data.characters.find((x) => x[0] === key)?.[1] ?? 0) > 0,
					wrapperClassName: "col-12 col-lg-6",
					fandomEXP: defaultFandomEXP,
					grank: defaultGRank,
					trophy: defaultTrophyCount,
					disabled: character.generation.slug === "myth",
				};

				characterFormGroup(`[data-characters-gen="${character.generation.slug}"]`, options, (value) => {
					if ("unlocked" in value && typeof value.unlocked === "boolean") {
						const grankInput = $(`[data-entry-for="${key}"] [data-character-container="grank"] input`);
						const fandomInput = $(`[data-entry-for="${key}"] [data-character-container="fandom"] input`);
						const trophyInput = $(`[data-entry-for="${key}"] [data-character-container="trophy"] input`);

						// Unlocked = gRank > 0, fandomEXP = 2 (for 1 GRank);
						grankInput.val(value.unlocked ? defaultGRank || 1 : 0).trigger("input");
						fandomInput.val(value.unlocked ? defaultFandomEXP || 2 : 0).trigger("input");
						trophyInput.val(value.unlocked ? defaultTrophyCount : 0).trigger("input");
					}

					if ("fandom" in value && typeof value.fandom === "number") {
						let fandom = data.fandomEXP.find((x) => x[0] === key);
						if (!fandom) {
							data.fandomEXP.push([key, 0]);
							fandom = data.fandomEXP.find((x) => x[0] === key)!;
						}
						fandom[1] = value.fandom;
					}

					if ("grank" in value && typeof value.grank === "number") {
						let grank = data.characters.find((x) => x[0] === key);
						if (!grank) {
							data.characters.push([key, 0]);
							grank = data.characters.find((x) => x[0] === key)!;
						}
						grank[1] = value.grank;
					}

					if ("trophy" in value && typeof value.trophy === "number") {
						let trophy = data.characterClears.find((x) => x[0] === key);
						if (!trophy) {
							data.characterClears.push([key, 0]);
							trophy = data.characters.find((x) => x[0] === key)!;
						}
						trophy[1] = value.trophy;
					}

					if ("outfits" in value && Array.isArray(value.outfits)) {
						const toAdd = value.outfits!.filter((s) => !data.unlockedOutfits.includes(s));
						const toDel = data.unlockedOutfits.filter((s) => s.startsWith(key) && !value.outfits!.includes(s));

						data.unlockedOutfits.push(...toAdd);
						data.unlockedOutfits = data.unlockedOutfits.filter((s) => !toDel.includes(s));
					}
				});
			}
		});
	},
};
