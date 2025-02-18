# [Demo Website](https://pillar9-npm-demo.netlify.app/)

## Custom Widget

```bash
//your custom components
const CustomWidget1 = () => {
 return (
  <div>
   <h1>Lorem ipsum dolor sit amet.</h1>
   <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem neque vel voluptatibus cum accusamus? Nulla ullam rem ipsanihil labore.</h2>
   <button>Press Me</button>
  </div>
 );
};
const CustomWidget2 = () => {
 return (
  <div>
   <button>Press Me</button>
   <button>Click Me</button>
   <button>Test</button>
  </div>
 );
};
const CustomWidget3 = () => {
 return (
  <div>
   <h1>Lorem ipsum dolor sit amet.</h1>
   <h2>widget 3</h2>
   <button>Press Me</button>
  </div>
 );
};
const CustomWidget4 = () => {
	return (
		<div>
			<button>Widget 4</button>
			<button>Enter</button>
		</div>
	);
};
const CustomWidget5 = () => {
	return (
		<div>
			<h2>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem neque vel voluptatibus cum accusamus? Nulla ullam rem ipsa
				nihil labore.
			</h2>
		</div>
	);
};


// using react-icons for demo here you can add custom images or svg's
const existingMenu = [
	{
		name: "Collapse",
		item: <FaCaretSquareUp size={"20px"} color="red" />,
	},
	{
		name: "UnCollapse",
		item: <FaCaretSquareDown size={"20px"} color="green" />,
	},
	{
		name: "FullScreen",
		item: <SlSizeFullscreen size={"17px"} color="green" />,
	},
	{
		name: "CloseFullScreen",
		item: <AiOutlineFullscreenExit size={"20px"} color="green" />,
	},
	{
		name: "ThreeDot",
		item: <BsThreeDotsVertical size={"20px"} color="green" />,
	},
	{
		name: "LockMenu",
		item: (
			<>
				Lock
				<BsLockFill />
			</>
		),
	},
	{
		name: "UnlockMenu",
		item: (
			<>
				Unlock
				<BiSolidLockOpen />
			</>
		),
	},
	{
		name: "LockIcon",
		item: <BiLockAlt size={"20px"} color="red" />,
	},
];
const CustomHeader = {
	existingMenu,
	additionalMenu: [
		{
			name: "addMenu1",
			item: "L-Menu1",
			onClick: () => alert("C-Menu1 Clicked"),
		},
		{
			name: "addMenu2",
			item: "L-Menu2",
			onClick: () => console.log("C-Menu2 Clicked"),
		},
	],
};
const CustomHeader1 = {
	existingMenu,
	additionalMenu: [
		{
			name: "addMenu1",
			item: "S-Menu1",
			onClick: () => alert("Segment Menu1 Clicked"),
		},
		{
			name: "addMenu2",
			item: "S-Menu2",
			onClick: () => console.log("Segment Menu2 Clicked"),
		},
	],
};

const customWidget = {
	widgets: [
		{
			name: "ListAgent",
			isLocked: false,
			isCollapsed: false,
			show: true,
			showHeader: true,
			component: CustomWidget1,
			headerItems: CustomHeader,
		},
		{
			name: "Dimensions",
			isLocked: false,
			isCollapsed: false,
			show: true,
			showHeader: false,
			component: CustomWidget2,
			headerItems: CustomHeader,
		},
		{
			name: "Segments",
			isLocked: false,
			isCollapsed: false,
			show: true,
			showHeader: true,
			component: CustomWidget3,
			headerItems: CustomHeader1,
		},
		{
			name: "Time",
			isLocked: false,
			isCollapsed: false,
			show: true,
			showHeader: true,
			component: CustomWidget4,
			headerItems: CustomHeader,
		},
		{
			name: "Filter",
			isLocked: false,
			isCollapsed: false,
			show: true,
			showHeader: true,
			component: CustomWidget5,
			headerItems: CustomHeader,
		},
	],
	layout: [
		{
			i: "box1",
			x: 0,
			y: 0,
			w: 12,
			h: 13,
			isDraggable: true,
			isResizable: true,
		},
		{
			i: "box2",
			x: 0,
			y: 13,
			w: 6,
			h: 8,
			isDraggable: true,
			isResizable: true,
		},
		{
			i: "box3",
			x: 6,
			y: 13,
			w: 6,
			h: 8,
			isDraggable: true,
			isResizable: true,
		},
		{
			i: "box4",
			x: 0,
			y: 21,
			w: 6,
			h: 8,
			isDraggable: true,
			isResizable: true,
		},
		{
			i: "box5",
			x: 6,
			y: 21,
			w: 6,
			h: 8,
			isDraggable: true,
			isResizable: true,
		},
	],
};

	const customStyle = {
		title: {
			color: "blue",
		},
		titleClass: "YourClassName",
		cancelButton: {},
		cancelButtonClass: "YourClassName",
		saveButton: {},
		saveButtonClass: "YourClassName",
		manageButton: {},
		manageButtonClass: "YourClassName",
		dashboard: {
			backgroundColor: "#fff",
			padding: "2rem",
		},
		dashboardClass: "dashboardClass",
		widgetTitle: {
			fontSize: "1.2rem",
			color: "#444",
		},
		widgetTitleClass: "WidgetTitleClassName",
		headerStyle: {
			backgroundColor: "skyblue",
			color: "#000",
		},
		headerClass: "headerClass",
		fullScreenStyle: {
			backgroundColor: "#fff",
		},
		fullScreenClassName: "fullScreenClassName",
	};
	
const title = "Your Custom Title";

const buttonItems = {
	manageWidget: {
		item: "Manage Widgets",
	},
	cancelButton: {
		item: <MdOutlineCancel size={"20px"} color="red" />,
	},
	saveButton: {
		item: <IoSave size={"20px"} color="green" />,
	},
};

//do manage /save   layout here from data  from handleSaveLayout
const handleSaveLayout = (data) => {
	console.log(data);
};
```

## Import like this & use for custom dashboard

```bash
import { App } from "pillar9_user_package";

const Component = () => {
	return (
		<App
			type={"CustomDashboard"}
			customWidget={customWidget}
			handleSaveLayout={handleSaveLayout}
			title={title}
			customStyle={customStyle}
			buttonItems={buttonItems}
		/>
	);
};

export default Component;
```

```
##for style use like this
.CancelButton {
	background-color: rgba(241, 12, 43, 0.425) !important;
	padding: 0.6rem 1rem !important;
}

.SaveButton {
	background-color: rgb(29, 218, 70) !important;
}

```

# -----------------------------------

## Import like this & use for dashboard

```
const user = {
		_id: "6746dafcdcaf297ede0d9724",
		name: "New User",
		userName: "new3627",
		email: "new@gmail.com",
		profilePic:
			"https://firebasestorage.googleapis.com/v0/b/princecollege-b5027.appspot.com/o/Pilar9%2FUsers%20Profile%2FBeautiful%20blonde%20in%20black%20with%20hat%20on%20her%20had.png.png?alt=media&token=19824029-541f-48c1-b050-eef7366bcfb0",
		password: "$2a$08$OksjnFGV3YQC2q6UdS.cmercOTmybHL5laXRii4mqMjrAx9zTV9BG",
		isActive: true,
		isDeleted: false,
		createdAt: "2024-11-27T08:40:28.933Z",
		updatedAt: "2024-11-27T08:40:28.933Z",
		__v: 0,
	};
const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDZkYWZjZGNhZjI5N2VkZTBkOTcyNCIsImV4cCI6MTc2OTU3NzAyNCwiaWF0IjoxNzM4MDQxMDI0fQ.4VYJ1IvfsMWqzX9f46F0wnEZlTDkyelC6ts6BoPX05c";

const X_API_KEY = "Your own Api Key";
const API_BASE_URL = "https://pilar9-backend.vercel.app";

//dashboard
const defaultLayout = [
	{ i: "box1", x: 0, y: 0, w: 12, h: 8, isDraggable: true, isResizable: true },
	{ i: "box2", x: 0, y: 8, w: 6, h: 8, isDraggable: true, isResizable: true },
	{ i: "box3", x: 6, y: 8, w: 6, h: 8, isDraggable: true, isResizable: true },
	{ i: "box4", x: 0, y: 16, w: 8, h: 8, isDraggable: true, isResizable: true },
	{ i: "box5", x: 8, y: 16, w: 4, h: 8, isDraggable: true, isResizable: true },
];
const widgetButtons = ["ListAgent", "Dimensions", "Segments", "Time", "Filter"];
const padding = "2rem";

//data table (list agent)
const agentIdType = "RMAWANIR";
const defaultFields = ["UniqueID", "StandardStatus", "PropertyType", "UnparsedAddress", "City", "ListAgentMlsId"];

```

```
import { App } from "pillar9_user_package";

const Component = () => {
	return (
			<App
				token={token}
				user={user}
				X_API_KEY={X_API_KEY}
				API_BASE_URL={API_BASE_URL}
				type={"Dashboard"}
				defaultLayout={defaultLayout}
				widgetButtons={widgetButtons}
				padding={padding}
			/>
	);
};

export default Component;

```

## Import like this & use for Multi Dashboard

```
import { App } from "pillar9_user_package";

const Component = () => {
	return (
			<App
				token={token}
				user={user}
				X_API_KEY={X_API_KEY}
				API_BASE_URL={API_BASE_URL}
				type={"MultiDashboard"}
				defaultLayout={defaultLayout}
				widgetButtons={widgetButtons}
				padding={padding}
				agentIdType={agentIdType}
				defaultFields={defaultFields}
			/>
	);
};

export default Component;

```

## Import like this & use for Widget Requests

```
import { App } from "pillar9_user_package";

const Component = () => {
	return (
			<App
				token={token}
				user={user}
				X_API_KEY={X_API_KEY}
				API_BASE_URL={API_BASE_URL}
				type={"RequestWidget"}
				padding={padding}
			/>
	);
};

export default Component;

```

## Use this dependencies & devDependencies in your react vite code

```
"dependencies": {
		"react": "^18.3.1",
		"react-dom": "^18.3.1",
		"html2canvas": "^1.4.1",
		"jspdf": "^2.5.2",
		"jspdf-autotable": "^3.8.4",
		"react-csv": "^2.2.2",
		"react-grid-layout": "^1.5.0",
		"react-icons": "^5.3.0",
		"react-loader-spinner": "^6.1.6",
		"react-toastify": "^10.0.5",
		"sass": "^1.77.6",
		"sweetalert2": "^11.14.5"
	},

```
