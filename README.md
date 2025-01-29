# Demo variables

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

	const X_API_KEY = "tOKMV0hOEK3B8vrsjVk9B2TWpRgOKTyT2f7C6qT0";
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
	const userId = "6746dafcdcaf297ede0d9724";
	const padding = "2rem";
```

```
import ls from "localstorage-slim"; // import this

<!--  login time set this value -->
ls.set("Pilar9_Token_npm_ls", token);
ls.set("Pillar9_user_npm_ls", user);
ls.set("X_API_KEY", X_API_KEY);
ls.set("API_BASE_URL", API_BASE_URL);

```

# Import like this & use

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
				userId={userId}
				padding={padding}
			/>
	);
};

export default Component;

```

# Use this dependencies & devDependencies in your react vite code

```
"dependencies": {
		"react": "^18.3.1",
		"react-dom": "^18.3.1",
		"@vitejs/plugin-react-swc": "^3.7.1",
		"axios": "^1.7.8",
		"html2canvas": "^1.4.1",
		"jspdf": "^2.5.2",
		"jspdf-autotable": "^3.8.4",
		"localstorage-slim": "^2.7.1",
		"react-csv": "^2.2.2",
		"react-grid-layout": "^1.5.0",
		"react-icons": "^5.3.0",
		"react-loader-spinner": "^6.1.6",
		"react-toastify": "^10.0.5",
		"sass": "^1.77.6",
		"sweetalert2": "^11.14.5"
	},
	"devDependencies": {
		"@types/react": "^18.3.3",
		"@types/react-dom": "^18.3.0",
		"@vitejs/plugin-react": "^4.3.1",
		"eslint": "^8.57.0",
		"eslint-plugin-react": "^7.34.2",
		"eslint-plugin-react-hooks": "^4.6.2",
		"eslint-plugin-react-refresh": "^0.4.7",
		"vite": "^5.3.1"
	}
```
