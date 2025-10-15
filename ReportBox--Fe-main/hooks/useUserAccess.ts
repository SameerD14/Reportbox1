import { useAuth } from "@/contexts/AuthContext";
import { useMemo } from "react";

export function useUserAccess() {
	const { user } = useAuth();

	return useMemo(() => {
		if (!user) {
			return {
				hasRight: () => false,
			};
		}

		const groups = user.groups || [];
		const rights = user.rights || [];

		const isSuperAdmin = groups.includes("Super Admin");

		return {
			hasRight: (rightName: string) => {
				if (isSuperAdmin) return true; // full access
				return rights.includes(rightName);
			},
			isSuperAdmin,
		};
	}, [user]);
}
