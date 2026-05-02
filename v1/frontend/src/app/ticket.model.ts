export type TicketStatus =
  | 'To Do'
  | 'In Progress'
  | 'Waiting for Customer'
  | 'Resolved'
  | 'Closed';

export type TicketCategory =
  | 'Probleme technique'
  | 'Probleme de facturation'
  | 'Probleme d acces au compte'
  | 'Demande de remboursement'
  | 'Question generale';

export type AssignedSupport = {
  _id: string;
  username: string;
};

export type Ticket = {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  title: string;
  description: string;
  category: TicketCategory;
  status: TicketStatus;
  assignedTo: AssignedSupport | null;
  createdAt: string;
  updatedAt: string;
};
