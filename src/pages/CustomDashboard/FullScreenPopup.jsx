import * as React from "react";
import styles from "./FullScreenPopup.module.scss";

const FullScreenPopup = ({ setOpenInFullScreen, SelectedWidget, customStyle, CustomHeader }) => {
	const closeFullScreenMenu = CustomHeader?.existingMenu?.find((menu) => menu.name === "CloseFullScreen");
	return (
		<div className={styles.FullScreenPopup}>
			<div
				style={customStyle?.fullScreenStyle}
				className={`${styles.Wrapper} ${customStyle.fullScreenClassName ? customStyle.fullScreenClassName : ""}`}
			>
				<div className={styles.Top}>
					{/* {isFullScreen?.name} */}
					<p onClick={() => setOpenInFullScreen(false)}>{closeFullScreenMenu?.item || "Close Full Screen"}</p>
				</div>

				<div className={styles.Contents}>
					<SelectedWidget />
				</div>
			</div>
		</div>
	);
};

export default FullScreenPopup;
