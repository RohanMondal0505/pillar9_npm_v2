import * as React from "react";
import { useEffect, useRef, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { toast } from "react-toastify";
import EditWidgetPopup from "../MultiDashboard/EditWidgetPopup";
import styles from "./DynamicDashboard.module.scss";
import Widgets from "./Widgets";

const DynamicDashboard = ({
	openedDashboard,
	setOpenedDashboard,
	defaultLayout,
	widgetButtons,
	setIsLoadingPopup,
	setIsFullScreen,
	padding,
	setDashboards,
}) => {
	const token = localStorage.getItem("Pilar9_Token_npm_ls");
	const baseUrl = localStorage.getItem("API_BASE_URL");

	const [openEditPopup, setOpenEditPopup] = useState(false);
	const [showUpdateButton, setShowUpdateButton] = useState(false); //for show save layout button

	const [dashboardData, setDashboardData] = useState(openedDashboard);
	//grid
	const dashboardRef = useRef(null);

	const [gridWidth, setGridWidth] = useState(window.innerWidth);
	useEffect(() => {
		if (dashboardRef.current) {
			setGridWidth(dashboardRef.current.clientWidth);
		}

		const handleResize = () => {
			if (dashboardRef.current) {
				setGridWidth(dashboardRef.current.clientWidth);
			}
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [dashboardRef.current]);

	const [layout, setLayout] = useState(() => {
		const savedLayout = openedDashboard?.layout;
		return savedLayout ? savedLayout : defaultLayout;
	});

	const handleLayoutChange = (newLayout) => {
		setLayout(newLayout);
		setDashboardData((prev) => ({
			...prev,
			layout: newLayout,
		}));
		setShowUpdateButton(true);
	};

	const handleWidgetStateChange = (index, key, value) => {
		setDashboardData((prev) => {
			const updatedWidgets = prev.widgets.map((widget, i) => (i === index ? { ...widget, [key]: value } : { ...widget }));

			// Update layout immediately based on `isLocked`
			const updatedLayout = layout.map((item, i) => {
				if (i === index && key === "isLocked") {
					return {
						...item,
						isDraggable: !value, // Lock = not draggable
						isResizable: !value, // Lock = not resizable
					};
				}
				if (i === index && key === "isCollapsed") {
					return {
						...item,
						isResizable: !value,
						h: value ? 1 : 8,
					};
				}
				return item;
			});

			setLayout(updatedLayout);

			return { ...prev, widgets: updatedWidgets };
		});
	};

	const [updatingLayout, setUpdatingLayout] = useState(false);

	const handleSaveLayout = async () => {
		setUpdatingLayout(true);

		try {
			const response = await fetch(`${baseUrl}/api/dashboard/update/${dashboardData?._id}`, {
				method: "PUT",
				headers: {
					Authorization: `${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: dashboardData?.title,
					widgets: dashboardData?.widgets,
					layout: dashboardData?.layout,
				}),
			});

			if (!response.ok) {
				throw new Error("Error updating dashboard layout");
			}

			const data = await response.json();
			toast.success(data?.message || "Dashboard Updated Successfully...");

			setOpenedDashboard(data?.data);
			setDashboards((prevDashboards) => prevDashboards.map((dashboard) => (dashboard._id === data?.data?._id ? data?.data : dashboard)));
			setShowUpdateButton(false);
		} catch (error) {
			toast.error(error.message || "Error Updating Dashboard layout..");
		} finally {
			setUpdatingLayout(false);
		}
	};

	useEffect(() => {
		setDashboardData(openedDashboard);
		setLayout(openedDashboard?.layout);
		setShowUpdateButton(false);
	}, [openedDashboard]);

	return (
		<>
			{openEditPopup && (
				<EditWidgetPopup {...{ setOpenEditPopup, widgetButtons, openedDashboard, setIsLoadingPopup, setOpenedDashboard, setDashboards }} />
			)}

			<div className={styles.DynamicDashboard} style={{ padding: padding }}>
				<div className={styles.Top}>
					<h1>Title : {dashboardData?.title}</h1>

					<div className={styles.Buttons}>
						<button
							onClick={() => {
								setOpenedDashboard(null);
							}}
						>
							Back
						</button>
						<button onClick={() => setOpenEditPopup(true)}>Manage Widgets</button>
						{showUpdateButton && (
							<>{updatingLayout ? <button>Updating ....</button> : <button onClick={handleSaveLayout}>Save Layout</button>}</>
						)}
					</div>
				</div>

				<div className={styles.Widgets} ref={dashboardRef}>
					<GridLayout
						className="layout"
						layout={layout}
						cols={12}
						rowHeight={40}
						width={gridWidth}
						draggableHandle=".dragHandle"
						onLayoutChange={handleLayoutChange}
					>
						{dashboardData?.widgets?.map((widget, i) => (
							<div
								key={`box${i + 1}`}
								className={styles.gridItem}
								data-grid={{
									...layout[i],
									isDraggable: layout[i]?.isDraggable ?? true, // Default to true
									isResizable: layout[i]?.isResizable ?? true, // Default to true
									static: !layout[i]?.isDraggable && !layout[i]?.isResizable,
								}}
							>
								<Widgets item={widget} index={i} onWidgetStateChange={handleWidgetStateChange} setIsFullScreen={setIsFullScreen} />
							</div>
						))}
					</GridLayout>
				</div>
			</div>
		</>
	);
};

export default DynamicDashboard;
