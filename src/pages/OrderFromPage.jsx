import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import { useAuth } from '../../contexts/AuthContext';
import { Form, Input, Button, Select, DatePicker, message, Spin, Card } from 'antd';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

const OrderFormPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
//   const { authToken } = useAuth();
  const isEditMode = !!id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch products and users for dropdowns
        const [productsRes, usersRes] = await Promise.all([
          axios.get('http://localhost:3030/api/products'),
          axios.get('http://localhost:3030/api/users')
        ]);
        setProducts(productsRes.products);
        setUsers(usersRes.data.users);
        console.log(usersRes);
        // Set initial form values for edit mode

        // If edit mode, fetch order data
        if (isEditMode) {
          const orderRes = await axios.get(`http://localhost:3030/api/orders/${id}`);
          setOrder(orderRes.data);
          form.setFieldsValue({
            ...orderRes.data,
            createdAt: moment(orderRes.data.createdAt)
          });
        }
      } catch (error) {
        message.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, form, isEditMode]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = {
        ...values,
        createdAt: values.createdAt.toISOString()
      };

      if (isEditMode) {
        await axios.patch(`http://localhost:3030/api/orders/admin/${id}/status`, data);
        message.success('Order updated successfully');
      } else {
        await axios.post('http://localhost:3030/api/orders', data);
        message.success('Order created successfully');
      }
      navigate('/admin/orders');
    } catch (error) {
      message.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Card
        title={<h1 className="text-xl font-semibold">{isEditMode ? 'Edit Order' : 'Create New Order'}</h1>}
        className="max-w-4xl mx-auto"
      >
        <Spin spinning={loading}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              status: 'pending'
            }}
          >
            {isEditMode && (
              <Form.Item label="Order ID" name="_id">
                <Input disabled />
              </Form.Item>
            )}

            <Form.Item
              label="Customer"
              name="userId"
              rules={[{ required: true, message: 'Please select a customer' }]}
            >
              <Select disabled={isEditMode}>
                {users?.map(user => (
                  <Option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: 'Please select status' }]}
            >
              <Select>
                <Option value="pending">Pending</Option>
                <Option value="processing">Processing</Option>
                <Option value="shipped">Shipped</Option>
                <Option value="delivered">Delivered</Option>
                <Option value="cancelled">Cancelled</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Order Date"
              name="createdAt"
              rules={[{ required: true, message: 'Please select order date' }]}
            >
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" className="w-full" />
            </Form.Item>

            <Form.Item
              label="Shipping Address"
              name="shippingAddress"
              rules={[{ required: true, message: 'Please enter shipping address' }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              label="Payment Method"
              name="paymentMethod"
              rules={[{ required: true, message: 'Please select payment method' }]}
            >
              <Select>
                <Option value="credit_card">Credit Card</Option>
                <Option value="paypal">PayPal</Option>
                <Option value="bank_transfer">Bank Transfer</Option>
                <Option value="cash_on_delivery">Cash on Delivery</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {isEditMode ? 'Update Order' : 'Create Order'}
              </Button>
              <Button className="ml-4" onClick={() => navigate('/admin/orders')}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

export default OrderFormPage;