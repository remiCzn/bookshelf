import { Input } from "@/app/_components/input";

const ProfileField = ({ label, value }: { label: string; value: string }) => {
	return (
		<div className="flex flex-col items-start justify-start">
			<Input name={label} value={value} size="small" disabled />
		</div>
	);
};

export default ProfileField;
