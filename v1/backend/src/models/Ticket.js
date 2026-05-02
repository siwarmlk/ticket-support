const mongoose = require('mongoose');

const TICKET_STATUSES = [
  'To Do',
  'In Progress',
  'Waiting for Customer',
  'Resolved',
  'Closed'
];

const TICKET_CATEGORIES = [
  'Probleme technique',
  'Probleme de facturation',
  'Probleme d acces au compte',
  'Demande de remboursement',
  'Question generale'
];

const ticketSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: TICKET_CATEGORIES,
      default: 'Question generale'
    },
    status: {
      type: String,
      enum: TICKET_STATUSES,
      default: 'To Do'
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SupportUser',
      default: null
    }
  },
  { timestamps: true }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = {
  Ticket,
  TICKET_STATUSES,
  TICKET_CATEGORIES
};
