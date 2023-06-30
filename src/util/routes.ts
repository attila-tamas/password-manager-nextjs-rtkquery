const publicRoutes = {
	home: "/",
	login: "/login",
	register: "/register",
	verifyEmail: "/verify-email",
};

const protectedRoutes = {
	vault: "/vault",
	generate: "/generate",
	account: "/account",
};

const routes = {
	...publicRoutes,
	...protectedRoutes,
};

const navLinks = [
	{ name: "vault", href: protectedRoutes.vault },
	{ name: "generate", href: protectedRoutes.generate },
	{ name: "account", href: protectedRoutes.account },
];

export { publicRoutes, protectedRoutes, routes, navLinks };
