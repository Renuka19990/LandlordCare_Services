import React, { useEffect, useState } from "react";
import { Box, Image, Text, Flex, Badge, Divider, Heading, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';

export default function SingleProperty() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isBookingSuccessModalOpen, setBookingSuccessModalOpen] = useState(false);

  const fetchProperty = () => {
    axios.get(`https://landloards-json-server.onrender.com/properties/${id}`)
      .then((response) => {
        setProperty(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const handlePaymentClick = () => {
    setPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setPaymentModalOpen(false);
  };

  const handleBookProperty = () => {
    // Here you can implement your booking logic, e.g., send a request to the server.
    // For demonstration purposes, let's assume the booking is successful.
    setBookingSuccessModalOpen(true);
  };

  const handleCloseBookingSuccessModal = () => {
    setBookingSuccessModalOpen(false);
  };

  return (
    <Box p={6}>
      {property ? (
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            {property.title}
          </Heading>
          <Text mb={4}>{property.description}</Text>
          <Flex wrap="wrap" mb={4}>
  {property.images.slice(0, 5).map((image, index) => (
    <Box key={index} w={{ base: '100%', sm: '50%', md: '20%' }} p={2} position="relative">
      <Box
        borderRadius="md"
        overflow="hidden"
        position="relative"
        pb="75%" // 4:3 aspect ratio
        w="100%"
      >
        <Image
          src={image}
          alt={`Image ${index + 1}`}
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          objectFit="cover"
        />
      </Box>
    </Box>
  ))}
</Flex>

          <Button onClick={handlePaymentClick} bg={"#a9b0e2"}>Payment</Button>

          <Flex alignItems="center" mb={4}>
            <Text fontSize="lg" fontWeight="bold">Location:</Text>
            <Text ml={2}>{property.location}</Text>
          </Flex>
          <Flex alignItems="center" mb={4}>
            <Text fontSize="lg" fontWeight="bold">Rent:</Text>
            <Text ml={2}>${property.Rent}</Text>
          </Flex>
          <Divider mb={4} />
          <Heading as="h3" size="md" mb={2}>
            Nearby Places
          </Heading>
          <Text>{property.nearBy}</Text>
          <Divider mb={4} />
          <Heading as="h3" size="md" mb={2}>
            Amenities
          </Heading>
          <Flex wrap="wrap" mb={4}>
            {property.amenities.map((amenity, index) => (
              <Badge key={index} variant="subtle" colorScheme="green" m={1}>
                {amenity}
              </Badge>
            ))}
          </Flex>
          <Divider mb={4} />
          <Heading as="h3" size="md" mb={2}>
            Reviews
          </Heading>
          {property.reviews.map((review, index) => (
            <Box key={index} mb={4}>
              <Flex alignItems="center" mb={2}>
                <Image src={review.image} alt={`Reviewer ${index + 1}`} w={12} h={12} borderRadius="full" mr={4} />
                <Flex direction="column">
                  <Text fontSize="lg" fontWeight="bold">{review.name}</Text>
                  <Text fontSize="sm" color="gray.500">{review.city}</Text>
                </Flex>
              </Flex>
              <Text>{review.review_msg}</Text>
              <Flex alignItems="center" mt={2}>
                <Badge variant="subtle" colorScheme="green" mr={2}>
                  {review.rating}
                </Badge>
                <Text fontSize="sm" color="gray.500">Rating</Text>
              </Flex>
            </Box>
          ))}
          {/* Payment Modal */}
          <Modal isOpen={isPaymentModalOpen} onClose={handleClosePaymentModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Payment</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Pay ${property.Rent} for booking this property.</Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="gray" mr={3} onClick={handleClosePaymentModal}>
                  Close
                </Button>
                <Button bg="#a9b0e2" onClick={handleBookProperty}>
                  Book Now
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {/* Booking Success Modal */}
          <Modal isOpen={isBookingSuccessModalOpen} onClose={handleCloseBookingSuccessModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Booking Success</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Congratulations! Property successfully booked.</Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="gray" mr={3} onClick={handleCloseBookingSuccessModal}>
                  Close
                </Button>
                <NavLink to="/">Go to Homepage</NavLink>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
}
