import { icons } from "@components/icon/icon";

export default function useShowPasswordIcon(show: boolean) {
	if (show) return icons.hide;
	return icons.show;
}
