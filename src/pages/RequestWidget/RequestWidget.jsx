import * as React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { timeAgo } from "../../components/utils/HelperFunctions";
import styles from "./RequestWidget.module.scss";

const RequestWidget = ({ setIsLoadingPopup, email }) => {
	const [widgetType, setWidgetType] = useState("");
	const [message, setMessage] = useState("");
	const [requests, setRequests] = useState([]);
	// State to track expanded requests
	const [expandedRequests, setExpandedRequests] = useState(Object.fromEntries(requests.map((_, index) => [index, false])));

	// Get token from localStorage
	const token = localStorage.getItem("Pilar9_Token_npm_ls");
	const baseUrl = localStorage.getItem("API_BASE_URL");

	// Handle form submission
	const [uploading, setUploading] = useState(false);
	const [reload, setReload] = useState(0);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setUploading(true);

		try {
			const response = await fetch(`${baseUrl}/api/requestWidget`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: token ? token : "",
				},
				body: JSON.stringify({ email, type: widgetType, details: message }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data?.message || "Error making widget request...");
			}

			setWidgetType("");
			setMessage("");
			setReload((prev) => prev + 1);
			toast.success("Widget request submitted successfully!");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setUploading(false);
		}
	};

	// Toggle Read More / Read Less
	const toggleReadMore = (index) => {
		setExpandedRequests((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	// Fetch requests using Fetch API
	useEffect(() => {
		const fetchRequests = async () => {
			setIsLoadingPopup(true);

			try {
				const response = await fetch(`${baseUrl}/api/requestWidgets`, {
					headers: {
						Authorization: token ? token : "",
					},
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data?.message || "Error fetching requests...");
				}

				setRequests(data?.requests || []);
				setExpandedRequests(Object.fromEntries(data?.requests.map((_, index) => [index, false])));
			} catch (error) {
				toast.error(error.message);
			} finally {
				setIsLoadingPopup(false);
			}
		};

		fetchRequests();
	}, [reload]);

	return (
		<div className={styles.RequestWidget}>
			{/* Form Section */}
			<div className={styles.FormContainer}>
				<h2>Request Widget</h2>
				<p>Lorem ipsum dolor sit amet consectetur. Tellus risus ut massa quis vitae viverra aet.</p>
				<form className={styles.Form} onSubmit={handleSubmit}>
					<input type="email" placeholder="Your Email" value={email} className={styles.Input} required readOnly />
					<input
						type="text"
						placeholder="Type of Widget"
						value={widgetType}
						onChange={(e) => setWidgetType(e.target.value)}
						className={styles.Input}
						required
					/>
					<textarea
						placeholder="Write Something"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className={styles.Textarea}
						required
					></textarea>

					{uploading ? (
						<button className={styles.SubmitButton}>
							<Loading color="#fff" />
						</button>
					) : (
						<button type="submit" className={styles.SubmitButton}>
							Submit
						</button>
					)}
				</form>
			</div>

			{/* Submitted Requests Section */}
			<div className={styles.SubmittedRequestsContainer}>
				<h3>Submitted Requests</h3>
				<div className={styles.RequestList}>
					{requests.map((request, index) => (
						<div key={index} className={styles.RequestCard}>
							<div className={styles.Left}>
								<div className={styles.RequestHeader}>
									<h4>{request?.type}</h4>
									<span>{timeAgo(request?.createdAt)}</span>
								</div>
								<p>
									{expandedRequests[index] ? request.details : `${request.details.slice(0, 100)}`}
									{/* Conditionally show "Read More" if message is longer than 100 characters */}
									{request.details.length > 100 && (
										<span className={styles.ReadMore} onClick={() => toggleReadMore(index)}>
											{expandedRequests[index] ? " Show Less" : " ...Read More"}
										</span>
									)}
								</p>
							</div>
							<div className={styles.Status}>
								<span className={styles.StatusIndicator}></span>
								{request.status}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default RequestWidget;
