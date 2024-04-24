import React from 'react';
import { Grid, GridItem, Box, Heading } from '@chakra-ui/react';

export default function Home() {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6} p={6}>
      <GridItem colSpan={{ base: 2, md: 1 }}>
        <Box bg="gray.600" p={4} borderRadius="md">
          <Heading as="h2" size="lg" mb={4}>Properties</Heading>
          {/* Add your properties component here */}
        </Box>
      </GridItem>
      <GridItem colSpan={{ base: 2, md: 1 }}>
        <Box bg="gray.600" p={4} borderRadius="md">
          <Heading as="h2" size="lg" mb={4}>Tenants</Heading>
          {/* Add your tenants component here */}
        </Box>
      </GridItem>
      <GridItem colSpan={{ base: 2, md: 1 }}>
        <Box bg="gray.600" p={4} borderRadius="md">
          <Heading as="h2" size="lg" mb={4}>Vacant Properties</Heading>
          {/* Add your vacant properties component here */}
        </Box>
      </GridItem>
      <GridItem colSpan={{ base: 2, md: 1 }}>
        <Box bg="gray.600" p={4} borderRadius="md">
          <Heading as="h2" size="lg" mb={4}>Expenses</Heading>
          {/* Add your expenses component here */}
        </Box>
      </GridItem>
    </Grid>
  );
}
