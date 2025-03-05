import { useState, useEffect } from "react";

const useCameraPermission = () => {
	const [permission, setPermission] = useState<
		"granted" | "denied" | "prompt" | "loading"
	>("loading");

	useEffect(() => {
		const checkPermission = async () => {
			try {
				const result = await navigator.permissions.query({
					name: "camera" as PermissionName,
				});
				setPermission(result.state);

				result.onchange = () => {
					setPermission(result.state);
				};
			} catch (error) {
				console.error("Permission API not supported", error);
			}
		};

		checkPermission();
	}, []);

	const requestCameraAccess = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
			});
			console.log("Camera access granted", stream);
			setPermission("granted");
			for (const track of stream.getTracks()) {
				track.stop();
			}
		} catch (error: any) {
			console.error("Camera access denied", error);
			if (error.name === "NotAllowedError") {
				setPermission("denied");
			}
		}
	};

	return { permission, requestCameraAccess };
};

export default useCameraPermission;
