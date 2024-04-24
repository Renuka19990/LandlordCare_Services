import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Flex, Image, Text, Button, Input, Stack, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';

const Payment = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee] = useState(5);
  const [tax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`https://landloards-json-server.onrender.com/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property: ', error);
      }
    };
    fetchProperty();
  }, [id]);

  useEffect(() => {
    if (property) {
      const sub = parseFloat(property.Rent);
      setSubtotal(sub);
      const estimatedTotal = sub + shippingFee + tax - discount;
      setEstimatedTotal(estimatedTotal);
      const totalSavings = discount;
      setTotalSavings(totalSavings);
    }
  }, [property, shippingFee, tax, discount]);

  const applyPromoCode = () => {
    if (promoCode === 'SAVE10') {
      setDiscount(subtotal * 0.1);
    }
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const placeOrder = () => {
    // Here you can implement your logic to place the order, e.g., send a request to the server.
    onOpen();
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>Checkout</Heading>
      {property ? (
        <Box>
          <Stack spacing={4}>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              p={4}
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
            >
              <Image
                src={property.images[0]} // Assuming first image is used as thumbnail
                alt={property.title}
                boxSize="100px"
                objectFit="contain"
              />
              <Box flex="1" ml={4}>
                <Text fontWeight="semibold">{property.title}</Text>
                <Text>${property.Rent}</Text>
              </Box>
            </Flex>
          </Stack>
          <Box mt={8}>
            <Text fontSize="xl" fontWeight="bold">
              Order Summary
            </Text>
            <Flex justifyContent="space-between" mt={4}>
              <Text>Subtotal:</Text>
              <Text>${subtotal.toFixed(2)}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>Shipping Fee:</Text>
              <Text>${shippingFee.toFixed(2)}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>Estimated Tax:</Text>
              <Text>${tax.toFixed(2)}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>Discount:</Text>
              <Text>-${discount.toFixed(2)}</Text>
            </Flex>
            <Flex justifyContent="space-between" fontWeight="bold">
              <Text>Estimated Total:</Text>
              <Text>${estimatedTotal.toFixed(2)}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>Total Savings:</Text>
              <Text>-${totalSavings.toFixed(2)}</Text>
            </Flex>
            <Flex mt={4}>
              <Input
                placeholder="Enter promo code"
                value={promoCode}
                onChange={handlePromoCodeChange}
              />
              <Button ml={2} onClick={applyPromoCode}>
                Apply
              </Button>
            </Flex>
            <Flex mt={4} justifyContent="space-between">
              <Button bg={'black'} color={'white'} onClick={placeOrder}>Place Order</Button>
            </Flex>
          </Box>
        </Box>
      ) : (
        <Text>Loading property details...</Text>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Placed Successfully!</ModalHeader>
          <ModalBody>
            <Text>Congratulations! Order has been Placed Successfully. 🥳</Text>
          </ModalBody>
          <ModalFooter>
            <Link to={'/wishlist'}>
              <Button  bg={'black'} color={'white'} mr={3} onClick={onClose} >
                Go back to Wishlist? ❤️
              </Button>
            </Link>
            <Button bg={'black'} color={'white'} onClick={() => window.location.href = '/' }>Continue Shopping</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Payment;
