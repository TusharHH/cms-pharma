import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { useAuth } from '../../contexts/AuthContext';
import { Table, Button, Space, Popconfirm, message, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { authToken } = useAuth();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3030/api/orders/admin');
      setOrders(response.data);
    } catch (error) {
      message.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3030/api/orders/admin/${id}`);
      message.success('Order deleted successfully');
      fetchOrders();
    } catch (error) {
      message.error('Failed to delete order');
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
      render: (id) => <Link to={`/admin/orders/edit/${id}`}>{id.slice(-6)}</Link>
    },
    {
      title: 'Customer',
      dataIndex: 'userId',
      key: 'userId',
      render: (user) => user?.name || 'N/A'
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => `$${amount.toFixed(2)}`
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = '';
        switch (status) {
          case 'pending': color = 'orange'; break;
          case 'completed': color = 'green'; break;
          case 'cancelled': color = 'red'; break;
          default: color = 'blue';
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/orders/edit/${record._id}`}>
            <Button icon={<EditOutlined />} />
          </Link>
          <Popconfirm
            title="Are you sure to delete this order?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <Link to="/admin/orders/new">
          <Button type="primary">Create New Order</Button>
        </Link>
      </div>
      <Table 
        columns={columns} 
        dataSource={orders} 
        rowKey="_id" 
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default OrderListPage;