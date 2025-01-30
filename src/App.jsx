import React, { lazy, Suspense, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import styles from "./assets/scss/Styles.module.scss";
import "./assets/scss/index.scss";
import LoadingPopup from "./components/Loading/LoadingPopup.jsx";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator.jsx";
import FullScreenPopup from "./pages/DynamicDashboard/FullScreenPopup.jsx";
import RequestWidget from "./pages/RequestWidget/RequestWidget.jsx";

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard.jsx"));

const App = ({
	token,
	user,
	X_API_KEY,
	API_BASE_URL,
	type = "Dashboard",
	defaultLayout,
	widgetButtons,
	userId,
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
				{type === "Dashboard" && (
					<div className={styles.Wrapper}>
						{isLoadingPopup && <LoadingPopup />}
						{isFullScreen && <FullScreenPopup {...{ isFullScreen, setIsFullScreen }} />}
						<Suspense fallback={<LoadingIndicator />}>
							<div className={styles.MainWrapper}>
								<Dashboard
									{...{
										defaultLayout,
										widgetButtons,
										userId,
										setIsLoadingPopup,
										setIsFullScreen,
										padding,
									}}
								/>
							</div>
						</Suspense>
					</div>
				)}
				{type === "RequestWidget" && (
					<div className={styles.Wrapper}>
						{isLoadingPopup && <LoadingPopup />}

						<Suspense fallback={<LoadingIndicator />}>
							<div className={styles.MainWrapper}>
								<RequestWidget {...{ setIsLoadingPopup, email: user.email }} />
							</div>
						</Suspense>
					</div>
				)}
			</>
		);
};

export { App };
