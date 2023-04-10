import App from '../App';
import { ParticipantPage } from '../pages/participantPage';
import { createBrowserRouter } from 'react-router-dom';

export const appRouter = createBrowserRouter([
	{
		path: '/',
		element: <App />
	},
	{
		path: 'participant/',
		element: <ParticipantPage />
	}
]);
