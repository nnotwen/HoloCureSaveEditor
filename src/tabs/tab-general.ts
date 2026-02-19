import $ from "jquery";
import { HoloCureSaveData } from "../types/savedata";

const NumberFormatter = Intl.NumberFormat("en-US", {
	notation: "compact",
	compactDisplay: "short",
	maximumFractionDigits: 1,
});

export default {
	render(parentId: string, data: HoloCureSaveData) {
		$(`#${parentId}`).html(/*html*/ `
            <div class="container py-3">
                <div class="tw:relative tw:overflow-hidden tw:text-white rounded-4 p-5 mb-4 tw:shadow-lg">
                    <div class="tw:absolute tw:inset-0 tw:bg-cover tw:bg-no-repeat tw:bg-center tw:opacity-60" style="background-image: url('./images/background.jpg')"></div>
                    <div class="tw:relative row tw:items-center">
                        <div class="col-md-8">
                            <h1 class="display-5 fw-bold mb-3">
                                <i class="bi bi-emoji-smile-upside-down me-3"></i>
                                Welcome to HoloCure Save Editor!
                            </h1>
                            <p class="lead mb-3">
                                Save file has been loaded successfully. Ready to explore?
                            </p>
                            <div class="d-flex gap-2 flex-wrap">
                                <span class="badge bg-white text-dark p-2">
                                    <i class="bi bi-check-circle-fill text-success me-1"></i>
                                    File: save_n.dat
                                </span>
                                <span class="badge bg-white text-dark p-2">
                                    <i class="bi bi-calendar me-1"></i>
                                    Version: ${data.GameVersionNumberMajor}.${data.GameVersionNumberMinor}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-4 text-end d-none d-md-block">
                            <i class="bi bi-controller display-1 opacity-50"></i>
                        </div>
                    </div>
                </div>
                <div class="mb-5">
                    <h2 class="h4 mb-4">
                        <i class="bi bi-compass-fill text-primary me-2"></i>
                        Where to start? Here's what each tab does:
                    </h2>

                    <div class="row g-3">
                        <div class="col-md-6 col-lg-4">
                            <div class="tw:p-4 tw:rounded-lg tw:h-full tw:shadow-sm tw:hover:-translate-y-1 tw:transition-transform tw:bg-gray-950/70 tw:border tw:border-gray-700/70 tw:cursor-pointer">
                                <div class="tw:flex tw:items-center tw:mb-3">
                                    <div class="tw:bg-yellow-500/10 p-3 tw:rounded-full tw:me-3 tw:shrink-0 tw:w-12 tw:h-12 tw:flex tw:justify-center tw:items-center">
                                        <i class="bi bi-trophy-fill tw:text-yellow-400 fs-5"></i>
                                    </div>
                                    <div>
                                        <h5 class="tw:font-bold tw:mb-0!">ACHIEVEMENTS</h5>
                                        <span class="tw:px-2 tw:bg-yellow-900/30 tw:border tw:border-yellow-300/70 tw:text-yellow-300 tw:text-xs tw:rounded-full">${Object.values(data.achievements).length} total</span>
                                    </div>
                                </div>
                                <p class="tw:text-gray-400">
                                    Browse and unlock achievements. From "First Clear" to "Gachikoi" status; 
                                    see what you've accomplished and what's left to do.
                                </p>
                                <div class="tw:bg-gray-900 tw:p-3 tw:rounded-lg small">
                                    <i class="bi bi-lightbulb-fill text-warning me-1"></i>
                                    <span class="tw:font-bold">Pro tip:</span> Some achievements require specific items or stage clears. Edit with care!
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4">
                            <div class="tw:p-4 tw:rounded-lg tw:h-full tw:shadow-sm tw:hover:-translate-y-1 tw:transition-transform tw:bg-gray-950/70 tw:border tw:border-gray-700/70 tw:cursor-pointer">
                                <div class="tw:flex tw:items-center tw:mb-3">
                                    <div class="tw:bg-green-500/10 p-3 tw:rounded-full tw:me-3 tw:shrink-0 tw:w-12 tw:h-12 tw:flex tw:justify-center tw:items-center">
                                        <i class="bi bi-gem tw:text-green-400 fs-5"></i>
                                    </div>
                                    <div>
                                        <h5 class="tw:font-bold tw:mb-0!">RESOURCES</h5>
                                        <span class="tw:px-2 tw:bg-green-900/30 tw:border tw:border-green-300/70 tw:text-green-300 tw:text-xs tw:rounded-full">Currencies & Materials</span>
                                    </div>
                                </div>
                                <p class="tw:text-gray-400">
                                    Manage your HoloCoins, HoloChips, Fish Sand, and inventory materials. 
                                    Perfect for funding those expensive casino purchases!
                                </p>
                                <div class="tw:bg-gray-900 tw:p-3 tw:rounded-lg small">
                                    <i class="bi bi-lightbulb-fill text-warning me-1"></i>
                                    <span class="tw:font-bold">Quick edit:</span> Adjust coins, chips, and materials with the input.
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4">
                            <div class="tw:p-4 tw:rounded-lg tw:h-full tw:shadow-sm tw:hover:-translate-y-1 tw:transition-transform tw:bg-gray-950/70 tw:border tw:border-gray-700/70 tw:cursor-pointer">
                                <div class="tw:flex tw:items-center tw:mb-3">
                                    <div class="tw:bg-sky-500/10 p-3 tw:rounded-full tw:me-3 tw:shrink-0 tw:w-12 tw:h-12 tw:flex tw:justify-center tw:items-center">
                                        <i class="bi bi-people-fill tw:text-sky-400 fs-5"></i>
                                    </div>
                                    <div>
                                        <h5 class="tw:font-bold tw:mb-0!">CHARACTERS</h5>
                                        <span class="tw:px-2 tw:bg-sky-900/30 tw:border tw:border-sky-300/70 tw:text-sky-300 tw:text-xs tw:rounded-full">Currencies & Materials</span>
                                    </div>
                                </div>
                                <p class="tw:text-gray-400">
                                    View and edit character levels, fandom progress, and unlock status. 
                                    Boost your oshi to max level or unlock all outfits!
                                </p>
                                <div class="tw:bg-gray-900 tw:p-3 tw:rounded-lg small">
                                    <i class="bi bi-lightbulb-fill text-warning me-1"></i>
                                    <span class="tw:font-bold">Did you know?</span> You can set any character to Gachikoi status by setting their Fandom EXP to 100.
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4">
                            <div class="tw:p-4 tw:rounded-lg tw:h-full tw:shadow-sm tw:hover:-translate-y-1 tw:transition-transform tw:bg-gray-950/70 tw:border tw:border-gray-700/70 tw:cursor-pointer">
                                <div class="tw:flex tw:items-center tw:mb-3">
                                    <div class="tw:bg-blue-500/10 p-3 tw:rounded-full tw:me-3 tw:shrink-0 tw:w-12 tw:h-12 tw:flex tw:justify-center tw:items-center">
                                        <i class="bi bi-box-seam tw:text-blue-400 fs-5"></i>
                                    </div>
                                    <div>
                                        <h5 class="tw:font-bold tw:mb-0!">UNLOCKABLES</h5>
                                        <span class="tw:px-2 tw:bg-blue-900/30 tw:border tw:border-blue-300/70 tw:text-blue-300 tw:text-xs tw:rounded-full">Items & Weapons</span>
                                    </div>
                                </div>
                                <p class="tw:text-gray-400">
                                    Manage your collection of items, weapons, and equipments.
                                </p>
                                <div class="tw:bg-gray-900 tw:p-3 tw:rounded-lg small">
                                    <i class="bi bi-lightbulb-fill text-warning me-1"></i>
                                    <span class="tw:font-bold">Quick switch:</span> Lock/Unlock items with a simple switch
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4">
                            <div class="tw:p-4 tw:rounded-lg tw:h-full tw:shadow-sm tw:hover:-translate-y-1 tw:transition-transform tw:bg-gray-950/70 tw:border tw:border-gray-700/70 tw:cursor-pointer">
                                    <div class="tw:flex tw:items-center tw:mb-3">
                                        <div class="tw:bg-red-500/10 p-3 tw:rounded-full tw:me-3 tw:shrink-0 tw:w-12 tw:h-12 tw:flex tw:justify-center tw:items-center">
                                            <i class="bi bi-graph-up-arrow tw:text-red-400 fs-5"></i>
                                        </div>
                                        <div>
                                            <h5 class="tw:font-bold tw:mb-0!">PROGRESS</h5>
                                            <span class="tw:px-2 tw:bg-red-900/30 tw:border tw:border-red-300/70 tw:text-red-300 tw:text-xs tw:rounded-full">Stage clears</span>
                                        </div>
                                    </div>
                                    <p class="tw:text-gray-400">
                                        Track stage completions, Tower of Suffering (tentative) stats, and Holohouse upgrades. 
                                        See which characters have cleared which stages.
                                    </p>
                                    <div class="tw:bg-gray-900 tw:p-3 tw:rounded-lg small">
                                        <i class="bi bi-lightbulb-fill text-warning me-1"></i>
                                        <span class="tw:font-bold">Tower data:</span> Jumps, falls, and checkpoint progress
                                    </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4">
                            <div class="tw:p-4 tw:rounded-lg tw:h-full tw:shadow-sm tw:hover:-translate-y-1 tw:transition-transform tw:bg-gray-950/70 tw:border tw:border-gray-700/70 tw:cursor-pointer">
                                <div class="tw:flex tw:items-center tw:mb-3">
                                    <div class="tw:bg-orange-500/10 p-3 tw:rounded-full tw:me-3 tw:shrink-0 tw:w-12 tw:h-12 tw:flex tw:justify-center tw:items-center">
                                        <i class="bi bi-graph-up-arrow tw:text-orange-400 fs-5"></i>
                                    </div>
                                    <div>
                                        <h5 class="tw:font-bold tw:mb-0!">EXPORT</h5>
                                        <span class="tw:px-2 tw:bg-orange-900/30 tw:border tw:border-orange-300/70 tw:text-orange-300 tw:text-xs tw:rounded-full">Final step</span>
                                    </div>
                                </div>
                                <p class="tw:text-gray-400">
                                    Ready to save your changes? Export your edited save and download it as a .dat file. 
                                    Don't forget to backup your original!
                                </p>
                                <div class="tw:bg-gray-900 tw:p-3 tw:rounded-lg small">
                                    <i class="bi bi-lightbulb-fill text-warning me-1"></i>
                                    <span class="tw:font-bold">Important:</span> Always keep a backup of your original save file
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="tw:p-4 tw:rounded-lg tw:h-full tw:shadow-sm tw:bg-gray-950/70 tw:border tw:border-gray-700/70 tw:cursor-pointer">
                            <h5 class="card-title mb-3">
                                <i class="bi bi-lightbulb-fill text-warning me-2"></i>
                                Editor Tips & Tricks
                            </h5>
                            <div id="tipCarousel" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <div class="row align-items-center">
                                            <div class="col-md-1 text-center">
                                                <i class="bi bi-camera-fill text-primary display-6"></i>
                                            </div>
                                            <div class="col-md-11">
                                                <p class="mb-0"><span class="fw-bold">Snapshots:</span> Save different versions of your save in your browser. Perfect for rollback!</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="row align-items-center">
                                            <div class="col-md-1 text-center">
                                                <i class="bi bi-arrow-repeat text-success display-6"></i>
                                            </div>
                                            <div class="col-md-11">
                                                <p class="mb-0"><span class="fw-bold">Export often:</span> Click "Export Current State" frequently. The JSON viewer only updates when you export!</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="row align-items-center">
                                            <div class="col-md-1 text-center">
                                                <i class="bi bi-cloud-slash-fill text-danger display-6"></i>
                                            </div>
                                            <div class="col-md-11">
                                                <p class="mb-0"><span class="fw-bold">Steam Cloud:</span> Disable Steam Cloud to prevent sync conflict prompts when swapping saves.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center gap-2 mt-3">
                                <button type="button" data-bs-target="#tipCarousel" data-bs-slide-to="0" class="btn btn-sm btn-outline-primary rounded active">1</button>
                                <button type="button" data-bs-target="#tipCarousel" data-bs-slide-to="1" class="btn btn-sm btn-outline-primary rounded">2</button>
                                <button type="button" data-bs-target="#tipCarousel" data-bs-slide-to="2" class="btn btn-sm btn-outline-primary rounded">3</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row g-4">
                    <div class="col-md-4">
                        <div class="tw:p-4 tw:rounded-lg tw:h-full tw:shadow-sm tw:bg-gray-950/70 tw:border tw:border-gray-700/70 tw:cursor-pointer">
                                <h6 class="mb-2 text-secondary">Your Initial Progress</h6>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <span class="h4 fw-bold" id="characterCount">${data.characters.filter((x) => x[1] > 0).length}</span>
                                        <span class="text-secondary"> characters</span>
                                    </div>
                                    <i class="bi bi-people fs-2 opacity-50"></i>
                                </div>
                                <div class="mt-3 d-flex justify-content-between small">
                                    <span><i class="bi bi-person-standing-dress text-success me-1"></i>Outfits: <span id="outfitsCount">${data.unlockedOutfits.length - 1}</span></span>
                                    <span><i class="bi bi-star-fill text-warning me-1"></i>Gachikoi: <span id="gachikoiCount">${data.fandomEXP.filter((x) => x[1] === 100).length}</span></span>
                                </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="tw:p-4 tw:rounded-lg tw:h-full tw:shadow-sm tw:bg-gray-950/70 tw:border tw:border-gray-700/70 tw:cursor-pointer">
                            <h6 class="mb-2 text-secondary">Your Initial Resources</h6>
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <span class="h4 fw-bold" id="holoCoinDisplay">${NumberFormatter.format(data.holoCoins)}</span>
                                    <span class="text-secondary"> Coins</span>
                                </div>
                                <i class="bi bi-cash-coin fs-2 opacity-50 text-success"></i>
                            </div>
                            <div class="mt-3 d-flex justify-content-between small">
                                <span><i class="bi bi-coin me-1"></i>Chips: <span id="chipCount">${NumberFormatter.format(data.holoChips)}</span></span>
                                <span><i class="bi bi-water me-1"></i>Fish Sand: <span id="fishSandCount">${NumberFormatter.format(data.fishSand)}</span></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="tw:p-4 tw:rounded-lg tw:h-full tw:shadow-sm tw:bg-gray-950/70 tw:border tw:border-gray-700/70 tw:cursor-pointer">
                            <h6 class="mb-2 text-secondary">Initial Collection</h6>
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <span class="h4 fw-bold" id="itemCount">${data.unlockedItems.length}</span>
                                    <span class="text-secondary"> items</span>
                                </div>
                                <i class="bi bi-grid-3x3-gap-fill fs-2 opacity-50 text-info"></i>
                            </div>
                            <div class="mt-3 d-flex justify-content-between small">
                                <span><i class="bi bi-shield-shaded me-1"></i>Weapons: <span id="weaponCount">${data.unlockedWeapons.length}</span></span>
                                <span><i class="bi bi-envelope-paper me-1"></i>Fan Letters: <span id="fanLetterCount">${data.fanletters.length}</span></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tw:p-4 tw:flex tw:items-center tw:mt-4 tw:rounded-lg tw:h-full tw:shadow-sm tw:bg-blue-950/30 tw:border tw:border-blue-700/70 tw:text-blue-400!">
                    <i class="bi bi-question-circle-fill fs-3 me-2"></i>
                    <span>Need help? Visit the <a href="https://holocure.wiki.gg/" target="_blank" class="fw-bold tw:no-underline tw:hover:underline">HoloCure Wiki</a> for more information about game mechanics.</span>
                </div>
            </div>
        `);

		document.getElementById("tipCarousel")?.addEventListener("slide.bs.carousel", (e) => {
			$(`[data-bs-target="#tipCarousel"][data-bs-slide-to="${(e as any).to}"]`)
				.addClass("active")
				.siblings()
				.removeClass("active");
		});
	},
};
