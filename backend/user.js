import { Router } from 'express';

const router = Router();

// In-memory placeholder store
const users = new Map();

router.get('/', (req, res) => {
	res.json(Array.from(users.values()));
});

router.post('/', (req, res) => {
	const { id, name } = req.body || {};
	if (!id || !name) return res.status(400).json({ error: 'id and name required' });
	if (users.has(id)) return res.status(409).json({ error: 'User already exists' });
	const user = { id, name };
	users.set(id, user);
	res.status(201).json(user);
});

router.get('/:id', (req, res) => {
	const user = users.get(req.params.id);
	if (!user) return res.status(404).json({ error: 'Not found' });
	res.json(user);
});

router.put('/:id', (req, res) => {
	const existing = users.get(req.params.id);
	if (!existing) return res.status(404).json({ error: 'Not found' });
	const { name } = req.body || {};
	if (!name) return res.status(400).json({ error: 'name required' });
	const updated = { ...existing, name };
	users.set(req.params.id, updated);
	res.json(updated);
});

router.delete('/:id', (req, res) => {
	const existed = users.delete(req.params.id);
	if (!existed) return res.status(404).json({ error: 'Not found' });
	res.status(204).end();
});

export default router;
