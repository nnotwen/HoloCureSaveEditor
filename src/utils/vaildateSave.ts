import $ from "jquery";
import { HoloCureSaveData } from "../types/savedata";

export default async function validate(data: HoloCureSaveData) {
	// Validate achievements
	const logs: { type: "error" | "warning" | "info"; message: string }[] = [];

	logs.push({ type: "info", message: "Fetching references..." });

	let charactersData: HoloCureCharacters | null = null;
	try {
		charactersData = await $.getJSON("./data/characters.json");
	} catch (error) {
		logs.push({ type: "error", message: `Failed to fetch character data: ${(error as Error).message}. Revalidating may solve this issue.` });
	}

	(function () {
		logs.push({ type: "info", message: "Validating achievements..." });
		const { achievements: ach } = data;

		// Stages
		for (const [idx, title] of Object.entries(["Thousand Mile Stare", "Thank the Managers", "All Outta Candy", "Dah Lah"])) {
			const stage = parseInt(idx) + 1;
			if (ach[`${stage}hard`] && !data.unlockedStages.includes(`STAGE ${stage} (HARD)`)) {
				logs.push({ type: "warning", message: `${title} is unlocked while STAGE ${stage} (HARD) is still locked!` });
			}
			if (ach[`${stage}hard`] && !data.completedStages.find((x) => x[0] === `STAGE ${stage} (HARD)`)?.length) {
				logs.push({ type: "warning", message: `${title} is unlocked while STAGE ${stage} (HARD) has not yet been cleared!` });
			}
		}

		// Characters
		if (charactersData) {
			for (const [slug, char] of Object.entries(charactersData) as [keyof HoloCureCharacters, HoloCureCharacter][]) {
				// 10 minutes (specific)
				if (ach[`${slug}10`] && (data.characters.find((x) => x[0] === slug)?.[1] ?? 0) < 1) {
					logs.push({ type: "warning", message: `` });
				}
			}
		}
	})();
}
