import { Button, Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

export default function App() {
	const [ participants, setParticipants ] = useState([]);

	const participantColumns = [
		{ field: 'firstName', headerName: 'First Name' },
		{ field: 'lastName', headerName: 'Last Name' }
	];

	useEffect(() => {
		const fetchParticipants = async () => {
			const response = await fetch('http://localhost:5596/participant');
			const data = await response.json();
			setParticipants(data);
		};
		fetchParticipants();
	}, []);

	return (
		<Container>
			<Button aria-label="add-aaplicant-button" variant="contained">
				Add Participant
			</Button>
			<DataGrid
				rows={participants}
				columns={participantColumns}
				getRowId={(participants) => participants._id}
				autoHeight
			/>
		</Container>
	);
}
//export default App;
