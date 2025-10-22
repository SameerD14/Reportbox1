// contexts/ImagePreviewContext.tsx
import ImagePreviewModel from "@/components/ImagePreviewModel";
import React, { createContext, useContext, useState } from "react";

type ImagePreviewContextType = {
	showImage: (imageUri: string) => void;
	hideImage: () => void;
};

const ImagePreviewContext = createContext<ImagePreviewContextType | null>(null);

export const ImagePreviewProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [visible, setVisible] = useState(false);
	const [imageUri, setImageUri] = useState<string | null>(null);

	const showImage = (uri: string) => {
		setImageUri(uri);
		setVisible(true);
	};

	const hideImage = () => {
		setVisible(false);
		setImageUri(null);
	};

	return (
		<ImagePreviewContext.Provider value={{ showImage, hideImage }}>
			{children}
			<ImagePreviewModel
				showImage={visible}
				setShowImage={setVisible}
				image={imageUri}
			/>
		</ImagePreviewContext.Provider>
	);
};

export const useImagePreview = () => {
	const context = useContext(ImagePreviewContext);
	if (!context) {
		throw new Error(
			"useImagePreview must be used within an ImagePreviewProvider"
		);
	}
	return context;
};
