const publicRoutes = {
	home: "/",
	login: "/login",
	register: "/register",
	requestPasswordChange: "/request-password-change",
	changePassword: "/change-password",
};

const protectedRoutes = {
	verifyEmail: "/verify-email",
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
