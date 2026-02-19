import $ from "jquery";
import { HoloCureSaveData } from "../types/savedata";
import { input, InputOptions } from "../components/forms";

// prettier-ignore
const inventoryKeys = {
    wood: ["stick", "plank", "hardwood", "cedarwood", "maplewood", "teakwood", "acaciawood", "bamboowood",],
    ore: ["stone", "leadbar", "ironbar", "mythrilbar", "adamantitebar", "diamond", "platinumbar", "hololite"],
    fish: ["shrimp", "goldenshrimp", "clownfish", "goldenclownfish", "tuna", "goldentuna", "koifish", "goldenkoifish", "lobster", "goldenlobster", "eel", "goldeneel", "pufferfish", "goldenpufferfish", "mantaray", "goldenmantaray", "turtle", "goldenturtle", "squid", "goldensquid", "shark", "goldenshark", "axolotl", "goldenaxolotl" ],
    soil: ["standardsoil", "expeditedsoil", "enhancedsoil",],
    seed: ["wheatSeed", "tomatoSeed", "potatoSeed", "riceSeed", "onionseed", "carrotseed", "greenbeansseed", "peppersseed", "strawberryseed", "cornseed", "radishseed", "garlicseed"],
    crop: ["wheat", "tomato", "potato", "rice", "onion", "carrot", "greenbeans", "peppers", "strawberry", "corn", "radish", "garlic"]
} as const;

const foods = [
	{ slug: "tempura", name: "Tempura" },
	{ slug: "tunasandwich", name: "Tuna Sandwich" },
	{ slug: "sushiset", name: "Sushi Set" },
	{ slug: "pokebowl", name: "Poke Bowl" },
	{ slug: "lobsterdinner", name: "Lobster Dinner" },
	{ slug: "pufferfishmeal", name: "Pufferfish Meal Set" },
	{ slug: "vegetarianburger", name: "Vegetarian Burger and Fries" },
	{ slug: "turtlesoup", name: "Turtle Soup" },
	{ slug: "unagidon", name: "Unagi Don" },
	{ slug: "calamariset", name: "Calamari Set" },
	{ slug: "mantaraysoup", name: "Manta Ray Soup" },
	{ slug: "fruitsandwich", name: "Fruit Sandwich" },
	{ slug: "burgermeal", name: "Burger Meal" },
	{ slug: "strangeseafoodsoup", name: "Strange Seafood Soup" },
	{ slug: "vegetablesoup", name: "Vegetable Soup" },
	{ slug: "bbqsquid", name: "BBQ Squid" },
	{ slug: "spicyudon", name: "Spicy Seafood Udon" },
];

const tearsKeys = ["myth", "councilHope", "gamers", "gen0", "gen1", "gen2", "id1", "id2", "id3", "gen3", "gen4"] as const;

export default {
	render(parentId: string, data: HoloCureSaveData) {
		// Main render tree
		$(`#${parentId}`).html(/*html*/ `
            <div class="tw:my-2">
                <h3 class="font-monocraft">Resources</h3>
                <div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold"><img src="./gameicons/progress/Hololite_Axe_Icon.webp" alt="Primary" class="tw:inline"> Primary Resources</h5>
                    <div data-resource-class="main-resources" class="row g-2"></div>
                </div>
                <div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold"><img width="22px" src="./gameicons/64px-Gambler's_Tear_Icon.webp" alt="..." class="tw:inline"> Gacha Tears</h5>
                    <div data-resource-class="tears-resources" class="row g-2"></div>
                </div>
				<div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold"><img width="22px" src="./gameicons/34px-CookingPot.gif" alt="..." class="tw:inline"> Cooking Cauldron Foods</h5>
                    <div data-resource-class="food-resources" class="row g-2"></div>
                </div>
                <div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold"><img src="./gameicons/progress/Hololite_Axe_Icon.webp" alt="Woodcutting" class="tw:inline"> Woodcutting</h5>
                    <div data-resource-class="woodcutting-resources" class="row g-2"></div>
                </div>
                <div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold"><img src="./gameicons/progress/Hololite_Pickaxe_Icon.webp" alt="Mining" class="tw:inline"> Mining</h5>
                    <div data-resource-class="mining-resources" class="row g-2"></div>
                </div>
                <div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold"><img src="./gameicons/progress/Fishing_Icon.gif" alt="Fishing" class="tw:inline"> Fishing</h5>
                    <div data-resource-class="fishing-resources" class="row g-2"></div>
                </div>
                <div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold"><img src="./gameicons/progress/Farming_Icon.gif" alt="Fishing" class="tw:inline"> Farming</h5>
                    <div data-resource-class="farming-soil-resources" class="row g-2"></div>
                    <hr class="tw:my-2">
                    <div data-resource-class="farming-seed-resources" class="row g-2"></div>
                    <hr class="tw:my-2">
                    <div data-resource-class="farming-crop-resources" class="row g-2"></div>
                </div>
			</div>
        `);

		// Main resources
		const resources_main = [
			{ label: "HoloCoins", iconPath: "./gameicons/16px-HoloCoin.gif", datakey: "holoCoins" },
			{ label: "UsaChips", iconPath: "./gameicons/16px-PekoChip.png", datakey: "holoChips" },
			{ label: "Fish Sand", iconPath: "./gameicons/24px-Sand.webp", datakey: "fishSand" },
		] as const;
		resources_main.forEach(({ label, iconPath, datakey }) => {
			const options = { label, iconPath, max: 9999999999, defaultValue: data[datakey], wrapperClassName: "col-12 col-md-4" };
			input("[data-resource-class='main-resources']", options, (v) => (data[datakey] = v));
		});

		tearsKeys.forEach((gen) => {
			const defaultValue = data.tears.find(([x]) => x === gen)?.[1] ?? 0;
			const options = {
				label: gen.toUpperCase().replace(/(\w+)(\d)/i, "$1 $2"),
				defaultValue,
				max: 1000000,
				wrapperClassName: "col-12 col-sm-6 col-md-4 col-lg-3",
			};

			input(`[data-resource-class="tears-resources"]`, options, function (v) {
				let tear = data.tears.find(([x]) => x === gen);
				if (!tear) {
					data.tears.push([gen, 0]);
					tear = data.tears.find(([x]) => x === gen)!;
				}
				tear[1] = v;
			});
		});

		foods.forEach((food) => {
			const defaultValue = data.createdFoods.find((x) => x[0] === food.slug)?.[1] ?? 0;
			const options: InputOptions = {
				label: food.name,
				defaultValue,
				max: 1000000,
				iconPath: `./gameicons/foods/${food.slug}.webp`,
				wrapperClassName: "col-12 col-sm-6 col-md-4 col-lg-3",
			};

			input('[data-resource-class="food-resources"]', options, function (v) {
				let foodData = data.createdFoods.find((x) => x[0] === food.slug);
				if (!foodData) {
					data.createdFoods.push([food.slug, 0]);
					foodData = data.createdFoods.find((x) => x[0] === food.slug)!;
				}
				foodData[1] = v;
			});
		});

		// Other resources
		const resources_others = [
			{ k: "wood", c: "woodcutting", max: 9999 },
			{ k: "ore", c: "mining", max: 9999 },
			{ k: "fish", c: "fishing", max: 9999 },
			{ k: "soil", c: "farming-soil", max: 99 },
			{ k: "seed", c: "farming-seed", max: 99 },
			{ k: "crop", c: "farming-crop", max: 9999 },
		] as const;

		for (const { k, c, max } of resources_others) {
			inventoryKeys[k].forEach((key) => {
				// [key, currentValue, lifetimeValue]
				let value = data.inventory.find(([x]) => x === key);
				if (!value) {
					data.inventory.push([key, 0, 0]);
					value = data.inventory.find(([x]) => x === key)!;
				}

				const [, CV, LV] = value;

				const options = {
					label: key
						.replace(/(\w+)(wood|bar|shrimp|clown|tuna|koi|lobster|eel|puffer|manta|turtle|squid|shark|axolotl|soil|seed)/i, "$1 $2")
						.replace(/\b\w/g, (c) => c.toUpperCase()),
					iconPath: `./gameicons/inventory/${key}.webp`,
					defaultValue: CV,
					wrapperClassName: "col-12 col-sm-6 col-md-4 col-lg-3",
					max,
				};

				input(`[data-resource-class="${c}-resources"]`, options, (v) => {
					value[1] = v;
					value[2] = v - CV + LV;
				});
			});
		}
	},
};
