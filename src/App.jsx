// import * as React from "react";
import ls from "localstorage-slim";
import React, { lazy, Suspense, useEffect, useState } from "react";
// import { Provider, useSelector } from "react-redux";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./assets/scss/Styles.module.scss";
import "./assets/scss/index.scss";
import axios from "./components/Hooks/axios.jsx";
import LoadingPopup from "./components/Loading/LoadingPopup.jsx";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator.jsx";
import FullScreenPopup from "./pages/DynamicDashboard/FullScreenPopup.jsx";
// import store from "./redux/store";

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard.jsx"));
// const MultiDashboard = lazy(() => import("./pages/MultiDashboard/MultiDashboard.jsx"));
// const RequestWidget = lazy(() => import("./pages/RequestWidget/RequestWidget.jsx"));
// const DynamicDashboard = lazy(() => import("./pages/DynamicDashboard/DynamicDashboard.jsx"));

const App = ({
	token,
	user,
	X_API_KEY,
	API_BASE_URL,
	type = "Dashboard",
	innerWidthPercentage,
	defaultLayout,
	widgetButtons,
	userId,
	padding,
}) => {
	const [isLoadingPopup, setIsLoadingPopup] = useState(false);
	const [isFullScreen, setIsFullScreen] = useState(false);

	useEffect(() => {
		if (!token) {
			toast.warn("Token is Required...");
			return;
		}
		ls.set("Pilar9_Token_npm_ls", token);
		ls.set("Pillar9_user_npm_ls", user);
		ls.set("X_API_KEY", X_API_KEY);
		ls.set("API_BASE_URL", API_BASE_URL);
		axios.defaults.headers.Authorization = token;
	}, [token, user, ls.get("Pilar9_Token_npm_ls")]);

	if (ls.get("Pilar9_Token_npm_ls"))
		return (
			<>
				{type === "Dashboard" ? (
					<div className={styles.Wrapper}>
						{isLoadingPopup && <LoadingPopup />}
						{isFullScreen && <FullScreenPopup {...{ isFullScreen, setIsFullScreen }} />}
						<Suspense fallback={<LoadingIndicator />}>
							<div className={styles.MainWrapper}>
								<Dashboard
									{...{
										defaultLayout,
										widgetButtons,
										innerWidthPercentage,
										userId,
										setIsLoadingPopup,
										setIsFullScreen,
										padding,
									}}
								/>
							</div>
						</Suspense>
					</div>
				) : (
					// <Provider store={store}>
					// 	<ToastContainer
					// 		position="top-center"
					// 		autoClose={3000}
					// 		limit={4}
					// 		hideProgressBar={false}
					// 		newestOnTop={false}
					// 		rtl={false}
					// 		pauseOnFocusLoss={false}
					// 		draggable={false}
					// 		pauseOnHover
					// 	/>

					// 	<Wrapper {...{ type }} />
						// </Provider>
						<div></div>
				)}
			</>
		);
};

export { App };

// const Wrapper = ({ type }) => {
// 	const { openWidgetInFullScreen } = useSelector((state) => state.widget);
// 	const { openLoadingPopup } = useSelector((state) => state.temp);
// 	const [isLoadingPopup, setIsLoadingPopup] = useState(false);

// 	return (
// 		<div className={styles.Wrapper}>
// 			{(openLoadingPopup || isLoadingPopup) && <LoadingPopup />}
// 			{openWidgetInFullScreen && <FullScreenPopup />}
// 			<Suspense fallback={<LoadingIndicator />}>
// 				<div className={styles.MainWrapper}>
// 					{type === "MultiDashboard" && <MultiDashboard />}
// 					{type === "RequestWidget" && <RequestWidget />}
// 					{type === "DynamicDashboard" && <DynamicDashboard />}
// 				</div>
// 			</Suspense>
// 		</div>
// 	);
// };
