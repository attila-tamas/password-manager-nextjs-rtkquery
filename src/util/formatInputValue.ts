export default function format(value: string) {
	if (value === " ") {
		return "";
	} else if (value.endsWith("  ")) {
		return value.slice(0, -1);
	}
	return value;
}
