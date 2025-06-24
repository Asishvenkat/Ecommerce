import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { mobile } from '../responsive';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px 20px;
  text-align: center;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mobile({ padding: "30px 10px" })}
`;

const SuccessIcon = styled.div`
  font-size: 80px;
  color: #28a745;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &::before {
    content: "✓";
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #28a745;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    font-weight: bold;
  }
`;

const Title = styled.h1`
  color: #28a745;
  margin-bottom: 10px;
  font-size: 32px;
  ${mobile({ fontSize: "24px" })}
`;

const Subtitle = styled.h3`
  color: #666;
  margin-bottom: 30px;
  font-weight: 400;
  ${mobile({ fontSize: "16px" })}
`;

const OrderDetails = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  max-width: 500px;
  width: 100%;
`;

const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
    font-weight: 600;
    color: #333;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
  ${mobile({ flexDirection: "column", gap: "10px" })}
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  min-width: 150px;
  
  background: ${props => props.primary ? '#007bff' : '#6c757d'};
  color: white;
  
  &:hover {
    background: ${props => props.primary ? '#0056b3' : '#545b62'};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { orderId, paymentId } = location.state || {};

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleViewOrders = () => {
    navigate('/orders');
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <SuccessIcon />
        <Title>Order Placed Successfully!</Title>
        <Subtitle>Thank you for your purchase. Your order has been confirmed.</Subtitle>
        
        {orderId && (
          <OrderDetails>
            <OrderInfo>
              <span>Order ID:</span>
              <span>{orderId}</span>
            </OrderInfo>
            {paymentId && (
              <OrderInfo>
                <span>Payment ID:</span>
                <span>{paymentId}</span>
              </OrderInfo>
            )}
            <OrderInfo>
              <span>Status:</span>
              <span>Confirmed</span>
            </OrderInfo>
          </OrderDetails>
        )}
        
        <p>
          You will receive an email confirmation shortly with your order details.
          <br />
          Expected delivery: 3-5 business days
        </p>
        
        <ButtonGroup>
          <Button primary onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
          <Button onClick={handleViewOrders}>
            View My Orders
          </Button>
        </ButtonGroup>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default OrderSuccess;