const pixelToRem = (pixel: number): string => {
	return `${pixel / 16}rem`;
};

const pixelToEm = (pixel: number): string => {
	return `${pixel / 16}em`;
};

export { pixelToRem, pixelToEm };
