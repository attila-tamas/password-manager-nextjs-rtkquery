// used for formatting input values
// for example in a search bar, to not allow the user to search for a whitespace
export default function format(value: string) {
	if (value === " ") {
		return "";
	} else if (value.endsWith("  ")) {
		return value.slice(0, -1);
	}
	return value;
}
