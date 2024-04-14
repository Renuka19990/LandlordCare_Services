import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import { fetchProperties } from "../Redux/actions";

function Property() {
  const { properties } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  return (
    <Grid templateColumns="repeat(4, minmax(250px, 1fr))" gap={6}>
      <Heading as="h2" size="lg" gridColumn="1 / -1" mb={4}>
        Properties
      </Heading>
      {properties.length > 0 ? (
        properties.map((property) => (
          <Box
            key={property.id}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            mb={4}
          >
            <Heading as="h3" size="md" mb={2}>
              {property.title}
            </Heading>
            <div style={{ maxWidth: "100%", height: "auto", overflow: "hidden", }}>
              <img
                src={property.images[0]} // Assuming first image is used as thumbnail
                alt={property.title}
                style={{ width: "100%", height: "200px",objectFit:"cover" }}
              />
            </div>
            <Text>Location: {property.location}</Text>
            <Text>Rent: ${property.Rent}</Text>
          </Box>
        ))
      ) : (
        <Text textAlign={"center"}>Loading.......</Text>
      )}
    </Grid>
  );
}

export default Property;
