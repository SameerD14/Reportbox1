export const getStatusStyle = (status: string) => {
	switch (status) {
		case "Raised":
			return {
				backgroundColor: "#f97316", // orange-500
				color: "#fff",
			};
		case "Assigned":
			return {
				backgroundColor: "#3b82f6", // blue-500
				color: "#fff",
			};
		case "In Progress":
			return {
				backgroundColor: "#facc15", // yellow-400
				color: "#000",
			};
		case "Resolved":
			return {
				backgroundColor: "#10b981", // green-500
				color: "#fff",
			};
		default:
			return {
				backgroundColor: "#6b7280", // gray
				color: "#fff",
			};
	}
};
export const formatCreatedAtTime = (dateString: string) => {
	if (!dateString) return "-";

	const date = new Date(dateString);

	// Check if date is valid
	if (isNaN(date.getTime())) return "-";

	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffSec = Math.floor(diffMs / 1000);
	const diffMin = Math.floor(diffSec / 60);
	const diffHr = Math.floor(diffMin / 60);
	const diffDay = Math.floor(diffHr / 24);

	if (diffSec < 60) return `${diffSec}s`;
	if (diffMin < 60) return `${diffMin}m`;
	if (diffHr < 24) return `${diffHr}h`;
	if (diffDay < 7) return `${diffDay}d`;

	// same year => "Aug 8"
	if (now.getFullYear() === date.getFullYear()) {
		return date.toLocaleDateString(undefined, {
			month: "short",
			day: "numeric",
		});
	}

	// previous years => "Aug 8, 2024"
	return date.toLocaleDateString(undefined, {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
};
export const formateDate = (dateString: string) => {
	if (!dateString) return "-";

	const date = new Date(dateString);

	// Check if date is valid
	if (isNaN(date.getTime())) return "-";
	return new Date(dateString).toLocaleString(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};
