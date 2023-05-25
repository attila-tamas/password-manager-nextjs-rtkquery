export const passwordGenerationSettings = {
	passwordLength: 32,
	uppercase: true,
	lowercase: true,
	numbers: true,
	symbols: true,
};

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

const random = (min = 0, max = 1) => {
	return Math.floor(Math.random() * (max + 1 - min) + min);
};

const randomLower = () => {
	return String.fromCharCode(random(97, 122));
};

const randomUpper = () => {
	return String.fromCharCode(random(65, 90));
};

const randomSymbol = () => {
	const symbols = "~*$%@#^&!?*'-=/,.{}()[]<>";
	return symbols[random(0, symbols.length - 1)];
};
