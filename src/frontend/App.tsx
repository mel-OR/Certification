import { Button, Container, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function App() {
	const [ participants, setParticipants ] = useState([]);

	const participantColumns = [
		{ field: 'firstName', headerName: 'First Name', width: 100 },
		{ field: 'lastName', headerName: 'Last Name', width: 100 },
		{ field: 'email', headerName: 'Email', width: 250 }
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
		<Box marginTop={10}>
			<Container>
				<Button aria-label="add-applicant-button" variant="contained" component={Link} to="/participant">
					Add Participant
				</Button>
				<Box padding={2} />
				<DataGrid
					rows={participants}
					columns={participantColumns}
					getRowId={(participants) => participants._id}
					autoHeight
				/>
			</Container>
		</Box>
	);
}
