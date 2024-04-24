import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Flex, Image, Text, Button, Input, Stack, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const PropertyPayment = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee] = useState(5);
  const [tax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://landloards-json-server.onrender.com/properties'
        );
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedProperty) {
      const sub = parseFloat(selectedProperty.Rent);
      setSubtotal(sub);
      const estimatedTotal = sub + shippingFee + tax - discount;
      setEstimatedTotal(estimatedTotal);
      const totalSavings = discount;
      setTotalSavings(totalSavings);
    }
  }, [selectedProperty, shippingFee, tax, discount]);

  const applyPromoCode = () => {
    if (promoCode === 'SAVE10') {
      setDiscount(subtotal * 0.1);
    }
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const placeOrder = () => {
    onOpen();
  };

  const handlePayment = () => {
    setIsPaymentSuccess(true);
    onClose();
  };

  const handlePaymentSuccessClose = () => {
    setIsPaymentSuccess(false);
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>Checkout</Heading>
      <Stack spacing={4}>
        {properties.map(property => (
          <Flex
            key={property.id}
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
            <Button onClick={() => { setSelectedProperty(property); placeOrder(); }}>Payment</Button>
          </Flex>
        ))}
      </Stack>
      {selectedProperty && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Payment</ModalHeader>
            <ModalBody>
              <Text>Congratulations! You've selected "{selectedProperty.title}" for rent at ${selectedProperty.Rent}.</Text>
              <Text>Please proceed with the payment to confirm your booking.</Text>
            </ModalBody>
            <ModalFooter>
              <Button bg={'black'} color={'white'} mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button bg={'black'} color={'white'} onClick={() => handlePayment()}>
                Pay Now
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <AlertDialog
        isOpen={isPaymentSuccess}
        leastDestructiveRef={cancelRef}
        onClose={handlePaymentSuccessClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Payment Successful
            </AlertDialogHeader>

            <AlertDialogBody>
              Your payment has been successfully processed. You can now move in!
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handlePaymentSuccessClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default PropertyPayment;
