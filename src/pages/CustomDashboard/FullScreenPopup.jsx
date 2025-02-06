import * as React from "react";
import styles from "./FullScreenPopup.module.scss";

const FullScreenPopup = ({ setOpenInFullScreen, SelectedWidget, customStyle }) => {
	return (
		<div className={styles.FullScreenPopup}>
			<div
				style={customStyle?.fullScreenStyle}
				className={`${styles.Wrapper} ${customStyle.fullScreenClassName ? customStyle.fullScreenClassName : ""}`}
			>
				<div className={styles.Top}>
					{/* {isFullScreen?.name} */}
					<p onClick={() => setOpenInFullScreen(false)}>Close Full Screen</p>
				</div>

				<div className={styles.Contents}>
					<SelectedWidget />
				</div>
			</div>
		</div>
	);
};

export default FullScreenPopup;
