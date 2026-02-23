import $ from "jquery";
import { generateUniqueId } from "../utils/generateUniqueId";
import { Tooltip } from "bootstrap";
import { HoloCureSaveData } from "../types/savedata";
import { TomOption, TomSettings } from "tom-select/dist/cjs/types";
import TomSelect from "tom-select";

export interface RangeOptions {
	label: string;
	initlalValue: number;
	min?: number;
	max?: number;
	steps?: number;
	disabled?: boolean;
	wrapperClassName?: string;
}

export function range(selector: string, options: RangeOptions, onChange: (val: number) => void) {
	const id = generateUniqueId();
	const $main = $(selector);

	if ($main.length !== 1) throw new Error(`Unable to find unique element with selector "${selector}"`);

	const html = /*html*/ `
		<div class="tw:h-full tw:p-2 tw:pb-1 tw:border tw:border-[rgb(73,80,87)] tw:rounded-md tw:bg-gray-950/70 tw:flex tw:focus-within:border-[rgb(134,183,254)] tw:focus-within:shadow-[0_0_0_.25rem_rgba(13,110,253,.25)] tw:has-disabled:opacity-50">
			<div class="tw:flex tw:flex-col tw:ms-2 tw:flex-1 tw:flex-nowrap">
				<label for="${id}" class="form-label tw:select-none tw:text-sm tw:mb-0! tw:text-[rgba(222,226,230,0.65)]">${options.label}</label>
				<input id="${id}" type="range" class="form-range">
			</div>	
			<div class="tw:w-10 tw:ps-2 tw:flex tw:justify-center tw:items-center">
				<output for="${id}" class="font-monocraft">${options.initlalValue}</output>
			</div>
		</div>`;

	$main.append(options.wrapperClassName ? /*html*/ `<div class="${options.wrapperClassName}">${html}</div>` : html);

	if (options.min) $(`#${id}`).attr("min", options.min);
	if (options.max) $(`#${id}`).attr("max", options.max);
	if (options.steps) $(`#${id}`).attr("steps", options.steps);
	if (options.disabled) $(`#${id}`).prop("disabled", true);
	if (typeof options.initlalValue === "number") $(`#${id}`).val(options.initlalValue);

	$(`#${id}`).on("input", function () {
		onChange(parseInt($(this).val() as string));
		$(`output[for="${id}"]`).text($(this).val() as string);
	});
}

export interface InputOptions {
	label: string;
	defaultValue: number;
	iconPath?: string;
	wrapperClassName?: string;
	max?: number;
	min?: number;
	diff?: boolean;
}

/**
 *
 * @param selector Selector for which the input is going to append to
 * @param options {@link InputOptions}
 * @param onInput Callback function for when the input changes
 * @returns
 */
export function input(selector: string, options: InputOptions, onInput: (val: number) => void) {
	const id = generateUniqueId();
	const $main = $(selector);

	if ($main.length !== 1) throw new Error(`Unable to find unique element with selector "${selector}"`);

	const iconHtml = /*html*/ `
        <div class="form-floating-icon tw:w-6 tw:absolute tw:left-3 tw:bottom-[0.85rem] tw:pointer-events-none tw:transition-opacity tw:duration-200">
            <img width="16px" src="${options.iconPath}" alt="${options.label}">
        </div>
    `;

	const html = /*html*/ `
        <div class="form-floating">
            <input type="number" class="form-control font-monocraft tw:min-h-[3.9rem]! ${options.iconPath ? "tw:ps-10!" : ""} tw:pe-10! tw:bg-gray-950/70!" data-default-val="${options.defaultValue}" value="${options.defaultValue}" id="${id}" placeholder="floating-label">
            <label for="${id}">${options.label}</label>
            ${options.iconPath ? iconHtml : ""}
            <div class="tw:absolute tw:right-3 tw:top-1/2 tw:-translate-y-1/2 tw:w-8 tw:h-8 tw:flex tw:justify-center tw:items-center tw:cursor-pointer tw:rounded-full tw:bg-transparent tw:hover:bg-white/15 tw:transition-opacity tw:duration-200" data-resources-action="reset" data-action-for="${id}">
                <i class="bi bi-arrow-repeat"></i>
            </div>
            <div data-valuechange-for="${id}" class="form-floating-icon tw:absolute tw:bottom-[0.825rem] tw:hidden tw:text-xs tw:text-nowrap tw:select-none tw:pointer-events-none"></div>
        </div>`;

	$main.append(options.wrapperClassName ? /*html*/ `<div class="${options.wrapperClassName}">${html}</div>` : html);

	$(`#${id}`)
		.on("input", function () {
			const $this = $(this);

			$this.val(($this.val() as string).replace(/[^0-9]/g, ""));
			const val = parseInt(($this.val() as string) || "0");
			const def = $this.data("default-val");

			if (isNaN(val) || !isFinite(val)) return $this.val(def);
			if (options.min && val < options.min) return $this.val(options.min).trigger("input");
			if (options.max && val > options.max) return $this.val(options.max).trigger("input");
			if (val > Number.MAX_SAFE_INTEGER) return $this.val(Number.MAX_SAFE_INTEGER).trigger("input");

			onInput(val);

			if (options.diff !== false) {
				if (def !== val) {
					const prefix = val > def ? "+" : "-";
					const formatted = Intl.NumberFormat("en-US", {
						notation: "compact",
						compactDisplay: "short",
						maximumFractionDigits: 1,
					}).format(Math.abs(val - def));

					$(`[data-valuechange-for="${id}"]`)
						.css("left", `calc(0.25rem * 12 + ${($this.val() as string).length * 0.87}em)`)
						.text(`(${prefix}${val.toFixed().length < 8 ? Math.abs(val - def).toLocaleString() : formatted})`)
						.addClass(prefix === "+" ? "tw:text-green-300/70" : "tw:text-red-300/70")
						.removeClass(`tw:hidden ${prefix === "+" ? "tw:text-red-300/70" : "tw:text-green-300/70"}`);
				} else {
					$(`[data-valuechange-for="${id}"]`).addClass("tw:hidden");
				}
			}
		})
		.on("blur", function () {
			if (!($(this).val() as string).trim().length) {
				$(this).val(0).trigger("input");
			}
		});

	// Reset input values to original data
	$(`[data-resources-action='reset'][data-action-for="${id}"]`).on("click", function () {
		const $target = $(`#${id}`);
		$target.val($target.data("default-val"));
		$(`[data-valuechange-for="${id}"]`).addClass("tw:hidden");
		onInput($target.data("default-val"));
	});

	new Tooltip(`[data-resources-action='reset'][data-action-for='${id}']`, {
		animation: true,
		title: "Reset Value",
		customClass: "tw:bg-gray-950 tw:border tw:border-gray-700/80 tw:rounded-md",
		placement: "top",
		trigger: "hover",
	});

	return {
		id,
		$: () => $(`#${id}`),
	};
}

export interface SwitchOptions {
	heading: string;
	subtext: string;
	defaultValue: boolean;
	wrapperClassName?: string;
}

export function switchInput(selector: string, options: SwitchOptions, onChange: (val: boolean) => void) {
	const id = generateUniqueId();
	const $main = $(selector);
	if ($main.length !== 1) throw new Error(`Unable to find unique element with selector "${selector}"`);

	const html = /*html*/ `
		<div data-container-for="${id}" tabindex="-1" class="tw:flex tw:gap-2 tw:p-2 tw:rounded-md tw:border tw:border-[rgb(73,80,87)] tw:bg-gray-950/70 tw:h-full tw:cursor-pointer tw:focus-within:border-[rgb(134,183,254)] tw:focus-within:shadow-[0_0_0_.25rem_rgba(13,110,253,.25)]">
			<div class="form-check tw:ps-0! form-switch tw:flex! tw:justify-between! tw:mb-3 tw:flex-1">
				<div class="tw:flex tw:flex-col tw:ms-2 tw:select-none">
					<div class="font-monocraft tw:font-bold tw:tracking-tight tw:text-sm">${options.heading}</div>
					<span class="tw:text-white/70 tw:text-xs">${options.subtext}</span>
				</div>
				<input class="form-check-input tw:ms-0! tw:float-none! tw:cursor-pointer tw:focus:shadow-[unset]!" type="checkbox" value="" id="${id}" data-default-val="${options.defaultValue}" switch>
			</div>
		</div>`;

	$main.append(options.wrapperClassName ? /*html*/ `<div class="${options.wrapperClassName}">${html}</div>` : html);

	$(`#${id}`).prop("checked", options.defaultValue);

	$(`#${id}`).on("change", function (e) {
		e.stopImmediatePropagation();
		onChange($(this).prop("checked") as boolean);
	});

	$(`[data-container-for="${id}"]`).on("click", function (e) {
		if ($(e.target).is(`#${id}`) || $(e.target).closest(`#${id}`).length) {
			return;
		}

		e.stopImmediatePropagation();
		const $target = $(`#${id}`);
		$target.prop("checked", !$target.prop("checked")).trigger("focus");
	});

	return {
		id,
		$: () => $(`#${id}`),
	};
}

export interface RichSwitchOptions {
	heading: string;
	subtext: string;
	defaultValue: boolean;
	iconPath: string;
	disabled?: boolean;
	wrapperClassName?: string;
}

export function richSwitchInput(selector: string, options: RichSwitchOptions, onChange: (val: boolean) => void) {
	const id = generateUniqueId();
	const $main = $(selector);
	if ($main.length !== 1) throw new Error(`Unable to find unique element with selector "${selector}"`);

	const html = /*html*/ `
		<div data-container-for="${id}" tabindex="-1" class="tw:flex tw:gap-2 tw:p-3 tw:rounded-md tw:border tw:border-[rgb(73,80,87)] tw:bg-gray-950/70 tw:h-full tw:has-[input:disabled]:opacity-50 tw:has-[input:disabled]:pointer-events-none tw:cursor-pointer tw:focus-within:border-[rgb(134,183,254)] tw:focus-within:shadow-[0_0_0_.25rem_rgba(13,110,253,.25)]">
			<div class="form-check tw:ps-0! form-switch tw:flex! tw:justify-between! tw:mb-3 tw:flex-1 tw:[&:has(input:not(:checked))_img]:grayscale">
				<div class="tw:flex tw:gap-3">
					<div class="tw:max-w-12 tw:shrink-0">
						<img width="48" src="${options.iconPath}" alt="${options.heading}">
					</div>
					<div class="tw:flex tw:flex-col tw:select-none">
						<div data-rs-type="heading" class="font-monocraft tw:font-bold tw:tracking-tight tw:text-sm">${options.heading}</div>
						<span data-rs-type="subtext" class="tw:text-white/70 tw:text-xs">${options.subtext}</span>
					</div>
				</div>
				<input class="form-check-input tw:ms-0! tw:float-none! tw:cursor-pointer  tw:focus:shadow-[unset]!" type="checkbox" value="" id="${id}" data-default-val="${options.defaultValue}" switch>
			</div>
		</div>`;

	$main.append(options.wrapperClassName ? /*html*/ `<div class="${options.wrapperClassName}">${html}</div>` : html);
	$(`#${id}`).prop("checked", options.defaultValue).prop("disabled", options.disabled);

	$(`#${id}`).on("change", function (e) {
		e.stopImmediatePropagation();
		onChange($(this).prop("checked") as boolean);
	});

	$(`[data-container-for="${id}"]`).on("click", function (e) {
		if ($(e.target).is(`#${id}`) || $(e.target).closest(`#${id}`).length) return;

		e.stopImmediatePropagation();
		const $target = $(`#${id}`);
		$target.prop("checked", !$target.prop("checked")).trigger("focus").trigger("change");
	});

	return {
		id,
		$: () => $(`#${id}`),
	};
}

export interface TagSelectOptions {
	label: string;
	options: {
		value: string;
		text?: string;
		subtext?: string;
		icon?: string;
	}[];
	items?: string[];
	tomSettings: Partial<Omit<TomSettings, "options" | "items" | "wrapperClass" | "controlClass" | "dropdownClass" | "render">>;
	wrapperClassName?: string;
}

export function tagSelect(selector: string, options: TagSelectOptions, onChange: (val: string[]) => void) {
	const id = generateUniqueId();
	const $main = $(selector);
	if ($main.length !== 1) throw new Error(`Unable to find unique element with selector "${selector}"`);

	const html = /*html*/ `
		<div class="form-group tw:h-full tw:rounded-md tw:p-3 tw:border tw:border-gray-700/70 tw:bg-gray-950/70 tw:focus-within:border-[rgb(134,183,254)] tw:focus-within:shadow-[0_0_0_.25rem_rgba(13,110,253,.25)]">
			<label for="${id}" class="font-monocraft tw:font-semibold tw:tracking-tight tw:mb-2">${options.label}</label>
			<select name="${options.label}" id="${id}"></select>
		</div>
	`;

	$main.append(options.wrapperClassName ? /*html*/ `<div class="${options.wrapperClassName}">${html}</div>` : html);
	new TomSelect(`#${id}`, {
		...options.tomSettings,
		options: options.options,
		items: options.items ?? [],
		wrapperClass: "ts-wrapper multi plugin-remove_button has-items tw:group",
		controlClass: "ts-control tw:p-0! tw:border-0! tw:bg-transparent! tw:group-[.focus]:border-0! tw:group-[.focus]:shadow-none!",
		dropdownClass: "ts-dropdown multi plugin-remove_button tw:bg-gray-800! tw:text-white/50!",
		plugins: {
			remove_button: {
				title: "Remove item",
				className: "remove tw:border-l-gray-700/70!",
			},
		},
		render: {
			option: function (data: TomOption, escape: (str: string) => string) {
				const icon = data.icon
					? /*html*/ `<img src="${escape(data.icon)}" class="tw:rounded-sm" width="${data.subtext ? "32" : "20"}" height="${data.subtext ? "32" : "20"}" />`
					: "";

				const groupedText = data.subtext
					? /*html*/ `
						<div class="tw:flex tw:flex-col">
							<span>${escape(data.text ?? data.value)}</span>
							<span class="tw:text-xs">${data.subtext}</span>
						</div>`
					: /*html*/ `<span>${escape(data.text ?? data.value)}</span>`;

				return /*html*/ `<div class="tw:flex tw:items-center tw:gap-2 tw:[&.active]:text-white! tw:[&.active]:bg-gray-700!">${icon}${groupedText}</div>`;
			},
			item: function (data: TomOption, escape: (str: string) => string) {
				const icon = data.icon ? /*html*/ `<img src="${escape(data.icon)}" class="tw:rounded-sm" width="20" height="20"/>` : undefined;

				return /*html*/ `<div class="w:flex tw:items-center tw:gap-1 tw:border-gray-700/70! tw:border! tw:bg-gray-900! tw:[&.active]:bg-gray-700! tw:text-white/60! tw:[&.active]:text-white!">
					${icon}
					<span>${escape(data.text ?? data.value)}</span>
				</div>`;
			},
		},
	});

	$(`#${id}`).on("change", function () {
		onChange($(this).val() as string[]);
	});
}

export interface CharacterFormGroupOptions {
	character: HoloCureCharacter;
	key: keyof HoloCureCharacters;
	defaultValue: boolean;
	wrapperClassName?: string;
	disabled?: boolean;
	unlockedOutfits: HoloCureSaveData["unlockedOutfits"];
	fandomEXP: number;
	grank: number;
	trophy: number;
}

export function characterFormGroup(
	selector: string,
	options: CharacterFormGroupOptions,
	onChange: ({
		slug,
		unlocked,
		fandom,
		grank,
		outfits,
	}: {
		slug: CharacterFormGroupOptions["key"];
		unlocked?: boolean;
		fandom?: number;
		grank?: number;
		trophy?: number;
		outfits?: string[];
	}) => void,
) {
	const id = generateUniqueId();
	const $main = $(selector);
	if ($main.length !== 1) throw new Error(`Unable to find unique element with selector "${selector}"`);

	const outfit = options.character.outfits.slice(1).map((t, i) => {
		const outfitSlug = `${options.key}Alt${i + 1}`;
		const isUnlocked = options.unlockedOutfits.includes(outfitSlug);

		return /*html*/ `
		<div class="tw:flex tw:flex-col tw:items-center tw:justify-center tw:h-full tw:w-20">
			<div class="tw:text-center tw:line-clamp-3 tw:flex-1 tw:text-sm tw:text-white/50 font-monocraft">${t}</div>
			<div class="tw:w-15 tw:shrink-0">
				<img class="tw:cursor-pointer ${!isUnlocked ? "tw:filter tw:grayscale" : ""}" src="./gameicons/characters/${outfitSlug}.gif" alt="${t}" data-for-outfitname="${outfitSlug}">
			</div>
			<input class="form-check-input tw:rounded-full! tw:cursor-pointer" type="checkbox" for="${id}" data-outfitname="${outfitSlug}" ${isUnlocked ? "checked" : ""}>
		</div>`;
	});

	const html = /*html*/ `
		<div data-entry-for="${options.key}" class="tw:flex tw:gap-3 tw:flex-col tw:rounded-md tw:border tw:border-gray-700/70 tw:bg-gray-950/70 tw:p-3 tw:h-full">
			<div data-entry-type="basic" class="form-check tw:ps-0! form-switch tw:flex! tw:justify-between! tw:mb-3">
				<div class="tw:flex tw:gap-2">
					<div class="tw:w-12 tw:shrink-0">
						<img src="./gameicons/characters/${options.key}.webp" alt="${options.character.fullname}">
					</div>
					<div class="tw:flex tw:flex-col tw:ms-2">
						<div class="font-monocraft tw:font-bold tw:tracking-tight">${options.character.fullname}</div>
						<span class="tw:text-white/70 tw:text-sm">${options.character.generation.full}</span>
					</div>
				</div>
				<input class="form-check-input tw:ms-0! tw:float-none! tw:w-10! tw:h-5! tw:cursor-pointer" type="checkbox" value="" id="${id}" data-default-val="${options.defaultValue}" switch>
			</div>
			<div data-entry-type="expanded" class="tw:flex tw:flex-col tw:flex-1 ${!options.defaultValue ? "tw:opacity-40 tw:pointer-events-none tw:select-none" : ""}">
				<div class="row g-2 tw:my-3">
					<div class="col"><div class="tw:flex tw:gap-2" data-character-container="fandom"></div></div>
					<div class="col"><div class="tw:flex tw:gap-2" data-character-container="grank"></div></div>
					<div class="col"><div class="tw:flex tw:gap-2" data-character-container="trophy"></div></div>
				</div>
				<div class="tw:flex tw:flex-col tw:flex-1 tw:bg-gray-950/70 tw:border tw:border-gray-700 tw:rounded-md tw:p-2">
					<div class="font-monocraft tw:font-bold tw:tracking-tight tw:text-sm tw:text-center">Outfits</div>
					<div class="tw:flex tw:justify-center tw:flex-wrap tw:items-end tw:flex-1 tw:gap-2">${outfit.join("")}</div>
				</div>
			</div>
		</div>`;

	$main.append(options.wrapperClassName ? /*html*/ `<div class="${options.wrapperClassName}">${html}</div>` : html);

	input(
		`[data-entry-for="${options.key}"] [data-character-container="fandom"]`,
		{ label: "Fandom EXP", defaultValue: options.fandomEXP, max: 100 },
		(v) => onChange({ slug: options.key, fandom: v }),
	);

	input(`[data-entry-for="${options.key}"] [data-character-container="grank"]`, { label: "G-Rank", defaultValue: options.grank, max: 9999 }, (v) =>
		onChange({ slug: options.key, grank: v }),
	);

	input(`[data-entry-for="${options.key}"] [data-character-container="trophy"]`, { label: "Trophies", defaultValue: options.trophy, max: 9999 }, (v) =>
		onChange({ slug: options.key, trophy: v }),
	);

	$(`#${id}`)
		.prop("checked", options.defaultValue)
		.prop("disabled", options.disabled ?? false);

	$(`#${id}`).on("change", function () {
		const unlocked = $(this).prop("checked") as boolean;
		onChange({ slug: options.key, unlocked });

		const $expanded = $(`[data-entry-for="${options.key}"] [data-entry-type="expanded"]`);

		if (unlocked) {
			$expanded.closest('[data-entry-type="expanded"]').removeClass("tw:opacity-40 tw:pointer-events-none tw:select-none");
		} else {
			$expanded.closest('[data-entry-type="expanded"]').addClass("tw:opacity-40 tw:pointer-events-none tw:select-none");
		}
	});

	// Trigger the checkbox when clicking on the outfit
	$("img[data-for-outfitname]").on("click", function () {
		$(`[for="${id}"][data-outfitname="${$(this).data("for-outfitname")}"]`).trigger("click");
	});

	$(`[for="${id}"][data-outfitname]`).on("change", function () {
		const checked = $(`[for="${id}"][data-outfitname]`).filter((_, e) => $(e).prop("checked"));
		onChange({ slug: options.key, outfits: checked.map((_, e) => $(e).data("outfitname")).toArray() });

		// Remove grayscale to checked outfits
		checked.siblings().find("img").removeClass("tw:filter tw:grayscale");

		// Add grayscale to unchecked outfits
		$(`[for="${id}"][data-outfitname]`)
			.filter((_, e) => !$(e).prop("checked"))
			.siblings()
			.find("img")
			.addClass("tw:filter tw:grayscale");
	});

	return {
		id,
		$: () => $(`#${id}`),
	};
}
