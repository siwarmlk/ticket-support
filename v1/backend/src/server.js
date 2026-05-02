const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDatabase } = require('./config/db');
const { ensureDefaultSupportUser } = require('./utils/ensureDefaultSupportUser');
const { authMiddleware } = require('./middleware/authMiddleware');
const { login } = require('./routes/auth.routes');
const { createPublicTicket } = require('./routes/publicTickets.routes');
const ticketRoutes = require('./routes/tickets.routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (typeof login !== 'function') {
  throw new Error('Le module auth.routes doit exporter { login }.');
}
if (typeof createPublicTicket !== 'function') {
  throw new Error('Le module publicTickets doit exporter { createPublicTicket }.');
}

const api = express.Router();

api.get('/health', (_req, res) => {
  res.json({ ok: true, message: 'API is running.' });
});

api.post('/auth/login', login);

api.get('/public/tickets', (_req, res) => {
  res.json({
    message:
      'Cette URL attend une requete POST avec firstName, lastName, phone, email, title, description, category (optionnel).'
  });
});
api.post('/public/tickets', createPublicTicket);

api.use('/tickets', authMiddleware, ticketRoutes);

app.use('/api', api);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error.' });
});

const startServer = async () => {
  try {
    await connectDatabase();
    await ensureDefaultSupportUser();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
