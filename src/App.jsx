import React, { lazy, Suspense, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import styles from "./assets/scss/Styles.module.scss";
import "./assets/scss/index.scss";
import LoadingPopup from "./components/Loading/LoadingPopup.jsx";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator.jsx";
import FullScreenPopup from "./pages/MultiDashboard/FullScreenPopup.jsx";
import MultiDashboard from "./pages/MultiDashboard/MultiDashboard.jsx";
import RequestWidget from "./pages/RequestWidget/RequestWidget.jsx";
import { ToastContainer } from "react-toastify";

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard.jsx"));

const App = ({
	token,
	user,
	X_API_KEY,
	API_BASE_URL,
	type = "Dashboard",
	defaultLayout,
	widgetButtons,
	padding,
	agentIdType,
	defaultFields,
}) => {
	const [isLoadingPopup, setIsLoadingPopup] = useState(false);
	const [isFullScreen, setIsFullScreen] = useState(false);

	useEffect(() => {
		if (!token) {
			toast.warn("Token is Required...");
			return;
		}
		// Store token & user in localStorage
		localStorage.setItem("Pilar9_Token_npm_ls", token);
		localStorage.setItem("Pillar9_user_npm_ls", JSON.stringify(user));
		localStorage.setItem("X_API_KEY", X_API_KEY);
		localStorage.setItem("API_BASE_URL", API_BASE_URL);
		localStorage.setItem("agentIdType", agentIdType);
		localStorage.setItem("defaultFields", JSON.stringify(defaultFields));
	}, [token, user]);

	if (token)
		return (
			<>
				<ToastContainer
					position="top-center"
					autoClose={3000}
					limit={4}
					hideProgressBar={false}
					newestOnTop={false}
					rtl={false}
					pauseOnFocusLoss={false}
					draggable={false}
					pauseOnHover
				/>
				<div className={styles.Wrapper}>
					{isLoadingPopup && <LoadingPopup />}
					{isFullScreen && <FullScreenPopup {...{ isFullScreen, setIsFullScreen }} />}
					<Suspense fallback={<LoadingIndicator />}>
						<div className={styles.MainWrapper}>
							{type === "Dashboard" && (
								<Dashboard
									{...{
										defaultLayout,
										widgetButtons,
										userId: user._id,
										setIsLoadingPopup,
										setIsFullScreen,
										padding,
									}}
								/>
							)}

							{type === "RequestWidget" && <RequestWidget {...{ setIsLoadingPopup, email: user.email }} />}
							{type === "MultiDashboard" && (
								<MultiDashboard
									{...{
										setIsLoadingPopup,
										padding,
										userId: user._id,
										defaultLayout,
										widgetButtons,
										setIsFullScreen,
									}}
								/>
							)}
						</div>
					</Suspense>
				</div>
			</>
		);
};

export { App };
