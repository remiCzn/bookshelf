const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-full h-full flex flex-col items-center justify-center gap-4">
			{children}
		</div>
	);
};

export default ProfileLayout;
