/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "icon.horse",
				port: "",
				pathname: "/icon/**",
			},
		],
	},
};

module.exports = nextConfig;
