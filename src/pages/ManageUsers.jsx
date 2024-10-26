import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser, updateUser, deleteUser } from '../services/userSlice';

const { Option } = Select;

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users); // Select users from Redux state

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: 10 })); // Fetch users on component mount
  }, [dispatch]);

  const openModal = (user = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId)); // Dispatch delete action
  };

  const handleFormSubmit = (values) => {
    if (editingUser) {
      dispatch(updateUser({ id: editingUser.id, userData: values }));
    } else {
      dispatch(createUser(values));
    }
    handleModalClose();
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button onClick={() => openModal(record)} type="link" className="text-teal-500">Edit</Button>
          <Button onClick={() => handleDelete(record.id)} type="link" danger className="text-red-500">Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between mb-4">
        <h2 className="text-white text-xl font-semibold">Manage Users</h2>
        <Button
          type="primary"
          onClick={() => openModal()}
          className="bg-teal-600 hover:bg-teal-700 text-white border-none rounded-lg shadow-md"
        >
          + Add User
        </Button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          className="bg-gray-800 text-white rounded-lg shadow-md"
          pagination={{ className: 'bg-gray-800 text-gray-300' }}
        />
      )}

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        centered
        className="rounded-lg bg-gray-900 text-white shadow-lg"
        bodyStyle={{ backgroundColor: '#1f2937', borderRadius: '8px', padding: '20px' }}
      >
        <Form
          initialValues={editingUser}
          onFinish={handleFormSubmit}
          layout="vertical"
          className="text-gray-300"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
            className="text-gray-300"
          >
            <Input
              placeholder="Enter name"
              className="bg-gray-700 border border-gray-600 text-white rounded-lg"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter the email' }]}
            className="text-gray-300"
          >
            <Input
              placeholder="Enter email"
              className="bg-gray-700 border border-gray-600 text-white rounded-lg"
            />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role' }]}
            className="text-gray-300"
          >
            <Select
              placeholder="Select role"
              className="bg-gray-700 border border-gray-600 text-white rounded-lg"
              dropdownClassName="bg-gray-700 text-white"
            >
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>
          {!editingUser && (
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter a password' }]}
              className="text-gray-300"
            >
              <Input.Password
                placeholder="Enter password"
                className="bg-gray-700 border border-gray-600 text-white rounded-lg"
              />
            </Form.Item>
          )}
          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit" className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg">
              {editingUser ? "Save Changes" : "Create User"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageUsers;
