import $ from "jquery";
import { HoloCureSaveData } from "../types/savedata";
import { richSwitchInput, RichSwitchOptions, switchInput, SwitchOptions } from "../components/forms";

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

const items = [
	{ slug: "Beetle", name: "Beetle", unlock: "Clear any stage without having any Character Skills [Fandom Off]." },
	{ slug: "Bandaid", name: "Just Bandage", unlock: "Lose after 10 minutes in a game." },
	{ slug: "BlacksmithsGear", name: "Blacksmith's Gear", unlock: "Enhance a weapon." },
	{ slug: "BodyPillow", name: "Body Pillow", unlock: "Available by default." },
	{ slug: "Breastplate", name: "Breastplate", unlock: "Take at least 500 damage in a game in total." },
	{ slug: "Candy", name: "Candy Kingdom Sweets", unlock: "Choose the Haste Stat Up option 10 times in a game." },
	{ slug: "ChickensFeather", name: "Chicken's Feather", unlock: "Survive 10 minutes as Takanashi Kiara in a game." },
	{ slug: "CorporationPin", name: "Corporation Pin", unlock: "Reach 500% Pick Up Range" },
	{ slug: "CreditCard", name: "Credit Card", unlock: "Find an Anvil." },
	{ slug: "DevilHat", name: "Devil Hat", unlock: "Deal 1000 damage in a single attack." },
	{ slug: "EnergyDrink", name: "Energy Drink", unlock: "Survive 10 minutes as Mori Calliope in a game." },
	{ slug: "FaceMask", name: "Face Mask", unlock: "Available by default." },
	{ slug: "FocusShades", name: "Focus Shades", unlock: "Survive 10 minutes as Vestia Zeta in a game." },
	{ slug: "FullMeal", name: "Full Meal", unlock: "Available by default." },
	{ slug: "GorillasPaw", name: "Gorilla's Paw", unlock: "Defeat the Smol Ame boss of Stage 1." },
	{ slug: "GWSPill", name: "GWS Pill", unlock: "Lose game with Halu equipped." },
	{ slug: "Halu", name: "Halu", unlock: "Defeat 5,000 enemies in a game." },
	{ slug: "Headphones", name: "Headphones", unlock: "Available by default." },
	{ slug: "HolyMilk", name: "Knightly Milk", unlock: "Available by default." },
	{ slug: "HopeSoda", name: "Hope Soda", unlock: "Clear any stage as IRyS" },
	{ slug: "IdolCostume", name: "Idol Costume", unlock: "Unlock and use a character's Special Attack." },
	{ slug: "InjectionAsacoco", name: "Injection Type Asacoco", unlock: "Complete a stage using Plug Type Asacoco." },
	{ slug: "KusogakiShackles", name: "Kusogaki Shackles", unlock: "Survive 10 minutes as Murasaki Shion." },
	{ slug: "LabCoat", name: "Researcher's Coat", unlock: "Do not take damage for 5 minutes." },
	{ slug: "Limiter", name: "Limiter", unlock: "Survive 10 minutes as Tsukumo Sana." },
	{ slug: "Membership", name: "Membership", unlock: "Clear Stage Mode with Super Chatto Time! equipped." },
	{ slug: "NinjaHeadband", name: "Ninja Headband", unlock: "Survive 10 minutes as Kureiji Ollie." },
	{ slug: "PiggyBank", name: "Stolen Piggy Bank", unlock: "Defeat a Golden YAGOO." },
	{ slug: "PikiPikiPiman", name: "Piki Piki Piman", unlock: "Available by default." },
	{ slug: "Plushie", name: "Plushie", unlock: "Survive 10 minutes as Hakos Baelz.a" },
	{ slug: "PromiseTiara", name: "Promise Tiara", unlock: "Sell 10 Stamps in 1 run." },
	{ slug: "RavenFeather", name: "Raven Feather", unlock: "Clear a Stage Mode run after dying 3 times with Chicken's Feather." },
	{ slug: "Sake", name: "Sake", unlock: "Available by default." },
	{ slug: "StudyGlasses", name: "Study Glasses", unlock: "Reach level 50 in a game." },
	{ slug: "SuccubusHorn", name: "Nurse's Horn", unlock: "Available by default." },
	{ slug: "SuperChattoTime", name: "Super Chatto Time!", unlock: "Have at least 5,000 unspent HoloCoins after finishing a game." },
	{ slug: "UberSheep", name: "Uber Sheep", unlock: "Available by default." },
] as const;

const weapons = [
	{ slug: "BLBook", name: "BL Book", unlock: "Available by default." },
	{ slug: "BounceBall", name: "Bounce Ball", unlock: "Survive 10 minutes in any Stage with Cutting Board equipped, as any flat character." },
	{ slug: "CEOTears", name: "CEO's Tears", unlock: "Defeat the A-chan boss in Stage 2." },
	{ slug: "CuttingBoard", name: "Cutting Board", unlock: "Survive for 10 minutes as Ninomae Ina'nis in a single run." },
	{ slug: "ENCurse", name: "EN's Curse", unlock: "Defeat the Spiderchama boss in Stage 3." },
	{ slug: "EliteLava", name: "Elite Lava Bucket", unlock: "Available by default." },
	{ slug: "Glowstick", name: "Glowstick", unlock: "Available by default." },
	{ slug: "HoloBomb", name: "Holo Bomb", unlock: "Available by default." },
	{ slug: "HoloLaser", name: "Fan Beam", unlock: "Defeat the Fubuzilla boss in Stage 1." },
	{ slug: "IdolSong", name: "Idol Song", unlock: "Survive as IRyS for 10 minutes in a single run." },
	{ slug: "OwlDagger", name: "Owl Dagger", unlock: "Defeat the Pekodam boss in Stage 5." },
	{ slug: "PsychoAxe", name: "Psycho Axe", unlock: "Available by default." },
	{ slug: "Sausage", name: "Sausage", unlock: "Defeat the Area 15 bosses in Stage 4." },
	{ slug: "SpiderCooking", name: "Spider Cooking", unlock: "Available by default." },
	{ slug: "Tailplug", name: "Plug Type Asacoco", unlock: "Available by default." },
	{ slug: "WamyWater", name: "Wamy Water", unlock: "Complete stage mode with Sake equipped." },
	{ slug: "XPotato", name: "X-Potato", unlock: "Survive as Inugami Korone for 10 minutes in a single run." },
] as const;

const shop = [
	{ key: "specUnlock", name: "Special Attack", max: 1 },
	{ key: "growth", name: "Growth", max: 3 },
	{ key: "reroll", name: "Reroll", max: 10 },
	{ key: "eliminate", name: "Eliminate", max: 10 },
	{ key: "stamps", name: "Stamps", max: 1 },
	{ key: "holdOption", name: "Hold", max: 5 },
	{ key: "canDisable", name: "Customize", max: 1 },
	{ key: "supports", name: "Supports", max: 1 },
	{ key: "materialDrops", name: "Material Find", max: 1 },
	{ key: "fanLetterUnlock", name: "Fan Letters", max: 1 },
	{ key: "enchantments", name: "Enchantments", max: 1 },
	{ key: "fandom", name: "Fandom", max: 1 },
] as const;

const fanLetter = [
	{ slug: "Shrimp", name: "Chumbud", effect: "Increase ATK by 1%." },
	{ slug: "ShrimpQ", name: "Chumbud (Q)", effect: "Increase Haste by 1%." },
	{ slug: "Deadbeat", name: "Deadbeat", effect: "Increase SPD by 1%." },
	{ slug: "DeadbeatQ", name: "Deadbeat (Q)", effect: "Increase Crit by 0.5%." },
	{ slug: "Takodachi", name: "Takodachi", effect: "Increase HP by 2." },
	{ slug: "KFP", name: "KFP", effect: "Increase SPD by 1%." },
	{ slug: "Teamate", name: "Tea-mate", effect: "Increase Crit by 0.5%." },
	{ slug: "CursedBubba", name: "Cursed Bubba", effect: "Increase Pick Up Range by 3%." },
	{ slug: "SmollAme", name: "Smol Ame", effect: "Increase Skill damage by 2%." },
	{ slug: "Brats", name: "Brat", effect: "Increase SPD by 1%." },
	{ slug: "HalloweenBae", name: "Bae (Halloween)", effect: "Increase damage of all multishot weapons by 3%." },
	{ slug: "Hoomans", name: "Hooman", effect: "Increase Pick Up Range by 3%." },
	{ slug: "Saplings", name: "Sapling", effect: "Increase any healing by 2%." },
	{ slug: "Kronies", name: "Kronie", effect: "Increase Haste by 1%." },
	{ slug: "Sanalites", name: "Sanalite", effect: "Increase HP by 2." },
	{ slug: "Yatagarasu", name: "Yatagarasu", effect: "Increase Pick Up Range by 3%." },
	{ slug: "GuyRys", name: "GuyRys", effect: "Increase EXP gain by 2%." },
	{ slug: "Irystocrats", name: "Irystocrat (Legacy)", effect: "Increase EXP gain by 2%." },
	{ slug: "BloomGloom", name: "Bloom & Gloom", effect: "Increase HoloCoin gain by 2%." },
	{ slug: "Sukonbu", name: "Sukonbu", effect: "Increase ATK by 1%." },
	{ slug: "FubuChun", name: "Fubu-chun", effect: "Increase Pick Up Range by 3%." },
	{ slug: "Oruyanke", name: "Oruyanke", effect: "Increase SPD by 1%." },
	{ slug: "Miteiru", name: "Miteiru", effect: "Increase SPD by 1%." },
	{ slug: "Fubuzilla", name: "Fubura", effect: "Increase Skill damage by 2%." },
	{ slug: "Miofa", name: "Miofa", effect: "Increase HP by 2." },
	{ slug: "Koronesuki", name: "Koronesuki", effect: "Increase ATK by 1%." },
	{ slug: "Onigiriya", name: "Onigiriya", effect: "Increase Pick Up Range by 3%." },
	{ slug: "Mikopi", name: "35P", effect: "Increase HP by 2." }, // Note: "35P" maps to "Mikopi" in game data
	{ slug: "Kintoki", name: "Kintoki", effect: "Reduce Special Cooldowns by 1%." },
	{ slug: "Mikodanye", name: "Mikodanye", effect: "Reduce Special Cooldowns by 1%." },
	{ slug: "Soratomo", name: "Soratomo", effect: "Increase any healing by 2%." },
	{ slug: "Pioneer", name: "Pioneer", effect: "Increase HP by 2." },
	{ slug: "Hoshiyomi", name: "Hoshiyomi", effect: "Increase ATK by 1%." },
	{ slug: "Robosa", name: "Robosa", effect: "Increase Crit by 0.5%." },
	{ slug: "SSRB", name: "SSRB", effect: "Increase attack size by 2%." },
	{ slug: "Staff", name: "Staff", effect: "Increase HP by 2." },
	{ slug: "Achan", name: "A-chan", effect: "Increase Skill damage by 2%." },
	{ slug: "Nodoka", name: "Harusaki Nodoka", effect: "Increase damage of all ranged weapons by 3%." },
	{ slug: "Matsurisu", name: "Matsurisu", effect: "Increase SPD by 1%." },
	{ slug: "Haaton", name: "Haaton", effect: "Increase HP by 2." },
	{ slug: "Kapumin", name: "Kapumin", effect: "Increase Crit by 0.5%." },
	{ slug: "ObakeChan", name: "Obake-Chan", effect: "Increase Crit by 0.5%." },
	{ slug: "Rosetai", name: "Rosetai", effect: "Increase any healing by 2%." },
	{ slug: "Subatomo", name: "Subatomo", effect: "Increase Haste by 1%." },
	{ slug: "Shubangelion", name: "Shubangelion", effect: "Increase Skill damage by 2%." },
	{ slug: "Chocomate", name: "Chocomate", effect: "Increase HoloCoin gain by 2%." },
	{ slug: "Chocolat", name: "Chocolat", effect: "Increase any healing by 2%." },
	{ slug: "Aquacrew", name: "Aquacrew", effect: "Increase EXP gain by 2%." },
	{ slug: "Shiokko", name: "Shiokko", effect: "Increase HoloCoin gain by 2%." },
	{ slug: "Nakirigumi", name: "Nakirigumi", effect: "Increase ATK by 1%." },
	{ slug: "Poyoyo", name: "Poyoyo", effect: "Increase Haste by 1%." },
	{ slug: "Spiderchama", name: "Spiderchama", effect: "Reduce Special Cooldowns by 1%." },
	{ slug: "HalloweenMyth", name: "Halloween Myth", effect: "Increase damage of all collab weapons by 3%." },
	{ slug: "Moonafic", name: "Moonafic", effect: "Increase Pick Up Range by 3%." },
	{ slug: "Moonabito", name: "Moonabito", effect: "Reduce Special Cooldowns by 1%." },
	{ slug: "Risuner", name: "Risuner", effect: "Increase Crit by 0.5%." },
	{ slug: "Riscot", name: "Riscot", effect: "Increase Skill damage by 2%." },
	{ slug: "Ioforia", name: "IOFORIA", effect: "Increase SPD by 1%." },
	{ slug: "Zomrade", name: "Zomrade", effect: "Increase HP by 2." },
	{ slug: "Udin", name: "Udin", effect: "Increase Skill damage by 2%." },
	{ slug: "Merakyat", name: "Merakyat", effect: "Increase HoloCoin gain by 2%." },
	{ slug: "Melfriend", name: "Melfriend", effect: "Increase ATK by 1%." },
	{ slug: "Kobokerz", name: "Kobokerz", effect: "Increase Pick Up Range by 3%." },
	{ slug: "Cilus", name: "Cilus", effect: "Increase ATK by 1%." },
	{ slug: "Zecretary", name: "Zecretary", effect: "Increase Haste by 1%." },
	{ slug: "Bazo", name: "Bazo", effect: "Increase Crit by 0.5%." },
	{ slug: "Pemaloe", name: "Pemaloe", effect: "Increase HP by 2." },
	{ slug: "Area15", name: "Area 15", effect: "Increase Skill damage by 2%." },
	{ slug: "Nousagi", name: "Nousagi", effect: "Increase ATK by 1%." },
	{ slug: "Ichimi", name: "Houshou no Ichimin", effect: "Increase SPD by 1%." },
	{ slug: "Elfriend", name: "Elfriend", effect: "Increase EXP gain by 2%." },
	{ slug: "ShiroganeKnight", name: "Knight's Order of Shirogane", effect: "Increase attack size by 2%." },
	{ slug: "Tatsunoko", name: "Tatsunoko", effect: "Increase ATK by 1%." },
	{ slug: "Heimin", name: "Heimin", effect: "Increase HP by 2." },
	{ slug: "Upao", name: "Upao", effect: "Increase Pick Up Range by 3%." },
	{ slug: "Watamate", name: "Watamate", effect: "Increase any healing by 2%." },
	{ slug: "Kenzoku", name: "Tokoyami Kenzoku", effect: "Increase Crit by 0.5%." },
	{ slug: "Luknight", name: "LuKnight", effect: "Increase SPD by 1%." },
	{ slug: "Nanoraaa", name: "Nanoraaa", effect: "Reduce Special Cooldowns by 1%." },
	{ slug: "Pekodam", name: "Pekodam", effect: "Increase damage of main weapons by 5%." },
	{ slug: "GoriEla", name: "GoriEla", effect: "Increase damage of all melee weapons by 5%." },
	{ slug: "Otaku", name: "Otaku", effect: "Increase any healing by 2%." },
] as const;

const rods = ["Beginner's Rod", "Dad's Rod", "Blacksmith-Made Rod", "Atlantean Rod", "Turkey Rod", "Golden Rod"] as const;
const ckiaLvls = ["Old", "Stone", "Lead", "Iron", "Myth", "Promise", "Advent", "Justice", "Hololite"] as const;
const prism = ["Basic", "Myth", "Promise", "Advent", "Justice", "Hololite"] as const;
const casinoPrizes = [
	{ slug: "artifactWeapon", name: "Legendary Weapon", description: "Increases ATK by 2% in main game." },
	{ slug: "artifactLens", name: "Legendary Lens", description: "Increases Crit by 1% in main game." },
	{ slug: "artifactBoots", name: "Legendary Boots", description: "Increases SPD by 2% in main game." },
	{ slug: "artifactDrink", name: "Legendary Drink", description: "Increases Haste by 1% in main game." },
	{ slug: "artifactGloves", name: "Legendary Gloves", description: "Increases Pick Up Range by 2% in main game." },
	{ slug: "trailHearts", name: "Hearts", description: "Create heart effects when moving in main game." },
	{ slug: "trailSakura", name: "Sakura", description: "Create sakura petal effects when moving in main game." },
	{ slug: "trailSparkles", name: "Sparkles", description: "Create sparkle effects when moving in main game." },
	{ slug: "trailLeaves", name: "Leaves", description: "Create leaves effects when moving in main game." },
	{ slug: "trailHololive", name: "Hololive", description: "Create blue triangle effects when moving in main game." },
	{ slug: "trailBubbles", name: "Bubbles", description: "Create bubble effects when moving in main game." },
	{ slug: "trailSkulls", name: "Skulls", description: "Create skull effects when moving in main game." },
	{ slug: "petCat", name: "Cat", description: "Summons a pet cat to follow you while in Holo House areas. Very popular pet!" },
	{ slug: "petDog", name: "Dog", description: "Summons a pet dog to follow you while in Holo House areas. A certified good boy." },
	{ slug: "petRabbit", name: "Rabbit", description: "Summons a pet rabbit to follow you while in Holo House areas. This one does not scam you." },
	{
		slug: "petBeetle",
		name: "Beetle",
		description: "Summons a pet beetle to follow you while in Holo House areas. You may not see it, but it is there.",
	},
	{ slug: "petPenguin", name: "Penguin", description: "Summons a pet penguin to follow you while in Holo House areas. It's cool AND cute!" },
	{
		slug: "petMonkey",
		name: "Monkey",
		description: "Summons a pet monkey to follow you while in Holo House areas. Don't let this pet monkey distract you.",
	},
	{ slug: "workerTools", name: "Worker Tools", description: "Increase HoloCoin gather rate by 25% for all workers." },
	{ slug: "workerBreaks", name: "Worker Breaks", description: "Workers will spend Stamina 25% slower." },
	{ slug: "rabbitFoot", name: "Gold Rabbit's Foot", description: "Increases the drop rate of Fan Letters by 20%." },
];

const furnishings = {
	bedroom: [
		{ slug: "woodenBed", name: "Wooden Bed (Blue)" },
		{ slug: "woodenBedB", name: "Wooden Bed (Red)" },
		{ slug: "woodenBedC", name: "Wooden Bed (Green)" },
		{ slug: "woodenBedD", name: "Wooden Bed (Yellow)" },
		{ slug: "marblebed", name: "Marble Bed" },
		{ slug: "futon", name: "Fuuton" },
		{ slug: "nightstandA", name: "Wooden Nightstand" },
		{ slug: "nightstandB", name: "Wooden Nightstand with Lamp" },
		{ slug: "woodenDresserA", name: "Wooden Dresser" },
		{ slug: "woodendesk", name: "Wooden Desk" },
		{ slug: "woodenPCdesk", name: "Wooden PC" },
		{ slug: "marbledesk", name: "Marble Desk" },
		{ slug: "marblelaptopdesk", name: "Marble Laptop Desk" },
		{ slug: "beanbag", name: "Bean Bag" },
		{ slug: "officechair", name: "Office Chair" },
		{ slug: "gamerchaira", name: "Gamer Chair (Red)" },
		{ slug: "gamerchairb", name: "Gamer Chair (Blue)" },
		{ slug: "gamerchairc", name: "Gamer Chair (Yellow)" },
		{ slug: "gamerchaird", name: "Gamer Chair (Green)" },
		{ slug: "gamerchaire", name: "Gamer Chair (Pink)" },
		{ slug: "gamerchairf", name: "Gamer Chair (Purple)" },
		{ slug: "gamerchairg", name: "Gamer Chair (Orange)" },
		{ slug: "gamerchairH", name: "Gamer Chair (White)" },
		{ slug: "vanity", name: "Vanity Desk" },
		{ slug: "bodypillow", name: "Body Pillow" },
	],
	livingroom: [
		{ slug: "couchA", name: "Simple Couch" },
		{ slug: "foxburger", name: "Fox Burger Chair" },
		{ slug: "woodentable", name: "Wooden Table" },
		{ slug: "marbletable", name: "Marble Table" },
		{ slug: "glasstable", name: "Glass Table" },
		{ slug: "easterntable", name: "Eastern Table" },
		{ slug: "floorcushion", name: "Floor Cushion" },
		{ slug: "woodentallcabinet", name: "Wooden Tall Cabinet" },
		{ slug: "standinglampA", name: "Standing Lamp" },
		{ slug: "fireplace", name: "Stone Fireplace" },
		{ slug: "TVStand", name: "TV" },
		{ slug: "crttv", name: "CRT TV" },
		{ slug: "retroconsole", name: "Retro Console" },
		{ slug: "vrset", name: "VR Set" },
		{ slug: "woodenbookshelf", name: "Wooden Bookshelf" },
		{ slug: "marblebookshelf", name: "Marble Bookshelf" },
		{ slug: "displaycase", name: "Display Case" },
	],
	kitchen: [
		{ slug: "woodenDiningTable", name: "Wooden Dining Table" },
		{ slug: "marbleTable", name: "Marble Dining Table" },
		{ slug: "woodenDiningChair", name: "Wooden Dining Chair" },
		{ slug: "marblechair", name: "Marble Chair" },
		{ slug: "stoolA1", name: "Stool A" },
		{ slug: "kitchenCounterA", name: "Kitchen Counter" },
		{ slug: "Microwave", name: "Microwave" },
		{ slug: "marbleCounter", name: "Marble Counter" },
		{ slug: "marblesink", name: "Marble Sink" },
		{ slug: "fridge", name: "Refrigerator" },
		{ slug: "stove", name: "Kitchen Stove" },
	],
	washroom: [
		{ slug: "bathstool", name: "Bathstool" },
		{ slug: "sink", name: "Bathroom Sink" },
		{ slug: "bathtub", name: "Bathtub" },
		{ slug: "toilet", name: "Toilet" },
		{ slug: "washingmachine", name: "Washing Machine" },
		{ slug: "laundrybasket", name: "Laundry Basket" },
	],
	decorations: [
		{ slug: "woodenCrate", name: "Wooden Crate" },
		{ slug: "woodenbarrel", name: "Wooden Barrel" },
		{ slug: "boxA", name: "Cardboard Box A" },
		{ slug: "BoxB", name: "Cardboard Box B" },
		{ slug: "TreasureChestA", name: "Treasure Box" },
		{ slug: "plantpotA", name: "Plant Pot A" },
		{ slug: "plantpotB", name: "Plant Pot B" },
		{ slug: "plantpotC", name: "Plant Pot C" },
		{ slug: "berryplant", name: "Berry Plant" },
		{ slug: "marblestump", name: "Marble Stump" },
		{ slug: "dumbell", name: "Dumbbells" },
		{ slug: "exerciseball", name: "Medicine Ball" },
		{ slug: "boxingdummy", name: "Boxing Dummy" },
		{ slug: "vampirecoffin", name: "Vampire Coffin" },
		{ slug: "baegemite", name: "Baegemite" },
		{ slug: "taikodrums", name: "Taiko Drum" },
		{ slug: "shrinebox", name: "Shrine Box" },
		{ slug: "KFPbucket", name: "KFP Bucket" },
		{ slug: "sharkplush", name: "Shark Plush" },
		{ slug: "nekoplush", name: "Neko Plush" },
		{ slug: "achandoll", name: "A-Chan Doll" },
		{ slug: "completegrass", name: "Completionist's Grass" },
	],
	structure: [
		{ slug: "woodendivider", name: "Wooden Divider" },
		{ slug: "marblepartition", name: "Marble Partition" },
		{ slug: "easterndivider", name: "Eastern Divider" },
		{ slug: "woodenwall", name: "Wooden Wall" },
		{ slug: "woodenhalfwall", name: "Wooden Half-Wall" },
		{ slug: "woodencolumn", name: "Wooden Column" },
		{ slug: "marblecolumn", name: "Marble Column" },
		{ slug: "woodendoor", name: "Wooden Door" },
	],
	wall: [
		{ slug: "clock", name: "Basic Clock" },
		{ slug: "kroniclock", name: "Kroni Clock" },
		{ slug: "paintingA", name: "Painting A" },
		{ slug: "paintingC", name: "Painting C" },
		{ slug: "paintingB", name: "Painting B" },
		{ slug: "paintingD", name: "Painting D" },
		{ slug: "wallmirror", name: "Wall Mirror" },
		{ slug: "lantern", name: "Small Lantern" },
		{ slug: "hangingvine", name: "Hanging Vines" },
		{ slug: "mountedSword", name: "Mounted Sword" },
		{ slug: "demonSword", name: "Oni Swords" },
		{ slug: "window", name: "Wooden Frame Window" },
		{ slug: "", name: "Golden Shrimp Trophy" },
		{ slug: "", name: "Golden Salmon Trophy" },
		{ slug: "", name: "Golden Tuna Trophy" },
		{ slug: "", name: "Golden Koi Fish Trophy" },
		{ slug: "", name: "Golden Lobster Trophy" },
		{ slug: "", name: "Golden Eel Trophy" },
		{ slug: "", name: "Golden Pufferfish Trophy" },
		{ slug: "", name: "Golden Manta Ray Trophy" },
		{ slug: "", name: "Golden Turtle Trophy" },
		{ slug: "", name: "Golden Squid Trophy" },
		{ slug: "", name: "Golden Shark Trophy" },
		{ slug: "", name: "Golden Axolotl Trophy" },
		{ slug: "hardcoretrophy", name: "Hardcore Trophy" },
	],
	interior: [
		{ slug: "woodenFloor", name: "Wooden Floor A" },
		{ slug: "woodenFloor2", name: "Wooden Floor B" },
		{ slug: "stoneFloor", name: "Stone Floor" },
		{ slug: "redCarpetFloor", name: "Red Carpet Floor" },
		{ slug: "blueCarpetFloor", name: "Blue Carpet Floor" },
		{ slug: "pinkCarpetFloor", name: "Pink Carpet Floor" },
		{ slug: "concreteFloor", name: "Concrete Floor" },
		{ slug: "marbleFloor", name: "Marble Floor" },
		{ slug: "tiledFloor", name: "Tiled Floor" },
		{ slug: "tatamiFloor", name: "Tatami Floor" },
		{ slug: "woodenWall", name: "Wooden Wall Base" },
		{ slug: "flatWall", name: "Flat Wall" },
		{ slug: "stripedWall", name: "Striped Wall" },
		{ slug: "skyWall", name: "Sky Wall" },
		{ slug: "polkaWallA", name: "Polka Dot Wall A" },
		{ slug: "polkaWallB", name: "Polka Dot Wall B" },
		{ slug: "polkaWallC", name: "Polka Dot Wall C" },
		{ slug: "oceanWall", name: "Ocean Wall" },
		{ slug: "modernWall", name: "Modern White Wall" },
		{ slug: "stoneWall", name: "Stone Wall" },
		{ slug: "easternWall", name: "Eastern Wall" },
	],
} as const;

export default {
	render(parentId: string, data: HoloCureSaveData) {
		$(`#${parentId}`).html(/*html*/ `
            <div class="tw:my-2">
                <h3 class="font-monocraft">Unlockables</h3>
                <div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold tw:ps-2">STAGES</h5>
                    <div data-content-type="stage-unlocks" class="row g-2"></div>
                </div>
				<div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold tw:ps-2">ITEMS</h5>
                    <div data-content-type="item-unlocks" class="row g-2"></div>
                </div>
				<div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold tw:ps-2">WEAPONS</h5>
                    <div data-content-type="weapon-unlocks" class="row g-2"></div>
                </div>
				<div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold tw:ps-2">ABILITIES (SHOP)</h5>
                    <div data-content-type="shop-unlocks" class="row g-2"></div>
                </div>
				<div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold tw:ps-2">FAN LETTERS</h5>
					<p class="tw:text-sm tw:text-gray-400 tw:ps-2">
						Requires the Fan Letter upgrade to be unlocked first.
					</p>
                    <div data-content-type="fanletters-unlocks" class="row g-2"></div>
                </div>
				<div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold tw:ps-2">RODS (HoloHouse - Fishing Pond)</h5>
					<p class="tw:text-sm tw:text-gray-400 tw:ps-2">
						Only unlocks these items in Bloop's Shop. They are not equipped by default when you unlock them here.
					</p>
                    <div data-content-type="rod-unlocks" class="row g-2"></div>
                </div>
				<div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold tw:ps-2">AXE (HoloHouse - Ckia's Forge)</h5>
					<p class="tw:text-sm tw:text-gray-400 tw:ps-2">
						Only unlocks these items in Ckia's Forge. They are not equipped by default when you unlock them here.
					</p>
                    <div data-content-type="axe-unlocks" class="row g-2"></div>
                </div>
				<div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold tw:ps-2">PICKAXE (HoloHouse - Ckia's Forge)</h5>
					<p class="tw:text-sm tw:text-gray-400 tw:ps-2">
						Only unlocks these items in Ckia's Forge. They are not equipped by default when you unlock them here.
					</p>
                    <div data-content-type="pickaxe-unlocks" class="row g-2"></div>
                </div>
				<div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold tw:ps-2">PRISM (HoloHouse - Ckia's Forge)</h5>
                    <p class="tw:text-sm tw:text-gray-400 tw:ps-2">
						Only unlocks these items in Ckia's Forge. They are not equipped by default when you unlock them here.
					</p>
					<div data-content-type="prism-unlocks" class="row g-2"></div>
                </div>
				<div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold tw:ps-2">CASINO</h5>
					<p class="tw:text-sm tw:text-gray-400 tw:ps-2">
						Only unlocks these items in the casino. They are not equipped by default when you unlock them here.
					</p>
                    <div data-content-type="casino-unlocks" class="row g-2"></div>
                </div>
				<div class="tw:border tw:border-gray-700 tw:bg-gray-950/30 tw:p-2 tw:pt-3 tw:rounded-lg tw:mb-6">
                    <h5 class="font-monocraft tw:font-semibold tw:ps-2">FURNISHINGS (HoloHouse)</h5>
                    <div data-content-type="furnishings-unlocks" class="row g-2"></div>
                </div>
            </div>`);

		// Unlocked stages editor
		const stageIds: { slug: (typeof stages)[number]["slug"]; id: string; $: () => JQuery<HTMLElement> }[] = [];
		stages
			.filter((x) => x.slug !== "DUNGEON")
			.forEach((x) => {
				const options: SwitchOptions = {
					heading: x.name,
					subtext: x.slug,
					defaultValue: data.unlockedStages.includes(x.slug),
					wrapperClassName: "col-12 col-sm-6 col-md-4 col-lg-3",
				};

				const input = switchInput('[data-content-type="stage-unlocks"]', options, function (val) {
					stages
						.filter((y) => y.requires === x.slug)
						.forEach((stage) => {
							const stageWId = stageIds.find((x) => x.slug === stage.slug);
							if (!stageWId) return;

							if (!val) stageWId.$().prop("checked", false).trigger("change");
							$(`[data-container-for="${stageWId.id}"]`)[val ? "removeClass" : "addClass"]("tw:opacity-40 tw:pointer-events-none");
						});

					data.unlockedStages = val ? [...new Set([...data.unlockedStages, x.slug])] : data.unlockedStages.filter((s) => s !== x.slug);
					if (x.slug === "TIME STAGE 1") data.timeModeUnlocked = val;
				});

				stageIds.push({ slug: x.slug, id: input.id, $: input.$ });
			});

		// Unlocked items editor
		items.forEach((x) => {
			const options: RichSwitchOptions = {
				heading: x.name,
				subtext: x.unlock,
				defaultValue: x.unlock === "Available by default." ? true : data.unlockedItems.includes(x.slug),
				disabled: x.unlock === "Available by default.",
				iconPath: `./gameicons/items/${x.slug}.webp`,
				wrapperClassName: "col-12 col-sm-6 col-md-4",
			};

			richSwitchInput('[data-content-type="item-unlocks"]', options, function (val) {
				data.unlockedItems = val ? [...new Set([...data.unlockedItems, x.slug])] : data.unlockedItems.filter((i) => i !== x.slug);
			});
		});

		// Unlocked weapons editor
		weapons.forEach((x) => {
			const options: RichSwitchOptions = {
				heading: x.name,
				subtext: x.unlock,
				defaultValue: x.unlock === "Available by default." ? true : data.unlockedWeapons.includes(x.slug),
				disabled: x.unlock === "Available by default.",
				iconPath: `./gameicons/weapons/${x.slug}.webp`,
				wrapperClassName: "col-12 col-sm-6 col-md-4",
			};

			richSwitchInput('[data-content-type="weapon-unlocks"]', options, function (val) {
				data.unlockedWeapons = val ? [...new Set([...data.unlockedWeapons, x.slug])] : data.unlockedWeapons.filter((i) => i !== x.slug);
			});
		});

		// Unlocked shopitems editor
		shop.forEach((x) => {
			const options: RichSwitchOptions = {
				heading: x.name,
				subtext: x.max === 1 ? "Unlocks this upgrade in the shop." : `Sets/Unsets this upgrade to max level (level ${x.max})`,
				defaultValue: ![false, 0].includes(data[x.key]),
				iconPath: `./gameicons/${x.key}.webp`,
				wrapperClassName: "col-12 col-sm-6 col-md-4",
			};

			richSwitchInput('[data-content-type="shop-unlocks"]', options, function (val) {
				data[x.key] = val ? x.max : 0;

				if (x.key === "fanLetterUnlock") {
					$('[data-content-type="fanletters-unlocks"] input').prop("disabled", !val);
				}
			});
		});

		// Unlocked Fan Letter editor
		fanLetter.forEach((x) => {
			const options: RichSwitchOptions = {
				heading: x.name,
				subtext: x.effect,
				defaultValue: data.fanletters.includes(x.slug),
				iconPath: `./gameicons/fanletters/${x.slug}.gif`,
				wrapperClassName: "col-12 col-sm-6 col-md-4",
				disabled: [false, 0].includes(data.fanLetterUnlock),
			};

			richSwitchInput('[data-content-type="fanletters-unlocks"]', options, function (val) {
				data.fanletters = val ? [...new Set([...data.fanletters, x.slug])] : data.fanletters.filter((i) => i !== x.slug);
			});
		});

		// Unlocked rods editor
		rods.forEach((x, idx) => {
			const options: RichSwitchOptions = {
				heading: x,
				subtext: `Lvl ${idx + 1} Rod`,
				defaultValue: data.rodUnlock[idx] === 1,
				disabled: idx === 0,
				iconPath: `./gameicons/rods/${x}.webp`,
				wrapperClassName: "col-12 col-sm-6 col-md-4",
			};

			richSwitchInput('[data-content-type="rod-unlocks"]', options, function (val) {
				data.rodUnlock[idx] = val === true ? 1 : 0;
			});
		});

		// Unlocked axe editor
		ckiaLvls.forEach((x, idx) => {
			const options: RichSwitchOptions = {
				heading: `${x} Axe`,
				subtext: idx === 0 ? "Default Axe" : `Also unlocks lvl ${idx + 1} Woodworking.`,
				defaultValue: data.axeUnlock[idx] === 1,
				disabled: idx === 0,
				iconPath: `./gameicons/ckia/${x} Axe.webp`,
				wrapperClassName: "col-12 col-sm-6 col-md-4",
			};

			richSwitchInput('[data-content-type="axe-unlocks"]', options, function (val) {
				data.axeUnlock[idx] = val === true ? 1 : 0;
				if (data.woodLevel < idx + 1) data.woodLevel = idx + 1;
			});
		});

		// Unlocked pickaxe editor
		ckiaLvls.forEach((x, idx) => {
			const options: RichSwitchOptions = {
				heading: `${x} Pickaxe`,
				subtext: idx === 0 ? "Default Pickaxe" : `Also unlocks lvl ${idx + 1} Mining.`,
				defaultValue: data.pickUnlock[idx] === 1,
				disabled: idx === 0,
				iconPath: `./gameicons/ckia/${x} Pickaxe.webp`,
				wrapperClassName: "col-12 col-sm-6 col-md-4",
			};

			richSwitchInput('[data-content-type="pickaxe-unlocks"]', options, function (val) {
				data.pickUnlock[idx] = val === true ? 1 : 0;
				if (data.woodLevel < idx + 1) data.mineLevel = idx + 1;
			});
		});

		// Unlocked prism editor
		prism.forEach((x, idx) => {
			const options: RichSwitchOptions = {
				heading: `${x} Prism`,
				subtext: `Blocks up to ${idx + 2} damage from attacks. Prism HP ${(idx + 3) * 100}.`,
				defaultValue: data.armorUnlock[idx] === 1,
				iconPath: `./gameicons/ckia/${x} Prism.webp`,
				wrapperClassName: "col-12 col-sm-6 col-md-4",
			};

			richSwitchInput('[data-content-type="prism-unlocks"]', options, function (val) {
				data.armorUnlock[idx] = val === true ? 1 : 0;
			});
		});

		// Unlocked casino prizes editor
		casinoPrizes.forEach((x, idx) => {
			const options: RichSwitchOptions = {
				heading: x.name,
				subtext: x.description,
				defaultValue: data.miscUnlocks.includes(x.slug),
				iconPath: `./gameicons/casino/${x.slug}.${x.slug.startsWith("pet") ? "gif" : "webp"}`,
				wrapperClassName: "col-12 col-sm-6 col-md-4",
			};

			richSwitchInput('[data-content-type="casino-unlocks"]', options, function (val) {
				data.miscUnlocks = val ? [...new Set([...data.miscUnlocks, x.slug])] : data.miscUnlocks.filter((m) => x.slug !== m);
			});
		});

		// Unlocked furnishings
		for (const [name, arr] of Object.entries(furnishings) as [keyof typeof furnishings, (typeof furnishings)[keyof typeof furnishings]][]) {
			$('[data-content-type="furnishings-unlocks"]').append(/*html*/ `<p class="font-monocraft tw:uppercase tw:mb-0! tw:ms-1">${name}</p>`);
			arr.forEach((x) => {
				if (!x.slug.length) return;

				const options: RichSwitchOptions = {
					heading: x.name,
					subtext: `for: ${name}`,
					defaultValue: data.unlockedFurniture.includes(x.slug),
					iconPath: `./gameicons/furnishings/${name}/${x.slug}.webp`,
					wrapperClassName: "col-12 col-sm-6 col-md-4",
				};

				richSwitchInput('[data-content-type="furnishings-unlocks"]', options, function (val) {
					data.unlockedFurniture = val ? [...new Set([...data.unlockedFurniture, x.slug])] : data.unlockedFurniture.filter((i) => i !== x.slug);
				});
			});
		}
	},
};
