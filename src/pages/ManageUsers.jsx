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
        <>
          <Button onClick={() => openModal(record)} type="link">Edit</Button>
          <Button onClick={() => handleDelete(record.id)} type="link" danger>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => openModal()}>+ Add User</Button>

      <Table columns={columns} dataSource={users} rowKey="id" />

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
      >
        <Form
          initialValues={editingUser}
          onFinish={handleFormSubmit}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter the email' }]}>
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please select a role' }]}>
            <Select placeholder="Select role">
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingUser ? "Save Changes" : "Create User"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageUsers;
