import React, { useEffect } from 'react';
import { Box, Grid, Heading, Text, Badge } from '@chakra-ui/react';
import { fetchTenants } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Tenant() {
  const { tenants } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTenants());
  }, [dispatch]);

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
      <Heading as="h2" size="lg" gridColumn="1 / -1" mb={4}>
        Tenants
      </Heading>
      {tenants.length > 0 ? (
        tenants.map((tenant) => (
          <Box key={tenant.id} borderWidth="1px" borderRadius="md" p={4} mb={4}>
            <Heading as="h3" size="md" mb={2}>
              {tenant.name}
            </Heading>
            <Text>Email: {tenant.email}</Text>
            <Text>Phone: {tenant.phone}</Text>
            <Text>Rent Amount: ${tenant.rent_amount}</Text>
            <Text>Lease Start Date: {tenant.lease_start_date}</Text>
            <Text>Lease End Date: {tenant.lease_end_date}</Text>
            <Badge colorScheme={tenant.status === 'Active' ? 'green' : 'red'}>{tenant.status}</Badge>
          </Box>
        ))
      ) : (
        <Text gridColumn="1 / -1">Loading......</Text>
      )}
    </Grid>
  );
}
