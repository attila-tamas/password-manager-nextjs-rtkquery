import React from "react";
import styles from "./input.module.scss";

export default function Input({ type, placeholder }: any) {
	return <input type={type} placeholder={placeholder} className={styles.input} />;
}
