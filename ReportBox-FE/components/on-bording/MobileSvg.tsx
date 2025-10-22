import { useAppTheme } from "@/hooks/useAppTheme";
import React from "react";
import { useWindowDimensions } from "react-native";
import Svg, { G, Path } from "react-native-svg";

const aspectRatio = 277 / 390;

interface MobileSvgProps {
	style?: object;
}

const MobileSvg = ({ style }: MobileSvgProps) => {
	const { width } = useWindowDimensions();
	const { primaryColor, secondaryColor } = useAppTheme();

	const svgHeight = width * aspectRatio;

	return (
		<Svg
			width={width}
			height={svgHeight}
			viewBox="0 0 390 100"
			style={[{ width: "100%", height: svgHeight }, style]}
		>
			<G transform="scale(-1,1) translate(-390,0)">
				<Path
					d="m-3 100c28.5-23.5 80-53.4 134-45 67.5 10.5 106 77.5 200.5 58 55.3-11.41 74.91-37.43 79.5-58.22v-19.78c1.34 5.23 1.68 12.16 0 19.78v108.1h-416.68z"
					fill={primaryColor}
				/>
				<Path
					d="m-.5 130c14-11.98 52.98-37.52 106.96-28.64 67.48 11.1 130.46 59.18 224.93 38.58 55.29-12.06 74.89-39.56 79.48-61.53v-20.91c1.34 5.53 1.68 12.85 0 20.91v130.09h-433.87z"
					fill={secondaryColor}
				/>
			</G>
		</Svg>
	);
};

export default MobileSvg;
