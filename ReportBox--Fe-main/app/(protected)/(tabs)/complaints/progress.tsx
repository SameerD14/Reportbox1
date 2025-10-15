import Blob from "@/components/on-bording/blob";
import Loader from "@/components/ui/Loader";
import WebViewComponent from "@/components/WebViewComponent";
import { useAuth } from "@/contexts/AuthContext";
import { useImagePreview } from "@/contexts/ImagePreviewContext";
import { useLoading } from "@/contexts/LoadingContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { getComplaintsByUserID } from "@/services/complaint.service";
import { LegendList } from "@legendapp/list";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Pressable, RefreshControl, Text, View } from "react-native";

// Function to generate ApexChart HTML with dynamic progress
const getChartHtml1 = (progress: any) => `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
      <style>
           body, html, #chart {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: transparent;
        }
        #chart {
            position: absolute;
            top: 0;
            left: 0;
        }
        </style>
    </head>
    <body>
      <div id="chart"></div>
      <script>
        var options = {
          chart: { type: 'radialBar',  height: 250,sparkline: { enabled: true }, animations: { enabled: true } },
          series: [${progress}],
          plotOptions: {
            radialBar: {
              hollow: { size: '45%' },
              track: { background: '#e6e6e6' },
              dataLabels: {
                name: { show: false },
                value: { show: true, fontSize: '28px', fontWeight: 'bold', color: '#ccc', offsetY: 8 }
              }
            }
          },
          colors: ['#00eeff'],
          labels: ['Progress']
        };
        new ApexCharts(document.querySelector("#chart"), options).render();
      </script>
    </body>
  </html>
`;
/* -------------------------------------------------------------------------- */
const getChartHtml = (progress: any) => `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
      <style>
           body, html, #chart {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: transparent;
        }
        #chart {
            position: absolute;
            top: 0;
            left: 0;
        }
      </style>
    </head>
    <body>
      <div id="chart"></div>
      <script>
        var options = {
          chart: { 
            type: 'radialBar',  
            height: 250,
            sparkline: { enabled: true }, 
            animations: { enabled: true },
            toolbar: { show: false }
          },
          series: [${progress}],
          plotOptions: {
            radialBar: {
              hollow: { size: '45%' },
              track: { background: '#e6e6e6' },
              dataLabels: {
                name: { show: false },
                value: { 
                  show: true, 
                  fontSize: '28px', 
                  fontWeight: 'bold', 
                  color: '#ccc', 
                  offsetY: 8 
                }
              }
            }
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "light",
              type: "vertical",
              gradientToColors: ["#0099ff"], 
              stops: [0, 100]
            }
          },
          tooltip: {
            enabled: false,
            y: {
              formatter: function (val) {
                return val + "% Completed";
              }
            }
          },
          colors: ['#00eeff'],
          labels: ['Progress']
        };
        new ApexCharts(document.querySelector("#chart"), options).render();
      </script>
    </body>
  </html>
`;
/* -------------------------------------------------------------------------- */
const getProgressFromStatus = (status: string) => {
	switch (status) {
		case "Raised":
			return 25;
		case "Assigned":
			return 50;
		case "In Progress":
			return 75;
		case "Resolved":
			return 100;

		default:
			return 0;
	}
};
/* -------------------------------------------------------------------------- */
const MyComplaintsScreen = () => {
	const { user } = useAuth();
	const isFocused = useIsFocused();
	const { setGlobalLoading } = useLoading();
	const { showImage } = useImagePreview();
	const { primaryColor, secondaryColor, cardsColor, textColor } =
		useAppTheme();
	/* -------------------------------------------------------------------------- */
	const [loading, setLoading] = useState(true);
	const [complaints, setComplaints] = useState<any[]>([]);
	const [refreshing, setRefreshing] = useState(false);

	/* -------------------------------------------------------------------------- */
	const fetchComplaints = async () => {
		try {
			const res = await getComplaintsByUserID(user?.user?._id);
			const filteredComplaints = (res.complaints ?? []).filter(
				(item: any) => item.status !== "Resolved"
			);

			setComplaints(filteredComplaints);
		} catch (error) {
			console.error("Error fetching complaints:", error);
		} finally {
			setLoading(false);
		}
	};
	const onRefresh = async () => {
		try {
			setRefreshing(true);
			await fetchComplaints(); // your API call
		} catch (error) {
			console.error("Error refreshing complaints:", error);
		} finally {
			setRefreshing(false);
		}
	};

	/* -------------------------------------------------------------------------- */
	useEffect(() => {
		fetchComplaints();
	}, []);

	useEffect(() => {
		setGlobalLoading(false);
	}, [isFocused]);

	if (loading) {
		return <Loader />;
	}
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: secondaryColor,
				paddingHorizontal: 6,
				paddingVertical: 6,
				marginTop: 100,
			}}
		>
			<LegendList
				data={complaints}
				recycleItems
				keyExtractor={(item: any) => item._id}
				renderItem={({ item }) => {
					const progress = getProgressFromStatus(item.status);
					const statusTimeline = item.statusTimeline ?? [item.status];

					return (
						<View className="mb-6">
							{/* Chart + Timeline Row */}
							<View className="flex-row justify-between mb-4">
								{/* Donut Chart */}
								<View
									className="rounded-xl w-[48%] items-center justify-center"
									style={{ backgroundColor: cardsColor }}
								>
									<View
										style={{
											width: 180,
											height: 160,
											borderRadius: 10,
											overflow: "hidden",
										}}
									>
										<WebViewComponent
											htmlcontent={getChartHtml(progress)}
											setLoaded={() => {}}
										/>
									</View>
									<Text
										className="mt-2 text-center font-semibold text-sm"
										style={{ color: textColor }}
									>
										Complaint ID:
									</Text>
									<Text
										className="text-center font-bold text-sm mb-4"
										style={{ color: textColor }}
									>
										#{item?.cid}
									</Text>
								</View>

								{/* Status Timeline */}
								<View
									className="rounded-xl p-4 w-[48%]"
									style={{ backgroundColor: cardsColor }}
								>
									<Text
										className="font-semibold mb-2"
										style={{ color: primaryColor }}
									>
										Status Timeline
									</Text>
									{statusTimeline.map(
										(step: string, idx: number) => (
											<Text
												key={idx}
												className="mb-1"
												style={{ color: textColor }}
											>
												✓ {step}
											</Text>
										)
									)}
									<Text style={{ color: textColor }}>
										Estimated Resolution: 2 days
									</Text>
								</View>
							</View>

							{/* Complaint Details */}
							<View
								className="rounded-xl p-4 flex-row"
								style={{ backgroundColor: cardsColor }}
							>
								<View className="flex-1 pr-3">
									<Text
										className="font-semibold mb-2"
										style={{ color: primaryColor }}
									>
										Details
									</Text>
									<Text style={{ color: textColor }}>
										Type: {item?.type}
									</Text>
									<Text style={{ color: textColor }}>
										Date:{" "}
										{new Date(
											item?.raisedDate
										).toLocaleDateString()}
									</Text>
									<Text style={{ color: textColor }}>
										Location: {item?.location}
									</Text>
									<Text style={{ color: textColor }}>
										Mode: {item?.mode ?? "App"}
									</Text>
								</View>

								{item?.beforeImage && (
									<Pressable
										className="rounded-md mr-3"
										onPress={() =>
											showImage(item?.beforeImage)
										}
									>
										<Image
											source={{ uri: item.beforeImage }}
											className="rounded-md"
											resizeMode="cover"
											style={{
												width: 70,
												height: 70,
												borderRadius: 8,
											}}
										/>
									</Pressable>
								)}
							</View>
						</View>
					);
				}}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					marginTop: 20,
					padding: 6,
					paddingBottom: 100,
				}}
				automaticallyAdjustKeyboardInsets
				keyboardShouldPersistTaps={"handled"}
				ListEmptyComponent={
					<View
						style={{
							flex: 1,
							backgroundColor: secondaryColor,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Blob
							text={"No Complaint !"}
							iconName={"newspaper-sharp"}
						/>
					</View>
				}
				refreshControl={
					<RefreshControl
						colors={[primaryColor, textColor]}
						refreshing={refreshing}
						onRefresh={onRefresh}
						progressBackgroundColor={secondaryColor}
					/>
				}
			/>
		</View>
	);
};

export default MyComplaintsScreen;
