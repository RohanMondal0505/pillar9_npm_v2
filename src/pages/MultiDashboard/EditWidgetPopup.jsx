import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { CrossButton, PlusButton } from "../../assets/svg/SvgIndex";
import styles from "./AddWidgetPopup.module.scss";

const EditWidgetPopup = ({ setOpenEditPopup, widgetButtons, openedDashboard, setIsLoadingPopup, setOpenedDashboard, setDashboards }) => {
	const token = localStorage.getItem("Pilar9_Token_npm_ls");
	const baseUrl = localStorage.getItem("API_BASE_URL");

	const [title, setTitle] = useState(openedDashboard?.title || "");
	const [selectedWidgets, setSelectedWidgets] = useState(openedDashboard?.widgets || []);

	// Add widget to selectedWidgets
	const handleAddWidget = (widget) => {
		setSelectedWidgets((prev) => [...prev, { name: widget, isLocked: false, isCollapsed: false }]);
	};

	// Remove widget from selectedWidgets
	const handleRemoveWidget = (widgetName) => {
		setSelectedWidgets((prev) => prev.filter((widget) => widget.name !== widgetName));
	};

	const handleSaveChanges = async () => {
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
			const response = await fetch(`${baseUrl}/api/dashboard/update/${openedDashboard?._id}`, {
				method: "PUT",
				headers: {
					Authorization: `${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error("Error Updating Dashboard.");
			}

			const data = await response.json();

			setOpenEditPopup(false);
			setOpenedDashboard(data?.data);
			setDashboards((prevDashboards) => prevDashboards.map((dashboard) => (dashboard._id === data?.data?._id ? data?.data : dashboard)));

			toast.success(data?.message || "Dashboard Updated Successfully...");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoadingPopup(false);
		}
	};

	return (
		<div className={styles.AddWidgetPopup} onClick={() => setOpenEditPopup(false)}>
			<div className={styles.Wrapper} onClick={(e) => e.stopPropagation()}>
				<div className={styles.Top}>
					<div className={styles.Left}>
						<h2>Edit Dashboard</h2>
						<div className={styles.InputWrapper}>
							<label htmlFor="">title : </label>
							<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Dashboard Title" />
						</div>
					</div>
					<div className={styles.Right}>
						<button onClick={() => setOpenEditPopup(false)}>Discard</button>
						<button onClick={handleSaveChanges}>Save</button>
					</div>
				</div>

				{/* Widget Buttons */}
				<div className={styles.WidgetButtons}>
					{widgetButtons.map((item, index) => (
						<div key={index} className={styles.WidgetBtn}>
							<p>{item}</p>
							{selectedWidgets.some((widget) => widget.name === item) ? (
								<span className={styles.CrossButton} onClick={() => handleRemoveWidget(item)}>
									<img src={CrossButton} alt="Remove" title="Remove" />
								</span>
							) : (
								<span className={styles.Show} onClick={() => handleAddWidget(item)}>
									<img src={PlusButton} alt="Add" title="Add" />
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

export default EditWidgetPopup;
