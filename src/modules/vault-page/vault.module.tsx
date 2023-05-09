import styles from "./vault.module.scss";

import Input from "@components/input-component/input";
import Button from "@components/button-component/button";
import Key from "@components/key-component/key";

export default function Vault() {
	const dummyData = {
		title: "Figma",
		password: "123",
		email: "test.email@gmail.com",
		websiteUrl: "figma.com",
	};

	return (
		<div className={styles.container}>
			<div className={styles.container__utilContainer}>
				<Input type="text" placeholder="Search..." />
				<Button text="New" color="primary" />
			</div>

			<div className={styles.container__keyList}>
				<Key props={dummyData} />
				<Key props={dummyData} />
			</div>
		</div>
	);
}
