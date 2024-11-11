import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** @param {ErrorPageProps} props  */
function ErrorPage(props) {
	const navigate = useNavigate();
	alert(props.messge);
	useEffect(() => {
		navigate(props.navigate);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <></>;
}

export default ErrorPage;
