export type InitialLoadedData = { error: boolean; name: string };

type DataFileAssigned = {
  person_name: string;
  status: string;
};

export type DataFileSingle = {
  assigned_to: DataFileAssigned[] | [];
  description: string;
  priority: string;
  received_date: string;
  status: string;
  work_order_id: number;
};

export type DataResponse = {
  current_page: number;
  data: DataFileSingle[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
};
export type DataFile = {
  exec_time: number;
  response: DataResponse;
};
/////////////////////
export type DataFile2 = {
  exec_time: number;
  response: {
    current_page: number;
    data: [
      {
        assigned_to: [
          {
            person_name: string;
            status: string;
          },
        ];
        description: string;
        priority: string;
        received_date: string;
        status: string;
        work_order_id: number;
      },
      {
        assigned_to: [
          {
            person_name: string;
            status: string;
          },
        ];
        description: string;
        priority: string;
        received_date: string;
        status: string;
        work_order_id: number;
      },
      {
        assigned_to: [
          {
            person_name: string;
            status: string;
          },
        ];
        description: string;
        priority: string;
        received_date: string;
        status: string;
        work_order_id: number;
      },
      {
        assigned_to: [
          {
            person_name: string;
            status: string;
          },
          {
            person_name: string;
            status: string;
          },
        ];

        description: string;
        priority: string;
        received_date: string;
        status: string;
        work_order_id: number;
      },
      {
        assigned_to: [
          {
            person_name: string;
            status: string;
          },
        ];
        description: string;
        priority: string;
        received_date: string;
        status: string;
        work_order_id: number;
      },
      {
        assigned_to: [];
        description: string;
        priority: string;
        received_date: string;
        status: string;
        work_order_id: number;
      },
      {
        assigned_to: [];
        description: string;

        priority: string;
        received_date: string;
        status: string;
        work_order_id: number;
      },
      {
        assigned_to: [
          {
            person_name: string;
            status: string;
          },
        ];
        description: string;
        priority: string;
        received_date: string;
        status: string;
        work_order_id: number;
      },
    ];
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
};
