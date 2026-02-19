export interface Achievement {
	key: string;
	type: "General" | "Character";
	label: string;
	icon: string;
	desc: string;
	reward: { name: string; value: number };
}
