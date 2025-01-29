import * as React from "react";
import DataTable from "../DataTable/DataTable";
import styles from "./FullScreenPopup.module.scss";

const FullScreenPopup = ({ isFullScreen, setIsFullScreen }) => {
	return (
		<div className={styles.FullScreenPopup}>
			<div className={styles.Wrapper}>
				<div className={styles.Top}>
					{isFullScreen?.name}
					<p onClick={() => setIsFullScreen(null)}>Close Full Screen</p>
				</div>

				<div className={styles.Contents}>{isFullScreen?.name === "ListAgent" ? <DataTable /> : isFullScreen?.name}</div>
			</div>
		</div>
	);
};

export default FullScreenPopup;
