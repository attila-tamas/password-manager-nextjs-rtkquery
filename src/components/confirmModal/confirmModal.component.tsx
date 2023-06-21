// styles
import styles from "./confirmModal.module.scss";
// @components
import Button from "@components/button/button.component";

export default function ConfirmModal({ title, desc, confirmText, show, onClick }: any) {
	return (
		<div className={styles.container}>
			<p className={styles.title}>{title}</p>
			<p className={styles.desc}>{desc}</p>

			<div className={styles.buttonGroup}>
				<span onClick={() => show(false)}>
					<Button text="Cancel" background={false} flex={true} />
				</span>

				<div className={styles.buttonGroup__separator}>&nbsp;</div>

				<span>
					<Button
						onClick={onClick}
						text={confirmText}
						color="danger"
						background={false}
						flex={true}
						type="submit"
					/>
				</span>
			</div>
		</div>
	);
}
