import { useEffect, useState } from "react";

const useDatabase = () => {
	const [data, setData] = useState(null);
	const [error, _setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("https://example.com/api/data");
				const json = await response.json();
				setData(json);
			} catch (_error) {
				// setError(error);
			}
		};

		fetchData();
	}, []);

	return { data, error };
};

export default useDatabase;
