import * as React from "react";
import { useState } from "react";
import { BiLockAlt, BiSolidLockOpen } from "react-icons/bi";
import { BsLockFill, BsThreeDotsVertical } from "react-icons/bs";
import { RiDragDropLine } from "react-icons/ri";
import DataTable from "../DataTable/DataTable";
import styles from "./Dashboard.module.scss";

const Widgets = ({ item, index, onWidgetStateChange, setIsFullScreen }) => {
	const [isCollapsed, setIsCollapsed] = useState(item.isCollapsed);
	const [isLocked, setIsLocked] = useState(item.isLocked);

	const [openLockMenu, setOpenLockMenu] = useState(false);

	const toggleMenu = (e) => {
		e.stopPropagation();
		setOpenLockMenu(!openLockMenu);
	};

	const handleLockUnlock = (status) => {
		setOpenLockMenu(false);
		setIsLocked(status);
		onWidgetStateChange(index, "isLocked", status);
	};

	const handleToggleCollapse = () => {
		setIsCollapsed((prev) => !prev);
		onWidgetStateChange(index, "isCollapsed", !isCollapsed);
	};

	//full screen popup

	const handleViewFullScreen = (data) => {
		setIsFullScreen(data);
	};
	return (
		<>
			<div className={styles.ActionButtons} onClick={() => setOpenLockMenu(false)}>
				<div className={styles.Left}>{item?.name}</div>
				<div className={styles.Right}>
					{isLocked && (
						<span>
							<BiLockAlt />
						</span>
					)}

					{!isLocked &&
						(isCollapsed ? <span onClick={handleToggleCollapse}>UnCollapse</span> : <span onClick={handleToggleCollapse}>Collapse</span>)}

					<span onClick={() => handleViewFullScreen(item)}>View Full Screen</span>
					{!isLocked && (
						<span className={`${styles.dragHandleButton} dragHandle`} style={{ cursor: "move" }}>
							<RiDragDropLine />
						</span>
					)}

					<span className={styles.Menu}>
						<BsThreeDotsVertical onClick={(e) => toggleMenu(e)} />

						{openLockMenu && (
							<ul className={styles.CustomMenu}>
								{isLocked ? (
									<li
										onClick={() => {
											handleLockUnlock(false);
											setOpenLockMenu(false);
										}}
									>
										<BiSolidLockOpen />
										Unlock
									</li>
								) : (
									<li
										onClick={() => {
											handleLockUnlock(true);
											setOpenLockMenu(false);
										}}
									>
										<BsLockFill />
										Lock
									</li>
								)}
							</ul>
						)}
					</span>
				</div>
			</div>
			<div className={`${styles.Content} ${isCollapsed ? styles.Collapse : ""}`} onClick={() => setOpenLockMenu(false)}>
				{item?.name === "ListAgent" ? <DataTable /> : <p style={{ margin: "auto" }}>{item?.name + ` widget`}</p>}
			</div>
		</>
	);
};

export default Widgets;
