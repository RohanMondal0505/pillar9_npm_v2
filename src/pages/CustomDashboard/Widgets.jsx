import * as React from "react";
import { useState } from "react";
import { BiLockAlt, BiSolidLockOpen } from "react-icons/bi";
import { BsLockFill, BsThreeDotsVertical } from "react-icons/bs";
import { RiDragDropLine } from "react-icons/ri";
import styles from "./Dashboard.module.scss";

const Widgets = ({ item, index, onWidgetStateChange, CustomWidget, handleOpenFullScreen, customStyle }) => {
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

	return (
		<>
			<div
				style={customStyle?.widgetTitle}
				className={`${styles.ActionButtons} ${customStyle.widgetTitleClass ? customStyle.widgetTitleClass : ""}`}
				onClick={() => setOpenLockMenu(false)}
			>
				<div className={styles.Left}>{item?.name}</div>
				<div className={styles.Right}>
					{isLocked && (
						<span>
							<BiLockAlt />
						</span>
					)}

					{!isLocked &&
						(isCollapsed ? <span onClick={handleToggleCollapse}>UnCollapse</span> : <span onClick={handleToggleCollapse}>Collapse</span>)}

					<span onClick={() => handleOpenFullScreen(CustomWidget)}>View Full Screen</span>
					{!isLocked && (
						<span className={`${styles.dragHandleButton} dragHandle`} style={{ cursor: "move" }}>
							<RiDragDropLine />
						</span>
					)}

					<span className={styles.Menu}>
						<BsThreeDotsVertical onClick={(e) => toggleMenu(e)} />

						{/* Custom dropdown menu */}
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
				{CustomWidget && <CustomWidget />}
			</div>
		</>
	);
};

export default Widgets;
