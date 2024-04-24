import React from 'react';
import { Grid, GridItem, Box, Heading, Image, AspectRatio } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6} p={6}>
      <GridItem colSpan={{ base: 2, md: 1 }}>
        <Link to={"/properties"}>
        <Box bg="gray.500" p={4} borderRadius="md">
          <Heading as="h2" size="lg" mb={4}>Properties</Heading>
          <AspectRatio ratio={16 / 9} mb={4}>
            <Image src="https://images.trvl-media.com/lodging/4000000/3620000/3610400/3610337/65a6f39c.jpg?impolicy=fcrop&w=742&h=417&p=0.5&q=mediumHigh" alt="Properties" />
          </AspectRatio>
          {/* Add your properties component here */}
        </Box></Link>
     
      </GridItem>
      <GridItem colSpan={{ base: 2, md: 1 }}>
      <Link to={"/tenants"}>
        <Box bg="gray.500" p={4} borderRadius="md">
          <Heading as="h2" size="lg" mb={4}>Tenants</Heading>
          <AspectRatio ratio={16 / 9} mb={4}>
            <Image src="https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/at%2Farchive%2F3caf3110f78f22e6b4960b82ee4f1d3a4478c812" alt="Tenants" />
          </AspectRatio>
          {/* Add your tenants component here */}
        </Box></Link>
      </GridItem>
      <GridItem colSpan={{ base: 2, md: 1 }}>
      <Link to={"/vacant-properties"}>
        <Box bg="gray.500" p={4} borderRadius="md">
          <Heading as="h2" size="lg" mb={4}>Vacant Properties</Heading>
          <AspectRatio ratio={16 / 9} mb={4}>
            <Image src="https://st4.depositphotos.com/13746642/27142/i/600/depositphotos_271428338-stock-photo-abandoned-one-level-home-with.jpg" alt="Vacant Properties" />
          </AspectRatio>
          {/* Add your vacant properties component here */}
        </Box>
        </Link>
      </GridItem>
      <GridItem colSpan={{ base: 2, md: 1 }}>
      <Link to={"/expenses"}>
        <Box bg="gray.500" p={4} borderRadius="md">
          <Heading as="h2" size="lg" mb={4}>Expenses</Heading>
          {/* Add your expenses component here */}
          <AspectRatio ratio={16 / 9} mb={4}>
            <Image src="https://images.squarespace-cdn.com/content/v1/5e987637e1c6961885db98a3/1666227941092-XEDUI457G96YGCA23DYL/Vision_Blogs_October_Set2_5+Biggest+Expenses+Retirees.png" alt="Expenses" />
          </AspectRatio>
        </Box>
        </Link>
      </GridItem>
    </Grid>
  );
}
