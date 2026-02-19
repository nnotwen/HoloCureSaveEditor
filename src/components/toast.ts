import $ from "jquery";
import { Toast } from "bootstrap";
import { generateUniqueId } from "../utils/generateUniqueId";

function createToast(message: string, type: "success" | "error" | "warning" | "info") {
	const toastId = generateUniqueId();
	let toastType: string, iconClass: string;

	switch (type) {
		case "error":
			toastType = "tw:bg-red-900/70! tw:border! tw:border-red-500/70! tw:text-red-200!";
			iconClass = "bi bi-x-circle-fill";
			break;
		case "info":
			toastType = "tw:bg-sky-900/70! tw:border! tw:border-sky-500/70! tw:text-sky-200!";
			iconClass = "bi bi-info-circle-fill";
			break;
		case "success":
			toastType = "tw:bg-green-900/70! tw:border! tw:border-green-500/70! tw:text-green-200!";
			iconClass = "bi bi-check-circle-fill";
			break;
		case "warning":
			toastType = "tw:bg-amber-900/70! tw:border! tw:border-amber-500/70! tw:text-amber-200!";
			iconClass = "bi bi-exclamation-circle-fill";
			break;
	}

	const toastHtml = /*html*/ `
    <div id="${toastId}" class="toast ${toastType} position-relative align-items-center border-0 overflow-hidden" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="tw:flex tw:items-center">
			<span class="ps-3 text-xl ${iconClass}"></span>
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>`;

	if ($(".toast-container").length === 0) {
		$("body").append('<div class="toast-container position-fixed top-0 start-50 translate-middle-x p-3"></div>');
	}

	$(".toast-container").append(toastHtml);

	const toastEl = document.getElementById(toastId)!;
	const toast = new Toast(toastEl, { delay: 5000 });
	toast.show();

	toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
}

const toast = {
	success(message: string) {
		createToast(message, "success");
	},
	error(message: string) {
		createToast(message, "error");
	},
	warning(message: string) {
		createToast(message, "warning");
	},
	info(message: string) {
		createToast(message, "info");
	},
};

export default toast;
