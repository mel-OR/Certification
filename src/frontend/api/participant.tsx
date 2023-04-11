export async function getParticipants() {
	const response = await fetch('http://localhost:5596/participant');
	const data = await response.json();
	return data;
}

export async function postParticipant(body: any) {
	const response = await fetch('http://localhost:5596/participant', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
	return response;
}

export async function getParticipant(id: String) {
	const response = await fetch(`http://localhost:5596/participant/${id}`);
	const data = await response.json();
	return data;
}
