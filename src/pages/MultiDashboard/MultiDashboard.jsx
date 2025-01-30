import * as React from "react";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { useDeleteAlert } from "../../components/Hooks/UseDeleteAlert";
import { formatTimestamp } from "../../components/utils/HelperFunctions";
import AddWidgetPopup from "./AddWidgetPopup";
import DashboardTitlePopup from "./DashboardTitlePopup";
import DynamicDashboard from "./DynamicDashboard";
import styles from "./MultiDashboard.module.scss";

const MultiDashboard = ({ setIsLoadingPopup, padding, userId, defaultLayout, widgetButtons, setIsFullScreen }) => {
	const [openTitlePopup, setOpenTitlePopup] = useState(false);
	const [title, setTitle] = useState("");
	const [openAddWidgetPopup, setOpenAddWidgetPopup] = useState(false);
	const [dashboards, setDashboards] = useState([]);

	const [openedDashboard, setOpenedDashboard] = useState(null);

	const token = localStorage.getItem("Pilar9_Token_npm_ls");
	const baseUrl = localStorage.getItem("API_BASE_URL");

	const handleOpenView = (data) => {
		setOpenedDashboard(data);
	};

	//get all dashboards of user
	useEffect(() => {
		setIsLoadingPopup(true);

		const fetchDashboardData = async () => {
			try {
				const response = await fetch(`${baseUrl}/api/dashboard/user/${userId}`, {
					method: "GET",
					headers: {
						Authorization: `${token}`,
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error("Error fetching dashboard data");
				}

				const data = await response.json();
				setDashboards(data?.data);
				console.log(data?.data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setIsLoadingPopup(false);
			}
		};

		fetchDashboardData();
	}, []);

	//delete dashboard

	const handleDelete = async (id) => {
		let isConfirmed = await useDeleteAlert();
		if (!isConfirmed) return;

		setIsLoadingPopup(true);

		try {
			const response = await fetch(`${baseUrl}/api/dashboard/delete/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `${token}`,
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("Error deleting dashboard");
			}

			const data = await response.json();
			toast.success(data?.message || "Dashboard removed successfully...");

			// Update state by removing the deleted dashboard
			setDashboards((prevDashboards) => prevDashboards.filter((dashboard) => dashboard._id !== id));
		} catch (error) {
			toast.error(error.message || "Error deleting dashboard....");
		} finally {
			setIsLoadingPopup(false);
		}
	};

	return (
		<>
			{openTitlePopup && <DashboardTitlePopup {...{ setOpenTitlePopup, setOpenAddWidgetPopup, title, setTitle, dashboards }} />}
			{openAddWidgetPopup && (
				<AddWidgetPopup {...{ setOpenAddWidgetPopup, title, setTitle, widgetButtons, setIsLoadingPopup, setDashboards, dashboards }} />
			)}

			{openedDashboard && (
				<DynamicDashboard
					{...{
						openedDashboard,
						setOpenedDashboard,
						defaultLayout,
						widgetButtons,
						userId,
						setIsLoadingPopup,
						setIsFullScreen,
						padding,
						setDashboards,
					}}
				/>
			)}

			<div className={styles.MultiDashboardNew} style={{ padding: padding }}>
				<div className={styles.Top}>
					<div className={styles.Left}>
						<h2>Build Your Dashboard</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur. Tellus risus ut massa quis vitae viverra aenean. Sapien in amet amet velit congue.
							Interdum id in libero placerat malesuada. Vel aliquam scelerisque ut .
						</p>
					</div>
					<button onClick={() => setOpenTitlePopup(true)}>Create Your Dashboard</button>
				</div>

				<div className={styles.Bottom}>
					<div className={styles.SavedDashboards}>
						{dashboards?.map((item, index) => (
							<div className={styles.DashboardCard} key={index}>
								<div className={styles.TopSection}>
									<div className={styles.Left}>
										<h3>{item?.title}</h3>
										<p>{formatTimestamp(item?.createdAt)}</p>
									</div>
									<span onClick={() => handleDelete(item?._id)} style={{ cursor: "pointer" }}>
										<MdDeleteForever size={"1.25rem"} color="red" />
									</span>
									<button onClick={() => handleOpenView(item)}>View</button>
								</div>
								<div className={styles.Image}>
									<img
										src={
											"https://firebasestorage.googleapis.com/v0/b/file-upload-demo-213de.appspot.com/o/Pilar9%2FDashboardDemo.png?alt=media&token=842d2a46-7d24-4ddb-9b9b-0623a0814fd9"
										}
										alt=""
										height={"100%"}
										width={"100%"}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default MultiDashboard;
