import { FullScreenLoader } from "@/components/ui/FullScreenLoader";
import React, { createContext, ReactNode, useContext, useState } from "react";

type LoadingContextType = {
	globalLoading: boolean;
	setGlobalLoading: (value: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
	const [globalLoading, setGlobalLoading] = useState(false);

	return (
		<LoadingContext.Provider value={{ globalLoading, setGlobalLoading }}>
			{globalLoading && <FullScreenLoader />}
			{/* {globalLoading && <HoneycombLoader />} */}
			{children}
		</LoadingContext.Provider>
	);
};

export const useLoading = () => {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error("useLoading must be used within a LoadingProvider");
	}
	return context;
};
