type SortConfig = {
	key: string;
	direction: string;
} | null;

export type SortDirection = {
	[key: string]: string;
};

export const sortItems = <T>(items: T[], sortConfig: SortConfig): T[] => {
	if (!sortConfig) return items;

	const { key, direction } = sortConfig;

	return [...items].sort((a, b) => {
		const aValue = a[key as keyof T];
		const bValue = b[key as keyof T];

		if (aValue < bValue) {
			return direction === "asc" ? -1 : 1;
		}
		if (aValue > bValue) {
			return direction === "asc" ? 1 : -1;
		}
		return 0;
	});
};
