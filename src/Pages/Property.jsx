// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Box, Button, Grid, Heading, Highlight, Link, Text } from "@chakra-ui/react";
// import { fetchProperties } from "../Redux/actions";
// import { NavLink } from "react-router-dom";

// function Property() {
//   const { properties } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchProperties());
//   }, [dispatch]);

//   return (
//     <Grid templateColumns="repeat(4, minmax(250px, 1fr))" gap={6}>
//       <Heading as="h2" size="lg" gridColumn="1 / -1" mb={4}>
//         Properties
//       </Heading>
//       {properties.length > 0 ? (
//         properties.map((property) => (
//           <Box
//             key={property.id}
//             borderWidth="1px"
//             borderRadius="md"
//             p={4}
//             mb={4}
//           >
//             <Heading as="h3" size="md" mb={2}>
//               {property.title}
//             </Heading>
//             <div style={{ maxWidth: "100%", height: "auto", overflow: "hidden", }}>
//               <img
//                 src={property.images[0]}
//                 alt={property.title}
//                 style={{ width: "100%", height: "200px",objectFit:"cover" }}
//               />
//             </div>
//             <Text>Location: {property.location}</Text>
//             <Text>Rent: ${property.Rent}</Text>
//             <Button as={NavLink} to="/payment" bg={"#a9b0e2"}>Unlock Your Rental</Button>


//           </Box>
//         ))
//       ) : (
//         <Text textAlign={"center"}>Loading.......</Text>
//       )}
//     </Grid>
//   );
// }

// export default Property;
// Property.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Flex, Grid, Heading, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { fetchProperties, sortPropertiesHighToLow, sortPropertiesLowToHigh } from "../Redux/actions";
import { NavLink } from "react-router-dom";

function Property() {
  const { properties, totalPages } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    dispatch(fetchProperties(currentPage));
  }, [dispatch, currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage => currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    if (event.target.value === "highToLow") {
      dispatch(sortPropertiesHighToLow());
    } else if (event.target.value === "lowToHigh") {
      dispatch(sortPropertiesLowToHigh());
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query
  };

  const filteredProperties = properties.filter(property =>
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Heading as="h2" size="lg" gridColumn="1 / -1" mb={4}>
        Properties
      </Heading>

      <Flex mb={4} justifyContent={"flex-end"}>
        <select value={sortBy} onChange={handleSortChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}>
          <option value="">Sort by</option>
          <option value="highToLow">Rent High to Low</option>
          <option value="lowToHigh">Rent Low to High</option>
        </select>
      </Flex>

    
      <Flex mb={4} alignItems="center">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
         
        />
          
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


      <Grid templateColumns="repeat(4, minmax(250px, 1fr))" gap={6}>
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
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
              <div style={{ maxWidth: "100%", height: "auto", overflow: "hidden" }}>
                <img
                  src={property.images[0]}
                  alt={property.title}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              </div>
              <Text>Location: {property.location}</Text>
              <Text>Rent: ${property.Rent}</Text>
              <Button as={NavLink} to="/payment" bg={"#a9b0e2"}>
                Unlock Your Rental
              </Button>
            </Box>
          ))
        ) : (
          <Text textAlign={"center"}>Loading....</Text>
        )}
        {/* Pagination Controls */}
        <Box gridColumn="1 / -1" textAlign="center">
          <Button onClick={prevPage} disabled={currentPage === 1}>
            Previous Page
          </Button>
          <Text display="inline-block" mx={4}>
            Page {currentPage} of {totalPages}
          </Text>
          <Button onClick={nextPage} disabled={currentPage === totalPages}>
            Next Page
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}

export default Property;
