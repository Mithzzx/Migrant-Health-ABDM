import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import usersRouter from './user.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
	res.json({ status: 'ok', service: 'backend', timestamp: new Date().toISOString() });
});

app.use('/api/users', usersRouter);

// Sample patients endpoint (stub) - replace with DB/ABDM integration later
const patients = [
	{ id: 'ABHA123', name: 'Ravi Kumar', age: 34, lastVisit: '2025-09-09', status: 'stable' },
	{ id: 'ABHA124', name: 'Meera Devi', age: 28, lastVisit: '2025-09-08', status: 'follow-up' },
	{ id: 'ABHA125', name: 'Sanjay Singh', age: 45, lastVisit: '2025-09-07', status: 'critical' }
];

app.get('/api/patients', (req, res) => {
	res.json(patients);
});

app.use((req, res) => {
	res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
	console.error(err); // eslint-disable-line no-console
	res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
	console.log(`Backend listening on :${PORT}`); // eslint-disable-line no-console
});
