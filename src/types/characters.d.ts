/**
 * Represents a character's generation/group information
 */
interface CharacterGeneration {
	/** Short identifier/slug for the generation (e.g., "myth", "gen0", "id1") */
	slug: string;
	/** Full display name of the generation (e.g., "HoloMyth", "JP 0th Gen") */
	full: string;
}

/**
 * Represents a single HoloCure character's data
 */
interface HoloCureCharacter {
	/** The character's full display name */
	fullname: string;

	/** The character's main weapon name */
	weapon: string;

	/** The character's special attack name */
	special: string;

	/** Array of the character's three skill names */
	skills: [string, string, string]; // Exactly 3 skills

	/** Generation/group information */
	generation: CharacterGeneration;

	/** Array of available outfit names for the character */
	outfits: string[];
}

/**
 * Collection of all HoloCure characters, keyed by their ID/slug
 */
interface HoloCureCharacters {
	/** Amelia Watson */
	ame: HoloCureCharacter;

	/** Gawr Gura */
	gura: HoloCureCharacter;

	/** Ninomae Ina'nis */
	ina: HoloCureCharacter;

	/** Takanashi Kiara */
	kiara: HoloCureCharacter;

	/** Mori Calliope */
	calli: HoloCureCharacter;

	/** Hakos Baelz */
	bae: HoloCureCharacter;

	/** Ouro Kronii */
	kronii: HoloCureCharacter;

	/** Ceres Fauna */
	fauna: HoloCureCharacter;

	/** Nanashi Mumei */
	mumei: HoloCureCharacter;

	/** Tsukumo Sana */
	sana: HoloCureCharacter;

	/** IRyS */
	irys: HoloCureCharacter;

	/** Shirakami Fubuki */
	fubuki: HoloCureCharacter;

	/** Ookami Mio */
	mio: HoloCureCharacter;

	/** Nekomata Okayu */
	okayu: HoloCureCharacter;

	/** Inugami Korone */
	korone: HoloCureCharacter;

	/** Tokino Sora */
	sora: HoloCureCharacter;

	/** AZKi */
	azki: HoloCureCharacter;

	/** Roboco-san */
	roboco: HoloCureCharacter;

	/** Hoshimachi Suisei */
	suisei: HoloCureCharacter;

	/** Sakura Miko */
	miko: HoloCureCharacter;

	/** Akai Haato */
	haato: HoloCureCharacter;

	/** Yozora Mel */
	mel: HoloCureCharacter;

	/** Natsuiro Matsuri */
	matsuri: HoloCureCharacter;

	/** Aki Rosenthal */
	aki: HoloCureCharacter;

	/** Oozora Subaru */
	subaru: HoloCureCharacter;

	/** Yuzuki Choco */
	choco: HoloCureCharacter;

	/** Murasaki Shion */
	shion: HoloCureCharacter;

	/** Nakiri Ayame */
	ayame: HoloCureCharacter;

	/** Minato Aqua */
	aqua: HoloCureCharacter;

	/** Usada Pekora */
	pekora: HoloCureCharacter;

	/** Houshou Marine */
	marine: HoloCureCharacter;

	/** Shirogane Noel */
	noel: HoloCureCharacter;

	/** Shiranui Flare */
	flare: HoloCureCharacter;

	/** Kiryu Coco */
	coco: HoloCureCharacter;

	/** Amane Kanata */
	kanata: HoloCureCharacter;

	/** Tokoyami Towa */
	towa: HoloCureCharacter;

	/** Tsunomaki Watame */
	watame: HoloCureCharacter;

	/** Himemori Luna */
	luna: HoloCureCharacter;

	/** Moona Hoshinova */
	moona: HoloCureCharacter;

	/** Ayunda Risu */
	risu: HoloCureCharacter;

	/** Airani Iofifteen */
	iofi: HoloCureCharacter;

	/** Kureiji Ollie */
	ollie: HoloCureCharacter;

	/** Pavolia Reine */
	reine: HoloCureCharacter;

	/** Anya Melfissa */
	anya: HoloCureCharacter;

	/** Kobo Kanaeru */
	kobo: HoloCureCharacter;

	/** Kaela Kovalskia */
	kaela: HoloCureCharacter;

	/** Vestia Zeta */
	zeta: HoloCureCharacter;
}

/**
 * Type for valid character keys/IDs
 */
type CharacterKey = keyof HoloCureCharacters;

/**
 * Type for valid generation slugs
 */
type GenerationSlug =
	| "myth" // HoloMyth
	| "councilHope" // HoloCouncil + HOPE
	| "gamers" // HoloGamers
	| "gen0" // JP 0th Gen
	| "gen1" // JP 1st Gen
	| "gen2" // JP 2nd Gen
	| "gen3" // JP 3rd Gen
	| "gen4" // JP 4th Gen
	| "id1" // ID 1st Gen
	| "id2" // ID 2nd Gen
	| "id3"; // ID 3rd Gen
