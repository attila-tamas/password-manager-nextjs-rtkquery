import styles from "./vault.module.scss";

import { useGetKeysQuery } from "@redux/keys/keysApiSlice";

import Input from "@components/input-component/input";
import Button from "@components/button-component/button";
import Key from "@components/key-component/key";

export default function Vault() {
	const { data: keys, isLoading, isSuccess, isError, error } = useGetKeysQuery("");

	let content;

	if (isLoading) {
		content = <p>Loading...</p>;
	}

	if (isError) {
		console.log(error);
	}

	if (isSuccess) {
		const { ids } = keys;

		console.log(keys);

		const listContent = ids?.length
			? ids.map((keyId: any) => <Key key={keyId} keyId={keyId} />)
			: null;

		content = <>{listContent}</>;
	}

	return (
		<div className={styles.container}>
			<div className={styles.container__utilContainer}>
				<Input type="text" placeholder="Search..." />
				<Button text="New" color="primary" />
			</div>

			<div className={styles.container__keyList}>{content}</div>
		</div>
	);
}
