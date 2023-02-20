import mongoose from 'mongoose';
import server from './server';

async function runMongoose() {
	await mongoose.connect('mongodb://localhost:27017/test').then(() => {
		console.log('******Database is connected******');
	});
}

const PORT = '5596';

server.listen(PORT, () => {
	console.log('The server is running at http://localhost:' + PORT);
	console.log('Waiting for database to start...');
});
runMongoose().catch((err) => console.log(err));
