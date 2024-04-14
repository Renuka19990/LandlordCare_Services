import React, { useEffect } from 'react';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVacantProperty } from '../Redux/actions';

export default function VacantPropertiesList() {
  const { VacantProperties } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVacantProperty());
  }, [dispatch]);

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Vacant Properties
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} justifyContent={"center"} alignItems={"center"}>
        {VacantProperties && VacantProperties.length > 0 ? (
          VacantProperties.map((property) => (
            <Box key={property.id} borderWidth="1px" borderRadius="md" p={4} mb={4}>
              <Heading as="h3" size="md" mb={2}>
                {property.address}, {property.city}, {property.state} {property.zipcode}
              </Heading>
              <img src={property.image_url} alt={property.address} style={{ maxWidth: 'full', height: '300px',objectFit:"cover"}} />
              <Text>Description: {property.description}</Text>
              <Text>Rent Amount: ${property.rent_amount}</Text>
              <Text>Available From: {property.available_from}</Text>
            </Box>
          ))
        ) : (
          <Text>No vacant properties found.</Text>
        )}
      </Grid>
    </Box>
  );
}
