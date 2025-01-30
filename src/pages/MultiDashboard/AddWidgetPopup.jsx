import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { CrossButton, PlusButton } from "../../assets/svg/SvgIndex";
import styles from "./AddWidgetPopup.module.scss";

const AddWidgetPopup = ({ setOpenAddWidgetPopup, title, setTitle, widgetButtons, setIsLoadingPopup, setDashboards, dashboards }) => {
	const token = localStorage.getItem("Pilar9_Token_npm_ls");
	const baseUrl = localStorage.getItem("API_BASE_URL");
	const [selectedWidgets, setSelectedWidgets] = useState([]);

	// Add widget to selectedWidgets
	const handleAddWidget = (widget) => {
		setSelectedWidgets((prev) => [...prev, { name: widget, isLocked: false, isCollapsed: false }]);
	};

	// Remove widget from selectedWidgets
	const handleRemoveWidget = (widgetName) => {
		setSelectedWidgets((prev) => prev.filter((widget) => widget.name !== widgetName));
	};

	const handleBuildChart = async () => {
		if (!title.trim()) {
			toast.error("Please provide a title for the dashboard.");
			return;
		}

		const layout = selectedWidgets.map((_, index) => ({
			i: `box${index + 1}`,
			x: (index % 2) * 6,
			y: Math.floor(index / 2) * 8,
			w: 6,
			h: 8,
		}));

		const payload = {
			title,
			widgets: selectedWidgets,
			layout,
		};

		setIsLoadingPopup(true);

		try {
			const response = await fetch(`${baseUrl}/api/dashboard/create`, {
				method: "POST",
				headers: {
					Authorization: `${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error("Error Adding Dashboard..");
			}

			const data = await response.json();

			setTitle("");
			setOpenAddWidgetPopup(false);
			setDashboards([...dashboards, data?.data]);
			toast.success(data?.success || "Dashboard created successfully..");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoadingPopup(false);
		}
	};

	return (
		<div className={styles.AddWidgetPopup} onClick={() => setOpenAddWidgetPopup(false)}>
			<div className={styles.Wrapper} onClick={(e) => e.stopPropagation()}>
				<div className={styles.Top}>
					<div className={styles.Left}>
						<h2>Title of the Dashboard</h2>
						<p>{title}</p>
					</div>
					<div className={styles.Right}>
						<button onClick={() => setOpenAddWidgetPopup(false)}>Discard</button>
						<button onClick={handleBuildChart}>Build</button>
					</div>
				</div>

				{/* Widget Buttons */}
				<div className={styles.WidgetButtons}>
					{widgetButtons.map((item, index) => (
						<div key={index} className={styles.WidgetBtn}>
							<p>{item}</p>
							{selectedWidgets.some((widget) => widget.name === item) ? (
								<span className={styles.CrossButton} onClick={() => handleRemoveWidget(item)}>
									<img src={CrossButton} alt=" " height={"100%"} width={"100%"} title="Remove" loading="lazy" />
								</span>
							) : (
								<span className={styles.Show} onClick={() => handleAddWidget(item)}>
									<img src={PlusButton} alt=" " height={"100%"} width={"100%"} title="Add" loading="lazy" />
								</span>
							)}
						</div>
					))}
				</div>

				{/* Selected Widgets */}
				<div className={styles.AllWidgets}>
					{selectedWidgets.map((widget, i) => (
						<div key={i} className={styles.WidgetBox}>
							{widget.name} Widget
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default AddWidgetPopup;
