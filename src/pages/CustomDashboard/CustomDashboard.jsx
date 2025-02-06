import * as React from "react";
import { useEffect, useRef, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { CrossButton, PlusButton } from "../../assets/svg/SvgIndex";
import styles from "./Dashboard.module.scss";
import FullScreenPopup from "./FullScreenPopup";
import Widgets from "./Widgets";

const CustomDashboard = ({ customWidget, handleSaveLayout, customStyle, title }) => {
	const [layout, setLayout] = useState(customWidget?.layout);
	const [dashboardData, setDashboardData] = useState(customWidget);
	const [showUpdateButton, setShowUpdateButton] = useState(false); //for show save layout button

	//state to revert to original state if cancel edit
	const [backupDashboardData, setBackupDashboardData] = useState(customWidget);

	const [editable, setEditable] = useState(false);
	const [selectedWidgets, setSelectedWidgets] = useState(customWidget?.widgets.filter((widget) => widget.show) || []);

	//for update the grid width
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

	//manage widget
	const handleAddWidget = (widgetName) => {
		setDashboardData((prev) => {
			const updatedWidgets = prev.widgets.map((widget) => (widget.name === widgetName ? { ...widget, show: true } : widget));

			const newLayoutItem = {
				i: `box${updatedWidgets.length}`,
				x: 0,
				y: Infinity,
				w: 6,
				h: 8,
				isDraggable: true,
				isResizable: true,
			};

			const updatedLayout = [...layout, newLayoutItem];

			setLayout(updatedLayout);
			setSelectedWidgets(updatedWidgets.filter((widget) => widget.show)); // Update selectedWidgets based on `show`
			return { ...prev, widgets: updatedWidgets, layout: updatedLayout };
		});
	};

	// Remove widget from selectedWidgets and update dashboardData and layout
	const handleRemoveWidget = (widgetName) => {
		setDashboardData((prev) => {
			const updatedWidgets = prev.widgets.map((widget) => (widget.name === widgetName ? { ...widget, show: false } : widget));

			const updatedLayout = layout.filter((item, index) => {
				const correspondingWidget = prev.widgets[index];
				return correspondingWidget?.name !== widgetName || correspondingWidget.show; // Only keep widgets that are still shown
			});

			setLayout(updatedLayout);
			setSelectedWidgets(updatedWidgets.filter((widget) => widget.show)); // Update selectedWidgets based on `show`
			return { ...prev, widgets: updatedWidgets, layout: updatedLayout };
		});
	};

	//cancel edit
	const handleCancel = () => {
		setEditable(false);
		setDashboardData(backupDashboardData);
		setSelectedWidgets(backupDashboardData?.widgets);
		setLayout(backupDashboardData?.layout);
		setTimeout(() => {
			setShowUpdateButton(false);
		}, 100);
	};

	//save
	const handleSave = () => {
		setEditable(false);
		setShowUpdateButton(false);
		handleSaveLayout(dashboardData);
	};

	const [openInFullScreen, setOpenInFullScreen] = useState(false);
	const [selectedWidget, setSelectedWidget] = useState(null);

	const handleOpenFullScreen = (widgetComponent) => {
		setSelectedWidget(() => widgetComponent);
		setOpenInFullScreen(true);
	};

	useEffect(() => {
		setShowUpdateButton(false);
	}, []);

	return (
		<>
			{openInFullScreen && <FullScreenPopup {...{ setOpenInFullScreen, customStyle }} SelectedWidget={selectedWidget} />}
			<div
				// style={{ padding: padding }}
				style={customStyle?.dashboard}
				className={`${styles.Dashboard} ${customStyle.dashboardClass ? customStyle.dashboardClass : ""}`}
			>
				<div className={styles.Top}>
					<h2 style={customStyle?.title} className={`${customStyle.titleClass ? customStyle.titleClass : ""}`}>
						{title}
					</h2>
					<div className={styles.Buttons}>
						{!editable ? (
							<button
								onClick={() => setEditable(true)}
								style={customStyle?.manageButton}
								className={`${customStyle.manageButtonClass ? customStyle.manageButtonClass : ""}`}
							>
								Manage Widgets
							</button>
						) : (
							<button
								onClick={handleCancel}
								style={customStyle?.cancelButton}
								className={`${customStyle.cancelButtonClass ? customStyle.cancelButtonClass : ""}`}
							>
								Cancel
							</button>
						)}

						{showUpdateButton && (
							<>
								<button
									onClick={handleSave}
									style={customStyle?.cancelButton}
									className={`${customStyle.saveButtonClass ? customStyle.saveButtonClass : ""}`}
								>
									Save Layout
								</button>
							</>
						)}
					</div>
				</div>

				{/* Widget Buttons */}

				<>
					{editable && (
						<div className={styles.WidgetButtons}>
							{customWidget?.widgets?.map((item, index) => (
								<div key={index} className={styles.WidgetBtn}>
									<p>{item?.name}</p>
									{selectedWidgets.some((widget) => widget.name === item.name) ? (
										<span className={styles.CrossButton} onClick={() => handleRemoveWidget(item?.name)}>
											<img src={CrossButton} alt="Remove" title="Remove" />
										</span>
									) : (
										<span className={styles.Show} onClick={() => handleAddWidget(item?.name)}>
											<img src={PlusButton} alt="Add" title="Add" />
										</span>
									)}
								</div>
							))}
						</div>
					)}

					<div className={styles.Widgets} ref={dashboardRef}>
						{!dashboardData ? (
							<h2>Please create your dashboard By manage widgets</h2>
						) : (
							<GridLayout
								className="layout"
								layout={layout}
								cols={12}
								rowHeight={40}
								width={gridWidth}
								draggableHandle=".dragHandle"
								onLayoutChange={handleLayoutChange}
							>
								{selectedWidgets.map((widget, i) => (
									<div
										key={`box${i + 1}`}
										className={styles.gridItem}
										data-grid={{
											...layout[i],
											isDraggable: layout[i]?.isDraggable ?? true,
											isResizable: layout[i]?.isResizable ?? true,
											static: !layout[i]?.isDraggable && !layout[i]?.isResizable,
										}}
									>
										<Widgets
											item={widget}
											index={i}
											onWidgetStateChange={handleWidgetStateChange}
											CustomWidget={widget.component}
											handleOpenFullScreen={handleOpenFullScreen}
											customStyle={customStyle}
										/>
									</div>
								))}
							</GridLayout>
						)}
					</div>
				</>
			</div>
		</>
	);
};

export default CustomDashboard;
