import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select } from 'antd';

const { Option } = Select;

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from an API or mock data
  useEffect(() => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'user', status: 'inactive' },
    ];
    setUsers(mockUsers);
  }, []);

  const openModal = (user = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleFormSubmit = (values) => {
    if (editingUser) {
      setUsers(users.map((user) => (user.id === editingUser.id ? { ...editingUser, ...values } : user)));
    } else {
      const newUser = { ...values, id: Date.now(), status: 'active' };
      setUsers([...users, newUser]);
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

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        className="bg-gray-800 text-white rounded-lg shadow-md"
        pagination={{ className: 'bg-gray-800 text-gray-300' }}
      />

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
