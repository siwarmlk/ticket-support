const bcrypt = require('bcryptjs');
const { SupportUser } = require('../models/SupportUser');

const ensureDefaultSupportUser = async () => {
  const username = (process.env.SUPPORT_USERNAME || 'support').toLowerCase().trim();
  const plainPassword = process.env.SUPPORT_PASSWORD || 'support123';

  const existing = await SupportUser.findOne({ username });
  if (existing) {
    return;
  }

  const password = await bcrypt.hash(plainPassword, 10);
  await SupportUser.create({ username, password });
  console.log(`Compte support par defaut cree: ${username} / ${plainPassword}`);
};

module.exports = { ensureDefaultSupportUser };
