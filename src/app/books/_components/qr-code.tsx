"use client";

import React from "react";
import { useZxing } from "react-zxing";

type QRCodeProps = {
	onResult: (result: { isbn: string }) => void;
};

const QRCode = ({ onResult }: QRCodeProps) => {
	const [result, setResult] = React.useState<string>();
	const { ref } = useZxing({
		onDecodeError(err) {
			console.error(err);
		},
		onDecodeResult(result) {
			console.log(result);
			setResult(result.getText());
			onResult({ isbn: result.getText() });
		},
	});

	return (
		<div className="relative w-full h-full">
			{result && (
				<p className="absolute top-1 left-1 text-secondary">{result}</p>
			)}
			<video ref={ref} muted />
		</div>
	);
};

export default QRCode;
