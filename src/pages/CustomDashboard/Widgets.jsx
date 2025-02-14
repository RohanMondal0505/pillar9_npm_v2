import * as React from "react";
import { useState } from "react";
import { BiLockAlt, BiSolidLockOpen } from "react-icons/bi";
import { BsLockFill, BsThreeDotsVertical } from "react-icons/bs";
import styles from "./Dashboard.module.scss";

const Widgets = ({ item, index, onWidgetStateChange, clickedWidget, handleOpenFullScreen, customStyle, CustomHeader }) => {
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

	const handleMouseDown = (e) => {
		if (e.target.classList.contains("NoDrag")) alert("hello");
		if (["BUTTON", "A"].includes(e.target.tagName) || e.target.classList.contains("NoDrag")) {
			e.stopPropagation();
		}
	};

	//custom Menu
	const collapseMenu = CustomHeader?.existingMenu?.find((menu) => menu.name === "Collapse");
	const unCollapseMenu = CustomHeader?.existingMenu?.find((menu) => menu.name === "UnCollapse");
	const fullScreenMenu = CustomHeader?.existingMenu?.find((menu) => menu.name === "FullScreen");
	const LockMenu = CustomHeader?.existingMenu?.find((menu) => menu.name === "LockMenu");
	const UnlockMenu = CustomHeader?.existingMenu?.find((menu) => menu.name === "UnlockMenu");
	const LockIcon = CustomHeader?.existingMenu?.find((menu) => menu.name === "LockIcon");
	const threeDotIcon = CustomHeader?.existingMenu?.find((menu) => menu.name === "ThreeDot");
	return (
		<>
			{item?.showHeader && (
				<div
					className={`${styles.ActionButtons} ${customStyle.widgetTitleClass ? customStyle.widgetTitleClass : ""} `}
					style={customStyle?.widgetTitle}
					onClick={() => setOpenLockMenu(false)}
					onMouseDown={handleMouseDown}
				>
					<div className={`${styles.Left} dragHandle`}>{item?.name}</div>
					<div className={`${styles.Right}`}>
						{CustomHeader?.additionalMenu?.map((menu, k) => (
							<span onClick={menu.onClick} key={k}>
								{menu?.item}
							</span>
						))}
						{isLocked && <span>{LockIcon?.item || <BiLockAlt />}</span>}

						{!isLocked &&
							(isCollapsed ? (
								<span onClick={handleToggleCollapse}>{unCollapseMenu?.item || "UnCollapse"}</span>
							) : (
								<span onClick={handleToggleCollapse}>{collapseMenu?.item || "Collapse"}</span>
							))}

						<span onClick={() => handleOpenFullScreen(clickedWidget)}>{fullScreenMenu?.item || "View Full Screen"}</span>
						{/* {!isLocked && (
						<span className={`${styles.dragHandleButton} dragHandle`} style={{ cursor: "move" }}>
							<RiDragDropLine />
						</span>
					)} */}

						<span className={styles.Menu}>
							<i onClick={(e) => toggleMenu(e)}>{threeDotIcon?.item || <BsThreeDotsVertical />}</i>

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
											{UnlockMenu?.item || (
												<>
													<BiSolidLockOpen />
													Unlock
												</>
											)}
										</li>
									) : (
										<li
											onClick={() => {
												handleLockUnlock(true);
												setOpenLockMenu(false);
											}}
										>
											{LockMenu?.item || (
												<>
													<BsLockFill />
													Lock
												</>
											)}
										</li>
									)}
								</ul>
							)}
						</span>
					</div>
				</div>
			)}

			<div
				className={`${styles.Content} ${isCollapsed ? styles.Collapse : ""} ${item?.showHeader ? "" : "dragHandle"}`}
				onClick={() => setOpenLockMenu(false)}
				onMouseDown={handleMouseDown}
			>
				{clickedWidget && <clickedWidget.component />}
			</div>
		</>
	);
};

export default Widgets;
