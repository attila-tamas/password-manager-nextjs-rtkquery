// styles
import styles from "./home.module.scss";
// next.js
import Image from "next/image";
import Link from "next/link";
// @public
import heroGraphic from "@public/homePageHeroGraphic.svg";
// @components
import { Button, Logo } from "@components/index";
// @util
import { pixelToRem } from "@util/index";

// page module for "/" route
export default function Home() {
	return (
		<main className={styles.container}>
			{/* nav starts */}
			<div className={styles.nav}>
				<Logo size={pixelToRem(24)} />

				<div className={styles.nav__buttonGroup}>
					<Link href="/login">
						<Button
							text="Sign in"
							color="primary"
							background={false}
						/>
					</Link>

					<Link href="/register">
						<Button text="Create account" color="primary" />
					</Link>
				</div>
			</div>
			{/* nav ends */}

			{/* hero starts */}
			<div className={styles.hero}>
				{/* hero text content starts */}
				<div className={styles.hero__textContainer}>
					<p className={styles.hero__textContainer__title}>
						Your password is the key to your digital life
					</p>

					<p className={styles.hero__textContainer__description}>
						Generate strong passwords with a click of a button.
						While&nbsp;managing them with an easy-to-use interface.
					</p>

					<div className={styles.hero__textContainer__buttonGroup}>
						<Link href="/register">
							<Button
								text="Try it now for free"
								color="primary"
								grow={true}
							/>
						</Link>

						<p
							className={
								styles.hero__textContainer__buttonGroup__smallText
							}
						>
							I have an account.
							<Link href="/login" className="interactable">
								{" "}
								Sign in
							</Link>
						</p>
					</div>
				</div>
				{/* hero text content ends */}

				<Image
					className={`unselectable ${styles.hero__image}`}
					src={heroGraphic}
					alt="Mobile and desktop device showing keystone vault"
				/>
			</div>
			{/* hero ends */}
		</main>
	);
}
