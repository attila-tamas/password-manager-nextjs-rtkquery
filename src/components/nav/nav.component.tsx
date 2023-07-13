import styles from "./nav.module.scss";
// next
import Link from "next/link";
import { usePathname } from "next/navigation";
// @components
import { Icon, icons } from "@components/index";
// @util
import { capitalizeFirstLetter, pixelToEm } from "@util/index";

type NavLink = { name: string; href: string };

export default function Nav({ navLinks }: { navLinks: NavLink[] }) {
	const pathname = usePathname();

	function navItems() {
		return navLinks.map(link => {
			const isActive = pathname.startsWith(link.href);

			return (
				<Link
					className={`
						${styles["nav__item"]}
						${isActive && styles["nav__item--active"]}
					`}
					href={link.href}
					key={link.name}
				>
					<Icon
						icon={icons[link.name as keyof typeof icons]}
						size={pixelToEm(44)}
						className={styles["nav__item__icon"]}
					/>
					{capitalizeFirstLetter(link.name)}
				</Link>
			);
		});
	}

	return <div className={styles["nav"]}>{navItems()}</div>;
}
