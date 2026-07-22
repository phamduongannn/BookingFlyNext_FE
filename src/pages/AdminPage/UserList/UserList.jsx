import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button } from 'antd';
import { userServ } from '../../../services/userServ';
import './ag-grid-theme-builder.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userServ.getAllUsers();
        setUsers(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    // Xử lý logic sửa người dùng ở đây
    console.log('Edit user:', userId);
  };

  const handleDelete = (userId) => {
    // Xử lý logic xoá người dùng ở đây
    console.log('Delete user:', userId);
  };

  const columns = [
    {
      headerName: 'User ID',
      field: 'user_id',
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 100,
    },
    {
      headerName: 'Full Name',
      field: 'full_name',
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Gender',
      field: 'gender',
      sortable: true,
      width: 150,
      filter: true,
      valueFormatter: (params) => (params.value === 1 ? 'Male' : 'Female'),
      floatingFilter: true,
    },
    {
      headerName: 'Date of Birth',
      field: 'date_of_birth',
      sortable: true,
      filter: true,
      floatingFilter: true,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      headerName: 'Nationality',
      field: 'nationality',
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Citizen ID number',
      field: 'cccd',
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Address',
      field: 'address',
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Phone',
      field: 'phone',
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Role',
      field: 'role',
      width: 150,
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRendererFramework: (params) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleEdit(params.data.user_id)}
            style={{ marginRight: '10px' }}
          >
            Edit
          </Button>
          <Button
            type="danger"
            onClick={() => handleDelete(params.data.user_id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      className="ag-theme-alpine ag-theme-custom"
      style={{ height: '500px', width: '100%' }}
    >
      <AgGridReact
        rowData={users}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        floatingFilter={true}
      />
    </div>
  );
};

export default UserList;
