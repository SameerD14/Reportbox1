import {
	Entypo,
	Feather,
	FontAwesome,
	FontAwesome5,
	FontAwesome6,
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import { Href } from "expo-router";
/* -------------------------------------------------------------------------- */
type LIST_TYPE = {
	label: string;
	icon: any;
	route?: Href;
}[];
/* -------------------------------------------------------------------------- */
export const STATUS_KEY = ["Raised", "Resolved", "Assigned", "In Progress"];
/* -------------------------------------------------------------------------- */
export const NOTIFICATION_TYPES = [
	"simple",
	"message_category",
	"email_actions",
	"customActions",
	"image",
	"complaint_update",
];
export const Dashboard_Categories: LIST_TYPE = [
	{
		label: "About",
		icon: <Ionicons name="information-circle" size={28} color="black" />,
		route: "/(protected)/settings/about",
	},
	{
		label: "Complaint",
		icon: (
			<MaterialCommunityIcons
				name="comment-alert-outline"
				size={28}
				color="#00F0FF"
			/>
		),
		route: "/(protected)/(tabs)/complaints/create",
	},
	{
		label: "Sanitation Module",
		icon: <FontAwesome6 name="broom-ball" size={24} color="#00F0FF" />,
		route: "/(protected)/(tabs)/complaints/type/sanitation",
	},
	{
		label: "Water & Sewerage",
		icon: <MaterialCommunityIcons name="pipe" size={28} color="#00F0FF" />,
		route: "/(protected)/(tabs)/complaints/type/water",
	},
	{
		label: "Health & Safety",
		icon: <FontAwesome5 name="first-aid" size={28} color="#00F0FF" />,
		route: "/(protected)/(tabs)/complaints/type/health",
	},
	{
		label: "Street & Infrastructure",
		icon: <MaterialIcons name="construction" size={28} color="#00F0FF" />,
		route: "/(protected)/(tabs)/complaints/type/street",
	},
	{
		label: "Animal Control",
		icon: <MaterialCommunityIcons name="paw" size={28} color="#00F0FF" />,
		route: "/(protected)/(tabs)/complaints/type/animal",
	},
	{
		label: "Emergency Contact",
		icon: (
			<MaterialIcons name="contact-emergency" size={24} color="black" />
		),
		route: {
			pathname: "/(protected)/(tabs)/complaints/contact/[id]",
			params: { id: "Emergency Contacts" },
		},
	},
	// {
	// 	label: "Green Waste",
	// 	icon: <MaterialCommunityIcons name="leaf" size={28} color="#00F0FF" />,
	// 	route: "/(protected)/(tabs)/complaints/type/green-waste",
	// },
	// {
	// 	label: "Public Works Dept",
	// 	icon: (
	// 		<MaterialCommunityIcons
	// 			name="hammer-screwdriver"
	// 			size={28}
	// 			color="#00F0FF"
	// 		/>
	// 	),
	// 	route: "/(protected)/(tabs)/complaints/type/works",
	// },
	// {
	// 	label: "C & D Waste",
	// 	icon: (
	// 		<MaterialCommunityIcons
	// 			name="dump-truck"
	// 			size={28}
	// 			color="#00F0FF"
	// 		/>
	// 	),
	// 	route: "/(protected)/(tabs)/complaints/type/c-d",
	// },
	// {
	// 	label: "Food Safety",
	// 	icon: (
	// 		<MaterialCommunityIcons
	// 			name="food-fork-drink"
	// 			size={28}
	// 			color="#00F0FF"
	// 		/>
	// 	),
	// 	route: "/(protected)/(tabs)/complaints/type/food-safety",
	// },
	// {
	// 	label: "IBUS Transport",
	// 	icon: (
	// 		<MaterialCommunityIcons name="bus-side" size={28} color="#00F0FF" />
	// 	),
	// 	route: "/(protected)/(tabs)/complaints/type/bus",
	// },
	// {
	// 	label: "Noise Pollution",
	// 	icon: (
	// 		<MaterialCommunityIcons
	// 			name="volume-high"
	// 			size={28}
	// 			color="#00F0FF"
	// 		/>
	// 	),
	// 	route: "/(protected)/(tabs)/complaints/type/noise",
	// },

	// {
	// 	label: "Environment & Recycling",
	// 	icon: (
	// 		<MaterialCommunityIcons name="recycle" size={28} color="#00F0FF" />
	// 	),
	// 	route: "/(protected)/(tabs)/complaints/type/env",
	// },
];

/* -------------------------------------------------------------------------- */

export const Sanitation_Categories: LIST_TYPE = [
	{
		label: "Garbage Clean",
		icon: <FontAwesome5 name="trash" size={20} color="#00F0FF" />,
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: { type: "Sanitation Module", subtype: "Garbage Clean" },
		},
	},
	{
		label: "Garbage van",
		icon: <MaterialCommunityIcons name="truck" size={22} color="#00F0FF" />,
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: { type: "Sanitation Module", subtype: "Garbage van" },
		},
	},
	{
		label: "Home Composting",
		icon: <MaterialIcons name="compost" size={22} color="#00F0FF" />,
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: { type: "Sanitation Module", subtype: "Home Composting" },
		},
	},
	{
		label: "Utensil Bank",
		icon: (
			<MaterialCommunityIcons
				name="silverware-fork-knife"
				size={22}
				color="#00F0FF"
			/>
		),
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: { type: "Sanitation Module", subtype: "Utensil Bank" },
		},
	},
	{
		label: "RRR (Reduce, Reuse, Recycle)",
		icon: (
			<MaterialCommunityIcons name="recycle" size={22} color="#00F0FF" />
		),
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: { type: "Sanitation Module", subtype: "RRR" },
		},
	},
	// {
	// 	label: "RRR Collection Point",
	// 	icon: <Entypo name="location" size={22} color="#00F0FF" />,
	// 	route: {
	// 		pathname: "/(protected)/(tabs)/complaints/create",
	// 		params: {
	// 			type: "Sanitation Module",
	// 			subtype: "RRR Collection Point",
	// 		},
	// 	},
	// },
	{
		label: "Yellow Spot",
		icon: (
			<MaterialCommunityIcons
				name="map-marker"
				size={22}
				color="#00F0FF"
			/>
		),
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: { type: "Sanitation Module", subtype: "Yellow Spot" },
		},
	},
	{
		label: "Red Spot",
		icon: (
			<MaterialCommunityIcons
				name="alert-circle"
				size={22}
				color="#00F0FF"
			/>
		),
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: { type: "Sanitation Module", subtype: "Red Spot" },
		},
	},
	{
		label: "Sanitation Activity",
		icon: <MaterialCommunityIcons name="broom" size={22} color="#00F0FF" />,
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: {
				type: "Sanitation Module",
				subtype: "Sanitation Activity",
			},
		},
	},
	{
		label: "Plastic Ban Helpline",
		icon: (
			<MaterialCommunityIcons
				name="smoking-off"
				size={22}
				color="#00F0FF"
			/>
		),
		route: {
			pathname: "/(protected)/(tabs)/complaints/contact/[id]",
			params: { id: "Plastic Ban Helpline" },
		},
	},
	{
		label: "Paid Sanitization",
		icon: (
			<MaterialCommunityIcons
				name="spray-bottle"
				size={22}
				color="#00F0FF"
			/>
		),
		route: {
			pathname: "/(protected)/(tabs)/complaints/contact/[id]",
			params: { id: "Paid Sanitization" },
		},
	},
	// {
	// 	label: 'Know Your "Waste"',
	// 	icon: (
	// 		<MaterialCommunityIcons
	// 			name="trash-can"
	// 			size={22}
	// 			color="#00F0FF"
	// 		/>
	// 	),
	// 	route: {
	// 		pathname: "/(protected)/(tabs)/complaints/create",
	// 		params: { type: "Sanitation Module", subtype: "Utensil Bank" },
	// 	},
	// },
];

/* -------------------------------------------------------------------------- */

export const Water_Sewage: LIST_TYPE = [
	{
		label: "Sewage Leak",
		icon: (
			<MaterialCommunityIcons
				name="pipe-leak"
				size={22}
				color="#00F0FF"
			/>
		),
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: { type: "Water & Sewerage", subtype: "Sewage Leak" },
		},
	},
	{
		label: "Storm Water Drains",
		icon: <Feather name="cloud-rain" size={22} color="#00F0FF" />,
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: { type: "Water & Sewerage", subtype: "Storm Water Drains" },
		},
	},
	{
		label: "Water Stagnation",
		icon: <FontAwesome5 name="water" size={22} color="#00F0FF" />,
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: { type: "Water & Sewerage", subtype: "Water Stagnation" },
		},
	},
	{
		label: "Water Dept",
		icon: <FontAwesome5 name="tint" size={22} color="#00F0FF" />,
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: { type: "Water & Sewerage", subtype: "Water Dept" },
		},
	},
	{
		label: "Sewerage & Drainage",
		icon: (
			<MaterialCommunityIcons
				name="water-pump"
				size={22}
				color="#00F0FF"
			/>
		),
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: {
				type: "Water & Sewerage",
				subtype: "Sewerage & Drainage",
			},
		},
	},
	{
		label: "Request for Water Harvesting",
		icon: <FontAwesome5 name="cloud" size={20} color="#00F0FF" />,
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: {
				type: "Water & Sewerage",
				subtype: "Request for Water Harvesting",
			},
		},
	},
	{
		label: "Treated Water Reuse Request",
		icon: <FontAwesome5 name="recycle" size={22} color="#00F0FF" />,
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: {
				type: "Water & Sewerage",
				subtype: "Treated Water Reuse Request",
			},
		},
	},
	{
		label: "Rainwater Harvesting Contractors List",
		icon: (
			<MaterialCommunityIcons
				name="weather-rainy"
				size={24}
				color="#00F0FF"
			/>
		),
		route: {
			pathname: "/(protected)/(tabs)/complaints/contact/[id]",
			params: { id: "Rainwater Harvesting Contractors" },
		},
	},
];

/* -------------------------------------------------------------------------- */

export const Health_Safety: LIST_TYPE = [
	{
		label: "Mosquito Menace",
		icon: <FontAwesome6 name="mosquito" size={22} color="#00F0FF" />,
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: {
				type: "Health & Safety",
				subtype: "Mosquito Menace",
			},
		},
	},
	{
		label: "Public Toilet",
		icon: <Ionicons name="people-outline" size={28} color="#00F0FF" />,
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: {
				type: "Health & Safety",
				subtype: "Mosquito Menace",
			},
		},
	},
	{
		label: "Health Dept",
		icon: (
			<MaterialCommunityIcons
				name="hospital-box-outline"
				size={22}
				color="#00F0FF"
			/>
		),
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: {
				type: "Health & Safety",
				subtype: "Mosquito Menace",
			},
		},
	},
	{
		label: "Paan, Gutkha, Spitting",
		icon: <MaterialIcons name="smoking-rooms" size={28} color="#00F0FF" />,
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: {
				type: "Health & Safety",
				subtype: "Paan, Gutkha, Spitting",
			},
		},
	},
	{
		label: "14420 Helpline",
		icon: <MaterialIcons name="phone-in-talk" size={24} color="#00F0FF" />,
		route: {
			pathname: "/(protected)/(tabs)/complaints/contact/[id]",
			params: {
				id: "14420 Helpline List",
			},
		},
	},
	{
		label: "SafaiMitra Safety Helpline",
		icon: <MaterialIcons name="security" size={24} color="#00F0FF" />,
		route: {
			pathname: "/(protected)/(tabs)/complaints/contact/[id]",
			params: {
				id: "SafaiMitra Safety Helpline",
			},
		},
	},
];
/* -------------------------------------------------------------------------- */
export const Street_Infrastructure = [
	{
		label: "Pothole",
		icon: <Ionicons name="warning-outline" size={28} color="#00F0FF" />,
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: {
				type: "Street & Infrastructure",
				subtype: "Pothole",
			},
		},
	},
	{
		label: "Street light",
		icon: (
			<MaterialCommunityIcons
				name="light-flood-up"
				size={28}
				color="#00F0FF"
			/>
		),
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: {
				type: "Street & Infrastructure",
				subtype: "Street light",
			},
		},
	},
	{
		label: "Tree Fallen",
		icon: <Entypo name="tree" size={28} color="#00F0FF" />,
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: {
				type: "Street & Infrastructure",
				subtype: "Tree Fallen",
			},
		},
	},

	{
		label: "Lighting Dept",
		icon: <Feather name="zap" size={28} color="#00F0FF" />,
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: {
				type: "Street & Infrastructure",
				subtype: "Lighting Dept",
			},
		},
	},
	{
		label: "C&D Waste Collection Point",
		icon: (
			<MaterialCommunityIcons
				name="dump-truck"
				size={24}
				color="#00F0FF"
			/>
		),
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: {
				type: "Street & Infrastructure",
				subtype: "C&D Waste Collection Point",
			},
		},
	},

	{
		label: "PNG Gas Pipeline Request",
		icon: <MaterialCommunityIcons name="pipe" size={24} color="#00F0FF" />,
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: {
				type: "Street & Infrastructure",
				subtype: "PNG Gas Pipeline Request",
			},
		},
	},
	{
		label: "Horticulture",
		icon: (
			<MaterialCommunityIcons name="flower" size={28} color="#00F0FF" />
		),
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: {
				type: "Street & Infrastructure",
				subtype: "Horticulture",
			},
		},
	},
];
/* -------------------------------------------------------------------------- */
export const Animal_Control = [
	{
		label: "Street Dogs",
		icon: (
			<MaterialCommunityIcons name="dog-side" size={28} color="#00F0FF" />
		),
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: {
				type: "Animal Control",
				subtype: "Street Dogs",
			},
		},
	},

	{
		label: "Stray Animals",
		icon: <MaterialCommunityIcons name="cow" size={28} color="#00F0FF" />,
		route: {
			pathname: "/(protected)/(tabs)/complaints/create",
			params: {
				type: "Animal Control",
				subtype: "Stray Animals",
			},
		},
	},
];
/* -------------------------------------------------------------------------- */
export const Housing_Welfare = [
	{
		label: "PM Awas Yojana",
		icon: <FontAwesome5 name="home" size={22} color="#00F0FF" />,
	},
	{
		label: "Consumer Complaints",
		icon: <FontAwesome name="rupee" size={22} color="#00F0FF" />,
	},
];
/* -------------------------------------------------------------------------- */
export const complaintTypes = [
	{
		label: "Sanitation Module",
		icon: "broom-ball",
		iconType: "FontAwesome6",
		categories: [
			{ label: "Green Waste", icon: "leaf", iconType: "FontAwesome5" },
			{ label: "Garbage Clean", icon: "trash", iconType: "FontAwesome5" },
			{
				label: "Garbage van",
				icon: "truck",
				iconType: "MaterialCommunityIcons",
			},
			{
				label: "Home Composting",
				icon: "recycle",
				iconType: "FontAwesome5",
			},
			{
				label: "Utensil Bank",
				icon: "utensils",
				iconType: "FontAwesome5",
			},
			{ label: "RRR", icon: "recycle", iconType: "FontAwesome5" },
			{
				label: "RRR Collection Point",
				icon: "warehouse",
				iconType: "FontAwesome5",
			},
			{
				label: "Yellow Spot",
				icon: "dot-circle-o",
				iconType: "FontAwesome",
			},
			{
				label: "Red Spot",
				icon: "exclamation-circle",
				iconType: "FontAwesome",
			},
			{
				label: "Swachhata Activity",
				icon: "broom",
				iconType: "MaterialCommunityIcons",
			},
			{
				label: "Plastic Ban Helpline",
				icon: "ban",
				iconType: "FontAwesome",
			},
			{
				label: "Paid Sanitization",
				icon: "spray-bottle",
				iconType: "MaterialCommunityIcons",
			},
			{
				label: "Know your Garbage",
				icon: "info-circle",
				iconType: "FontAwesome",
			},
		],
	},
	{
		label: "Water & Sewerage",
		icon: "pipe",
		iconType: "MaterialCommunityIcons",
		categories: [
			{
				label: "Sewage Leak",
				icon: "pipe-leak",
				iconType: "MaterialCommunityIcons",
			},
			{
				label: "Storm Water Drains",
				icon: "cloud-rain",
				iconType: "Feather",
			},
			{
				label: "Water Stagnation",
				icon: "water",
				iconType: "FontAwesome5",
			},
			{ label: "Water Dept", icon: "tint", iconType: "FontAwesome5" },
			{
				label: "C&D Collection Point",
				icon: "dump-truck",
				iconType: "MaterialCommunityIcons",
			},
			{
				label: "Request for Water Harvesting",
				icon: "water-check",
				iconType: "MaterialCommunityIcons",
			},
			{
				label: "Treated Water Reuse",
				icon: "water-sync",
				iconType: "MaterialCommunityIcons",
			},
			{
				label: "PNG Gas Pipeline Installation",
				icon: "gas-cylinder",
				iconType: "MaterialCommunityIcons",
			},
		],
	},
	{
		label: "Health & Safety",
		icon: "first-aid",
		iconType: "FontAwesome5",
		categories: [
			{
				label: "Mosquito Menace",
				icon: "mosquito",
				iconType: "FontAwesome6",
			},
			{
				label: "Public Toilet",
				icon: "people-outline",
				iconType: "Ionicons",
			},
			{
				label: "Health Dept",
				icon: "hospital-box-outline",
				iconType: "MaterialCommunityIcons",
			},
			{
				label: "Noise Pollution",
				icon: "volume-high",
				iconType: "Ionicons",
			},
			{
				label: "Food Safety",
				icon: "utensils",
				iconType: "FontAwesome5",
			},
			{
				label: "14420 Helpline",
				icon: "phone-in-talk",
				iconType: "MaterialIcons",
			},
			{
				label: "Safaimitra Helpline",
				icon: "account-heart",
				iconType: "MaterialCommunityIcons",
			},
		],
	},
	{
		label: "Street & Infrastructure",
		icon: "construction",
		iconType: "MaterialIcons",
		categories: [
			{ label: "Pothole", icon: "warning-outline", iconType: "Ionicons" },
			{
				label: "Street light",
				icon: "light-flood-up",
				iconType: "MaterialCommunityIcons",
			},
			{ label: "Tree Fallen", icon: "tree", iconType: "Entypo" },
			{ label: "Lighting Dept", icon: "zap", iconType: "Feather" },
			{
				label: "Public Works Dept",
				icon: "building",
				iconType: "FontAwesome",
			},
			{ label: "PM Awas Yojana", icon: "home", iconType: "FontAwesome5" },
			{ label: "ibus", icon: "bus", iconType: "FontAwesome" },
		],
	},
	{
		label: "Animal Control",
		icon: "paw",
		iconType: "MaterialCommunityIcons",
		categories: [
			{
				label: "Street Dogs",
				icon: "dog-side",
				iconType: "MaterialCommunityIcons",
			},
			{
				label: "Stray Animals",
				icon: "cow",
				iconType: "MaterialCommunityIcons",
			},
		],
	},
	{
		label: "Other Complaints",
		icon: "dots-three-horizontal",
		iconType: "Entypo",
		categories: [
			{
				label: "Consumer Complaints",
				icon: "rupee",
				iconType: "FontAwesome",
			},
			{
				label: "Paan, Gutkha, Spitting",
				icon: "smoking-rooms",
				iconType: "MaterialIcons",
			},
			{
				label: "Environment",
				icon: "earth-europe",
				iconType: "FontAwesome6",
			},
			{ label: "Recycling", icon: "recycle", iconType: "FontAwesome5" },
		],
	},
];

/* -------------------------------------------------------------------------- */

export const contactLists: any = {
	"Emergency Contacts": [
		{
			label: "Mayor Helpline",
			icon: <MaterialIcons name="record-voice-over" size={20} />,
			phone: "1800123456",
		},
		{
			label: "Nagar Nigam",
			icon: <FontAwesome name="building" size={20} />,
			phone: "1800654321",
		},
		{
			label: "Fire Department",
			icon: <MaterialIcons name="local-fire-department" size={20} />,
			phone: "101",
		},
		{
			label: "Police Control Room",
			icon: <FontAwesome name="shield" size={20} />,
			phone: "100",
		},
		{
			label: "Ambulance",
			icon: <FontAwesome name="ambulance" size={20} />,
			phone: "102",
		},
		{
			label: "Electricity Emergency",
			icon: <MaterialIcons name="bolt" size={20} />,
			phone: "1912",
		},
	],
	"Plastic Ban Helpline": [
		{
			label: "Ramesh Kumar",
			icon: <MaterialIcons name="delete-forever" size={20} />,
			phone: "1800100111",
		},
		{
			label: "Sita Sharma",
			icon: <MaterialIcons name="delete-forever" size={20} />,
			phone: "1800100122",
		},
		{
			label: "Amit Patel",
			icon: <MaterialIcons name="delete-forever" size={20} />,
			phone: "1800100133",
		},
		{
			label: "Pooja Singh",
			icon: <MaterialIcons name="delete-forever" size={20} />,
			phone: "1800100144",
		},
		{
			label: "Vikram Yadav",
			icon: <MaterialIcons name="delete-forever" size={20} />,
			phone: "1800100155",
		},
		{
			label: "Neha Joshi",
			icon: <MaterialIcons name="delete-forever" size={20} />,
			phone: "1800100166",
		},
		{
			label: "Rohit Mehta",
			icon: <MaterialIcons name="delete-forever" size={20} />,
			phone: "1800100177",
		},
		{
			label: "Anjali Desai",
			icon: <MaterialIcons name="delete-forever" size={20} />,
			phone: "1800100188",
		},
		{
			label: "Suresh Rao",
			icon: <MaterialIcons name="delete-forever" size={20} />,
			phone: "1800100199",
		},
		{
			label: "Kavita Nair",
			icon: <MaterialIcons name="delete-forever" size={20} />,
			phone: "1800100100",
		},
	],
	"Paid Sanitization": [
		{
			label: "Rajesh Kumar",
			icon: <MaterialIcons name="cleaning-services" size={20} />,
			phone: "1800200111",
		},
		{
			label: "Sunita Sharma",
			icon: <MaterialIcons name="cleaning-services" size={20} />,
			phone: "1800200122",
		},
		{
			label: "Manoj Patel",
			icon: <MaterialIcons name="cleaning-services" size={20} />,
			phone: "1800200133",
		},
		{
			label: "Preeti Singh",
			icon: <MaterialIcons name="cleaning-services" size={20} />,
			phone: "1800200144",
		},
		{
			label: "Vivek Yadav",
			icon: <MaterialIcons name="cleaning-services" size={20} />,
			phone: "1800200155",
		},
		{
			label: "Rina Joshi",
			icon: <MaterialIcons name="cleaning-services" size={20} />,
			phone: "1800200166",
		},
		{
			label: "Sanjay Mehta",
			icon: <MaterialIcons name="cleaning-services" size={20} />,
			phone: "1800200177",
		},
		{
			label: "Asha Desai",
			icon: <MaterialIcons name="cleaning-services" size={20} />,
			phone: "1800200188",
		},
		{
			label: "Deepak Rao",
			icon: <MaterialIcons name="cleaning-services" size={20} />,
			phone: "1800200199",
		},
		{
			label: "Neelam Nair",
			icon: <MaterialIcons name="cleaning-services" size={20} />,
			phone: "1800200100",
		},
	],
	"Rainwater Harvesting Contractors": [
		{
			label: "Rohan Singh",
			icon: <MaterialIcons name="water-drop" size={20} />,
			phone: "1800300111",
		},
		{
			label: "Meera Sharma",
			icon: <MaterialIcons name="water-drop" size={20} />,
			phone: "1800300122",
		},
		{
			label: "Aakash Patel",
			icon: <MaterialIcons name="water-drop" size={20} />,
			phone: "1800300133",
		},
		{
			label: "Priya Verma",
			icon: <MaterialIcons name="water-drop" size={20} />,
			phone: "1800300144",
		},
		{
			label: "Sandeep Yadav",
			icon: <MaterialIcons name="water-drop" size={20} />,
			phone: "1800300155",
		},
		{
			label: "Divya Joshi",
			icon: <MaterialIcons name="water-drop" size={20} />,
			phone: "1800300166",
		},
		{
			label: "Amit Mehta",
			icon: <MaterialIcons name="water-drop" size={20} />,
			phone: "1800300177",
		},
		{
			label: "Ritu Desai",
			icon: <MaterialIcons name="water-drop" size={20} />,
			phone: "1800300188",
		},
		{
			label: "Kiran Rao",
			icon: <MaterialIcons name="water-drop" size={20} />,
			phone: "1800300199",
		},
		{
			label: "Sonal Nair",
			icon: <MaterialIcons name="water-drop" size={20} />,
			phone: "1800300100",
		},
	],
	"14420 Helpline List": [
		{
			label: "Vikas Kumar",
			icon: <MaterialIcons name="support-agent" size={20} />,
			phone: "144200111",
		},
		{
			label: "Rekha Sharma",
			icon: <MaterialIcons name="support-agent" size={20} />,
			phone: "144200122",
		},
		{
			label: "Amit Joshi",
			icon: <MaterialIcons name="support-agent" size={20} />,
			phone: "144200133",
		},
		{
			label: "Neha Singh",
			icon: <MaterialIcons name="support-agent" size={20} />,
			phone: "144200144",
		},
		{
			label: "Suresh Yadav",
			icon: <MaterialIcons name="support-agent" size={20} />,
			phone: "144200155",
		},
		{
			label: "Anjali Mehta",
			icon: <MaterialIcons name="support-agent" size={20} />,
			phone: "144200166",
		},
		{
			label: "Rohit Desai",
			icon: <MaterialIcons name="support-agent" size={20} />,
			phone: "144200177",
		},
		{
			label: "Pooja Rao",
			icon: <MaterialIcons name="support-agent" size={20} />,
			phone: "144200188",
		},
		{
			label: "Manish Nair",
			icon: <MaterialIcons name="support-agent" size={20} />,
			phone: "144200199",
		},
		{
			label: "Divya Verma",
			icon: <MaterialIcons name="support-agent" size={20} />,
			phone: "144200100",
		},
	],
	"SafaiMitra Safety Helpline": [
		{
			label: "Ramesh Singh",
			icon: <MaterialIcons name="security" size={20} />,
			phone: "1800400111",
		},
		{
			label: "Seema Sharma",
			icon: <MaterialIcons name="security" size={20} />,
			phone: "1800400122",
		},
		{
			label: "Amit Kumar",
			icon: <MaterialIcons name="security" size={20} />,
			phone: "1800400133",
		},
		{
			label: "Pooja Mehta",
			icon: <MaterialIcons name="security" size={20} />,
			phone: "1800400144",
		},
		{
			label: "Vikram Rao",
			icon: <MaterialIcons name="security" size={20} />,
			phone: "1800400155",
		},
		{
			label: "Neha Joshi",
			icon: <MaterialIcons name="security" size={20} />,
			phone: "1800400166",
		},
		{
			label: "Sanjay Patel",
			icon: <MaterialIcons name="security" size={20} />,
			phone: "1800400177",
		},
		{
			label: "Anjali Desai",
			icon: <MaterialIcons name="security" size={20} />,
			phone: "1800400188",
		},
		{
			label: "Deepak Yadav",
			icon: <MaterialIcons name="security" size={20} />,
			phone: "1800400199",
		},
		{
			label: "Kavita Nair",
			icon: <MaterialIcons name="security" size={20} />,
			phone: "1800400100",
		},
	],
};
