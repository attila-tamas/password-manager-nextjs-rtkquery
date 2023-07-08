import styles from "./entriesList.module.scss";
// react
import { ReactNode } from "react";

export default function EntriesList({
	entries,
	searchKeyword,
	onAddNewClicked,
}: {
	entries: ReactNode | null;
	searchKeyword: string;
	onAddNewClicked: () => void;
}) {
	if (searchKeyword && !entries) {
		return (
			<div className={styles["no-result"]}>
				<span>No results found</span>

				<p className={styles["no-result__hint"]}>
					Check for typos or use a different term
				</p>
			</div>
		);
	} else if (!searchKeyword && !entries) {
		return (
			<div className={styles["no-result"]}>
				<span>Your vault is empty</span>

				<p className={styles["no-result__hint"]}>
					Add a key by pressing the{" "}
					<span className="interactable" onClick={onAddNewClicked}>
						New
					</span>{" "}
					button
				</p>
			</div>
		);
	}

	return <div className={styles["key-list"]}>{entries}</div>;
}
