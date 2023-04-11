import { Button, Container, Box, TextField, FormControl, FormLabel } from '@mui/material';
import { useForm } from 'react-hook-form';
import { postParticipant } from '../api/participant';

export function ParticipantPage() {
	const { register, handleSubmit, formState: { errors } } = useForm();

	return (
		<Box marginTop={10}>
			<Container>
				<form onSubmit={handleSubmit(submitForm)}>
					<FormControl sx={{ width: '50ch' }}>
						<FormLabel>Participant Information</FormLabel>
						<TextField label="First Name" margin="normal" required={true} {...register('firstName')} />
						<TextField label="Last Name" margin="normal" required={true} {...register('lastName')} />
						<TextField label="Address" margin="normal" required={true} {...register('address')} />
						<TextField label="City" margin="normal" required={true} {...register('city')} />
						<TextField label="Zip" margin="normal" required={true} {...register('zip')} />
						<TextField label="Phone" margin="normal" required={true} {...register('phone')} />
						<TextField label="Email" margin="normal" required={true} {...register('email')} />
						<TextField label="Site Notes" margin="normal" {...register('siteNotes')} />
						<TextField label="Lot Area" margin="normal" required={true} {...register('lotArea')} />
						<TextField
							label="Plantable Area"
							margin="normal"
							required={true}
							{...register('plantableArea')}
						/>

						<Button type="submit" aria-label="add-applicant-button" variant="contained">
							Save Participant
						</Button>
					</FormControl>
				</form>
			</Container>
		</Box>
	);
}

const submitForm = async (data) => {
	console.log(data);
	const response = await postParticipant(data);
};
