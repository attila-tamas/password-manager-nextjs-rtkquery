export default function Error({ message }: { message: string }) {
	return (
		<>
			{message && (
				<span className="error" role="alert">
					{message}
				</span>
			)}
		</>
	);
}
