const express = require('express');
const { Ticket, TICKET_STATUSES } = require('../models/Ticket');

const router = express.Router();

const ticketPopulate = { path: 'assignedTo', select: 'username' };

router.get('/', async (_req, res) => {
  const tickets = await Ticket.find().populate(ticketPopulate).sort({ createdAt: -1 });
  res.json(tickets);
});

router.get('/:id', async (req, res) => {
  const ticket = await Ticket.findById(req.params.id).populate(ticketPopulate);
  if (!ticket) {
    return res.status(404).json({ message: 'Ticket introuvable.' });
  }
  return res.json(ticket);
});

router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!TICKET_STATUSES.includes(status)) {
    return res.status(400).json({ message: 'Statut invalide.' });
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(id, { status }, { new: true }).populate(
    ticketPopulate
  );

  if (!updatedTicket) {
    return res.status(404).json({ message: 'Ticket introuvable.' });
  }

  return res.json(updatedTicket);
});

router.patch('/:id/assign', async (req, res) => {
  const { id } = req.params;
  const { unassign } = req.body;

  const ticket = await Ticket.findById(id);
  if (!ticket) {
    return res.status(404).json({ message: 'Ticket introuvable.' });
  }

  if (unassign) {
    ticket.assignedTo = null;
  } else {
    ticket.assignedTo = req.user.id;
    if (ticket.status === 'To Do') {
      ticket.status = 'In Progress';
    }
  }

  await ticket.save();
  const populated = await Ticket.findById(ticket._id).populate(ticketPopulate);
  return res.json(populated);
});

module.exports = router;
