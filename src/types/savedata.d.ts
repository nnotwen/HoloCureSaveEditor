// Achievement types
interface Achievement {
	unlocked: boolean;
	flags: Record<string, any>; // Could be more specific if you know the flag structure
}

// Farm plant tuple type
type FarmPlant = [
	string, // seed type
	string, // soil type
	string, // crop type
	number, // time parameter 1
	number, // time parameter 2
	number, // growth stage?
	boolean, // is watered?
	number, // harvest count?
];

// Tears tuple type
type Tear = [string, number]; // [character name, count]

// Forge node tuple type
type ForgeNode = [string, string, number]; // [node type, ref string, value]

// Stage completion tuple type
type StageCompletion = [string, string[]]; // [stage name, characters completed with]

// Worker tuple type (very complex - 27+ elements!)
type Worker = [
	string, // worker type
	string, // sprite ref
	string, // name
	number, // level?
	number, // stat 1
	number, // stat 2
	number, // stat 3
	number, // stat 4
	number, // stat 5
	number, // stat 6
	string, // food preference
	number, // stat 7
	number, // stat 8
	number, // stat 9
	number, // stat 10
	number, // stat 11
	number, // stat 12
	number, // stat 13
	number, // stat 14
	number, // stat 15
	number, // stat 16
	number, // stat 17
	number, // stat 18
	number, // stat 19
	number, // stat 20
	number, // stat 21
	number, // stat 22
	number, // stat 23
];

// Inventory item tuple type
type InventoryItem = [string, number, number]; // [item name, quantity, value?]

// Created food tuple type
type CreatedFood = [string, number]; // [food name, quantity]

// Fandom EXP tuple type
type FandomEXP = [string, number]; // [character name, exp amount]

// Character level tuple type
type CharacterLevel = [string, number]; // [character name, level]

// Character clear count tuple type
type CharacterClear = [string, number]; // [character name, clear count]

// Score data type (base64 encoded strings + numbers)
interface ScoreData {
	superCollabs: string; // base64
	collabs: string; // base64
	stickers: string; // base64
	support: string; // base64
	food: string; // base64
	duration: number;
	weapons: string; // base64
	level: number;
	items: string; // base64
	prism: string; // base64
	score: number;
	hardcore: boolean;
	itemsSuper: string; // base64
}

// Daily score wrapper
interface DailyScore {
	timestamp: number;
	score: ScoreData;
}

// Character scores for a stage
interface CharacterScores {
	allTime: ScoreData;
	daily: DailyScore;
	versionMajor: number;
	versionMinor: number;
}

// Stage scores
interface StageScores {
	[characterName: string]: CharacterScores;
}

// Local scores by stage
interface LocalScores {
	[stageName: string]: StageScores;
}

// Main save file interface
export interface HoloCureSaveData {
	achievements: Record<string, Achievement>;
	autoCook: string;
	selectedArmor: number;
	skillDamage: number;
	food: number;
	growth: number;
	usingAxe: number;
	woodLevel: number;
	unlockedFurniture: string[];
	farmPlants: FarmPlant[];
	bonusPool: number;
	specUnlock: number;
	towerTime: [number, number, number, number, number]; // [?, ?, ?, ?, total?]
	disabledItems: string[];
	GROff: number;
	haste: number;
	canDisable: number;
	holoCoins: number;
	mobUp: number;
	unlockedItems: string[];
	manageEXP: number;
	fanLetterUnlock: number;
	foodIndex: number;
	holoHouseSet: Record<string, any>; // Empty object in data
	holoHouseWall: number;
	tears: Tear[];
	materialDrops: number;
	usingPick: number;
	forgeNodes: ForgeNode[];
	completedStages: StageCompletion[];
	GameVersionNumberMajor: number;
	fishSand: number;
	holoChips: number;
	noSupers: number;
	usadaDrinks: number;
	ATK: number;
	fanletters: string[];
	noCollabs: number;
	stamps: number;
	towerJumps: number;
	unlockedStages: string[];
	unlockedWeapons: string[];
	holdOption: number;
	regen: number;
	trackedTime: number;
	specCDR: number;
	enhanceUp: number;
	createdFoods: CreatedFood[];
	mineLevel: number;
	activePet: string;
	EXP: number;
	miscUnlocks: any[];
	fandomEXP: FandomEXP[];
	disabledWeapons: string[];
	GameVersionNumberMinor: number;
	moneyGain: number;
	supports: number;
	reroll: number;
	itemLimit: number;
	weaponLimit: number;
	towerSave: boolean;
	holoHouseFloor: number;
	cookingOn: boolean;
	rodUnlock: number[];
	supportID: string;
	seenCollabs: string[];
	enchantments: number;
	activeScams: any[];
	fandom: number;
	refund: number;
	mineEXP: number;
	axeUnlock: number[];
	timeModeUnlocked: boolean;
	challenge: number;
	unlockedCharacters: number;
	unlockedOutfits: string[];
	towerFlags: number;
	activeTrail: string;
	eliminate: number;
	WorkerRacesCompleted: any[];
	randomMoneyKey: number;
	fishRod: number;
	inventory: InventoryItem[];
	pickupRange: number;
	armorUnlock: number[];
	towerCoins: number[];
	pickUnlock: number[];
	LocalScores: LocalScores;
	DR: number;
	SPD: number;
	manageWorkers: Worker[];
	woodEXP: number;
	towerCheckPoint: [number, number];
	towerlastPos: [number, number];
	firstTime: boolean;
	characters: CharacterLevel[];
	characterClears: CharacterClear[];
	HP: number;
	manageLevel: number;
	towerFalls: number;
	currentFood: [string, number];
	crit: number;
}

export interface Snapshot {
	uuid: string;
	name: string;
	timestamp: number;
	data: HoloCureSaveData;
}
