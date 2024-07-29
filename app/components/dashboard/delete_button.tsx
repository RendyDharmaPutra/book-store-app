import { useNavigation } from "@remix-run/react";

export default function FormDeleteButton(): JSX.Element {
	const { state } = useNavigation();
	const pending = state != "idle";

	return (
		<button type="submit" disabled={pending} aria-disabled={pending}>
			{pending ? "Menghapus..." : "Hapus"}
		</button>
	);
}
