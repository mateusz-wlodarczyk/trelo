import { DataFile2 } from './types';
export const initialLoadedData = { error: true, name: 'wrong' };
export const dataFile: DataFile2 = {
  exec_time: 0.11,
  response: {
    current_page: 1,
    data: [
      {
        assigned_to: [
          {
            person_name: 'Technician One',
            status: 'Assigned',
          },
        ],
        description: 'Create a connection to SQL database using Excel',
        priority: 'Low',
        received_date: '2021-07-21 00:23:03',
        status: 'New',
        work_order_id: 1,
      },
      {
        assigned_to: [
          {
            person_name: 'Technician Two',
            status: 'Assigned',
          },
        ],
        description: 'Need to make update for laptop 11',
        priority: 'Low',
        received_date: '2021-07-20 15:23:03',
        status: 'New',
        work_order_id: 2,
      },
      {
        assigned_to: [
          {
            person_name: 'Technician One',
            status: 'In progress',
          },
        ],
        description: 'Setup station 2',
        priority: 'High',
        received_date: '2021-07-20 14:23:03',
        status: 'Confirmed',
        work_order_id: 3,
      },
      {
        assigned_to: [
          {
            person_name: 'Technician Two',
            status: 'Assigned',
          },
          {
            person_name: 'Technician One',
            status: 'In progress',
          },
        ],

        description: 'Setup station 3',
        priority: 'High',
        received_date: '2021-07-19 12:23:03',
        status: 'Confirmed',
        work_order_id: 4,
      },
      {
        assigned_to: [
          {
            person_name: 'Technician Two',
            status: 'Confirmed',
          },
        ],
        description: 'Mailbox issues',
        priority: 'Normal',
        received_date: '2021-07-19 11:23:03',
        status: 'Confirmed',
        work_order_id: 5,
      },
      {
        assigned_to: [],
        description: 'Subject: We sent you issue last Friday',
        priority: 'Low',
        received_date: '2021-07-17 11:23:03',
        status: 'New',
        work_order_id: 6,
      },
      {
        assigned_to: [],
        description: 'Internal work',

        priority: 'Low',
        received_date: '2021-07-17 10:23:03',
        status: 'Canceled',
        work_order_id: 7,
      },
      {
        assigned_to: [
          {
            person_name: 'Technician Two',
            status: 'Completed',
          },
        ],
        description: 'Set up station for new user',
        priority: 'Low',
        received_date: '2021-07-16 09:23:03',
        status: 'Completed',
        work_order_id: 8,
      },
    ],
    from: 1,
    last_page: 1,
    per_page: 10,
    to: 10,
    total: 8,
  },
};
