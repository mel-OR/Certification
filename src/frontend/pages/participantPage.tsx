import { Button, Container, Box, TextField, FormControl, FormLabel } from '@mui/material';

export function ParticipantPage() {
	return (
		<Box marginTop={10}>
			<Container>
				<FormControl sx={{ width: '50ch' }}>
					<FormLabel>Participant Information</FormLabel>
					<TextField label="First Name" margin="normal" required={true} />
					<TextField label="Last Name" margin="normal" required={true} />
					<TextField label="Address" margin="normal" required={true} />
					<TextField label="City" margin="normal" required={true} />
					<TextField label="Zip" margin="normal" required={true} />
					<TextField label="Phone" margin="normal" required={true} />
					<TextField label="Email" margin="normal" required={true} />
					<TextField label="Site Notes" margin="normal" required={true} />
					<TextField label="Lot Area" margin="normal" required={true} />
					<TextField label="Plantable Area" margin="normal" required={true} />

					<Button aria-label="add-aaplicant-button" variant="contained">
						Save Participant
					</Button>
				</FormControl>
			</Container>
		</Box>
	);
}
