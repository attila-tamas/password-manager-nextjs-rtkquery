import capitalizeFirstLetter from "./capitalizeFirstLetter";
import format from "./formatInputValue";
import { deleteCookies, getCookie } from "./handleCookies";
import {
	passwordGenerationSettings,
	passwordGenerator,
} from "./passwordGenerator";
import { pixelToEm, pixelToRem } from "./pixelConverter";
import { navLinks, protectedRoutes, publicRoutes, routes } from "./routes";

export {
	capitalizeFirstLetter,
	format,
	passwordGenerator,
	passwordGenerationSettings,
	pixelToEm,
	pixelToRem,
	navLinks,
	protectedRoutes,
	publicRoutes,
	routes,
	deleteCookies,
	getCookie,
};
