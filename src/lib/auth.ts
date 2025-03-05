"use client";

import { auth } from "@/server/auth/firebase-client";
import { api } from "@/trpc/react";
import { useEffect } from "react";

export function useUser() {
	const user = api.auth.me.useQuery();

	useEffect(() => {
		auth.onAuthStateChanged((_u) => {
			user.refetch();
		});
	}, [user.refetch]);

	return {
		user: user.isError ? null : user.data,
		refetch: user.refetch,
		isLoading: !user.isError && user.isLoading,
	};
}
