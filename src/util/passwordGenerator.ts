// default password generation settings
// import it where the passwordGenerator() function is being used
// used for generating a password on page load, or without settings set by the user
export const passwordGenerationSettings = {
	passwordLength: 32,
	uppercase: true,
	lowercase: true,
	numbers: true,
	symbols: true,
};

// generates and returns a randomized password based on the generation settings
export const passwordGenerator = (settings: {
	passwordLength: number;
	uppercase: boolean;
	lowercase: boolean;
	numbers: boolean;
	symbols: boolean;
}) => {
	let password = "";

	for (let i = 0; i < settings.passwordLength; i++) {
		const choice = random(0, 3);

		if (settings.lowercase && choice === 0) {
			password += randomLower();
		} else if (settings.uppercase && choice === 1) {
			password += randomUpper();
		} else if (settings.symbols && choice === 2) {
			password += randomSymbol();
		} else if (settings.numbers && choice === 3) {
			password += random(0, 9);
		} else {
			i--;
		}
	}

	return password;
};

// generate a random number
const random = (min = 0, max = 1) => {
	return Math.floor(Math.random() * (max + 1 - min) + min);
};

// generate a random lowercase character
const randomLower = () => {
	return String.fromCharCode(random(97, 122));
};

// generate a random uppercase character
const randomUpper = () => {
	return String.fromCharCode(random(65, 90));
};

// generate a random symbol from the predefined symbols string
const SYMBOLS = "~*$%@#^&!?*'-=/,.{}()[]<>";

const randomSymbol = () => {
	return SYMBOLS[random(0, SYMBOLS.length - 1)];
};
