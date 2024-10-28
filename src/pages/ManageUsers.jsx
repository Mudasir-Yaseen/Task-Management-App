import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser, updateUser, deleteUser } from '../services/userSlice';

const { Option } = Select;

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error, totalUsers } = useSelector((state) => state.users);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchUsersData();
  }, [dispatch, currentPage]);

  const fetchUsersData = () => {
    dispatch(fetchUsers({ page: currentPage, limit: pageSize }));
  };

  const openModal = (user = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
    fetchUsersData();
  };

  const handleFormSubmit = (values) => {
    if (editingUser) {
      dispatch(updateUser({ id: editingUser.id, userData: values }));
    } else {
      dispatch(createUser(values));
    }
    handleModalClose();
    fetchUsersData();
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', className: 'text-gray-700 font-semibold' },
    { title: 'Email', dataIndex: 'email', key: 'email', className: 'text-gray-700 font-semibold' },
    { title: 'Role', dataIndex: 'role', key: 'role', className: 'text-gray-700 font-semibold' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button onClick={() => openModal(record)} type="link" className="text-green-600 hover:text-green-700">Edit</Button>
          <Button onClick={() => handleDelete(record.id)} type="link" danger className="text-red-500 hover:text-red-600">Delete</Button>
        </div>
      ),
    },
  ];

  const totalPages = Math.ceil(totalUsers / pageSize);

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-gray-800 text-2xl font-bold">Manage Users</h2>
        <Button
          type="primary"
          onClick={() => openModal()}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-md"
        >
          + Add User
        </Button>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error.message}</div>
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            className="bg-gray-50 text-gray-700 rounded-lg shadow-md"
            pagination={false}
          />
          <div className="flex justify-between items-center mt-6">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`py-2 px-4 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-green-600 text-white hover:bg-green-700'}`}
            >
              Previous
            </Button>

            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`py-2 px-4 rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-green-600 text-white hover:bg-green-700'}`}
            >
              Next
            </Button>
          </div>
        </>
      )}

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        centered
        className="rounded-lg bg-white text-gray-800"
        bodyStyle={{ borderRadius: '8px', padding: '20px' }}
      >
        <Form
          initialValues={{
            name: editingUser ? editingUser.name : '',
            email: editingUser ? editingUser.email : '',
            role: editingUser ? editingUser.role : '',
            is_active: editingUser ? editingUser.is_active : true,
          }}
          onFinish={handleFormSubmit}
          layout="vertical"
          className="text-gray-700 space-y-4"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input
              placeholder="Enter name"
              className="bg-gray-100 text-gray-800 rounded-lg"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter the email' }]}
          >
            <Input
              placeholder="Enter email"
              className="bg-gray-100 text-gray-800 rounded-lg"
            />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select
              placeholder="Select role"
              className="bg-gray-100 text-gray-800 rounded-lg"
              dropdownClassName="bg-gray-100 text-gray-800"
            >
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="is_active"
            label="Is Active"
            valuePropName="checked"
          >
            <Checkbox className="text-gray-800">Active User</Checkbox>
          </Form.Item>
          {!editingUser && (
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter a password' }]}
            >
              <Input.Password
                placeholder="Enter password"
                className="bg-gray-100 text-gray-800 rounded-lg"
              />
            </Form.Item>
          )}
          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md px-6 py-2">
              {editingUser ? "Save Changes" : "Create User"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageUsers;
