import React from "react";
import styles from "./home.module.scss";
import Image from "next/image";
import graphic from "@/../public/home-page-graphic.svg";
import Logo from "@/components/logo-component/logo";
import Button from "@/components/button-component/button";

export default function Home() {
	return (
		<div className={styles.home}>
			<Logo width="130" />
			<Image className="unselectable" src={graphic} alt="Home page graphic" />
			<p className={styles.home__text}>Easy Password Management To Simplify Your Life</p>
			<Button text="Get started" type="success" />
			<p className={styles.home__text__small}>
				I have an account. <span className="link">Sign in</span>
			</p>
		</div>
	);
}
