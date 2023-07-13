function createCookie(name: string, value: string): void {
	document.cookie = `${name}=${value}; SameSite=strict; Secure`;
}

function getCookie(key: string): string | undefined {
	const cookie = document.cookie.match(
		"(^|;)\\s*" + key + "\\s*=\\s*([^;]+)"
	);
	return cookie ? cookie.pop() : "";
}

function deleteCookies(): void {
	const cookies = document.cookie.split(";");

	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i];
		const eqPos = cookie.indexOf("=");
		const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;
		document.cookie =
			name +
			"=;SameSite=strict;Secure;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
}

function checkIfCookieExists(name: string): boolean {
	return document.cookie
		.split(";")
		.some(item => item.trim().startsWith(`${name}=`));
}

export { createCookie, getCookie, deleteCookies, checkIfCookieExists };
