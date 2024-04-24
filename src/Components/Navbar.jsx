import React from "react";
import { FaLandmark } from "react-icons/fa";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  IconButton,
  useMediaQuery,
  Image,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

const listOfLinks = [
  {
    id: 1,
    name: "Property",
    link: "/",
  },
  {
    id: 2,
    name: "Tenants",
    link: "/tenants",
  },
  {
    id: 3,
    name: "Expenses",
    link: "/expenses",
  },
  {
    id: 4,
    name: "VacantProperty",
    link: "/vacant-properties",
  },
  {
    id: 5,
    name: "Reports",
    link: "/reports",
  },
];

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} py={3}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          wrap={isLargerThan768 ? "nowrap" : "wrap"}
        >
          <Flex gap={20} alignItems="center">
          <Box display="flex" alignItems="center">
      <Box
        borderRadius="full"
        bgGradient="linear(to-l, #7928CA,#add8e6)"
        w="40px"
        h="40px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mr={3}
      >
        <Text color="white" fontWeight="bold" fontSize="xl">
        <FaLandmark />
        </Text>
      </Box>
      <Text fontSize="xl" fontWeight="bold" color="#7928CA" fontFamily="Poppins">
      EstateEcho
      </Text>
    </Box>
            {isLargerThan768 && (
              <Flex gap={10} fontSize={20}>
                {listOfLinks.map((ele) => (
                  <NavLink
                    key={ele.id}
                    to={ele.link}
                    style={({ isActive }) =>
                      isActive ? { color: "#7928CA" } : { color: "gray" }
                    }
                  >
                    {ele.name}
                  </NavLink>
                ))}
              </Flex>
            )}
          </Flex>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              {!isLargerThan768 && (
                <IconButton
                  aria-label="Open Menu"
                  size="lg"
                  icon={<HamburgerIcon />}
                  onMouseEnter={onOpen}
                  onMouseLeave={onClose}
                />
              )}

              <Button as={NavLink} to="/login">
                Login
              </Button>
              <Button as={NavLink} to="/signUp">
                SignUp
              </Button>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      {isOpen && (
        <Box bg="gray.100" px={4} py={2} display="flex" flexDirection="column">
          {listOfLinks.map((ele) => (
            <NavLink
              key={ele.id}
              to={ele.link}
              style={({ isActive }) =>
                isActive ? { color: "blue" } : { color: "gray" }
              }
              onClick={onClose}
            >
              {ele.name}
            </NavLink>
          ))}
        </Box>
      )}
    </>
  );
}
