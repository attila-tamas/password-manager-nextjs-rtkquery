// styles
import styles from "./home.module.scss";
// react
import { useState } from "react";
// next
import Image from "next/image";
import Link from "next/link";
// @hooks
import { useEffectOnUpdate, useMatchMedia } from "@hooks/index";
// @public
import homePageGraphicDark from "@public/homePageGraphicDark.svg";
import homePageGraphicLight from "@public/homePageGraphicLight.svg";
// @components
import { Button, Logo } from "@components/index";
// @util
import { pixelToRem } from "@util/index";

// page module for "/" route
export default function Home() {
	const [imageSrc, setImageSrc] = useState(homePageGraphicLight);

	const prefersDark = useMatchMedia("(prefers-color-scheme: dark)", false);

	useEffectOnUpdate(() => {
		if (prefersDark) setImageSrc(homePageGraphicDark);
		else setImageSrc(homePageGraphicLight);
	}, [prefersDark]);

	return (
		<div className={styles["wrapper"]}>
			<div className={styles["home-module"]}>
				<div className={styles["nav"]}>
					<Logo size={pixelToRem(24)} />

					<div className={styles["nav__buttons"]}>
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

				<div className={styles["hero"]}>
					<div className={styles["hero__text"]}>
						<p className={styles["hero__text__title"]}>
							Your password is the key to your digital life
						</p>

						<p className={styles["hero__text__description"]}>
							Generate strong passwords with a click of a button.
							While&nbsp;managing them with an easy-to-use
							interface.
						</p>

						<div className={styles["hero__text__buttons"]}>
							<Link href="/register">
								<Button
									text="Try it now for free"
									color="primary"
									grow={true}
								/>
							</Link>

							<p className={styles["hero__text__buttons__hint"]}>
								I have an account.
								<Link href="/login" className="interactable">
									{" "}
									Sign in
								</Link>
							</p>
						</div>
					</div>

					<Image
						className={`unselectable ${styles.hero__image}`}
						src={imageSrc}
						alt="Mobile and desktop device showing keystone vault"
					/>
				</div>
			</div>
		</div>
	);
}
