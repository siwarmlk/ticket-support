const { Ticket, TICKET_CATEGORIES } = require('../models/Ticket');

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());

const createPublicTicket = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, title, description, category } = req.body;

    if (
      !isNonEmptyString(firstName) ||
      !isNonEmptyString(lastName) ||
      !isNonEmptyString(phone) ||
      !isNonEmptyString(email) ||
      !isNonEmptyString(title) ||
      !isNonEmptyString(description)
    ) {
      return res.status(400).json({
        message: 'firstName, lastName, phone, email, title et description sont obligatoires.'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Email invalide.' });
    }

    if (category && !TICKET_CATEGORIES.includes(category)) {
      return res.status(400).json({ message: 'Categorie invalide.' });
    }

    const ticket = await Ticket.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      title: title.trim(),
      description: description.trim(),
      category: category || 'Question generale'
    });

    return res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erreur serveur lors de la creation du ticket.' });
  }
};

module.exports = { createPublicTicket };
