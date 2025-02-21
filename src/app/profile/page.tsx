import { getServerSession } from "next-auth";

const ProfilePage = async () => {
	const session = await getServerSession();

	if (session) {
		return <div>connected</div>;
	}
	return <div>disconnected</div>;
};

export default ProfilePage;
