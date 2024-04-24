import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Grid, Heading, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVacantProperty } from '../Redux/actions';
import { NavLink } from 'react-router-dom';

export default function VacantPropertiesList() {
  const { VacantProperties } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    dispatch(fetchVacantProperty());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query
  };

  const filteredProperties = VacantProperties.filter(property => {
    return (
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.zipcode.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  
  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Vacant Properties
      </Heading>
  
      <Flex mb={4} alignItems="center">
        <InputGroup>
          <InputLeftElement pointerEvents="none" />
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by location"
            borderRadius="md"
            bg="white"
            border="1px solid #ccc"
            _hover={{ borderColor: "gray.400" }}
            _focus={{ borderColor: "blue.400" }}
          />
        </InputGroup>
      </Flex>

      <Grid templateColumns="repeat(3, 1fr)" gap={6} justifyContent={"center"} alignItems={"center"}>
        {filteredProperties && filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <Box key={property.id} borderWidth="1px" borderRadius="md" p={4} mb={4}>
              <Heading as="h3" size="md" mb={2}>
                {property.address}, {property.city}, {property.state} {property.zipcode}
              </Heading>
              <img src={property.image_url} alt={property.address} style={{ maxWidth: 'full', height: '300px', objectFit: "cover" }} />
              <Text>Description: {property.description}</Text>
              <Text>Rent Amount: ${property.rent_amount}</Text>
              <Text>Available From: {property.available_from}</Text>
              <Button bg={"#a9b0e2"} as={NavLink} to={`/vacant-properties/${property.id}`}>Visit</Button>
            </Box>
          ))
        ) : (
          <Text>No vacant properties found.</Text>
        )}
      </Grid>
    </Box>
  );
}
