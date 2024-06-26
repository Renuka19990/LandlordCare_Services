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
import { Link, NavLink } from "react-router-dom";
import { userLogout } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";

const listOfLinks = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Property",
    link: "/properties",
  },
  {
    id: 3,
    name: "Tenants",
    link: "/tenants",
  },
  {
    id: 4,
    name: "Expenses",
    link: "/expenses",
  },
  {
    id: 5,
    name: "VacantProperty",
    link: "/vacant-properties",
  },
  {
    id: 6,
    name: "Reports",
    link: "/reports",
  },
];

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const {isAuth} = useSelector(store => store.auth);
  const dispatch=useDispatch();
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

          <Flex alignItems={"baseline"} justifyContent={"center"}>
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

{isAuth?(  <Link to="/login"> <Button
                size={"sm"}
                bg={"#a9b0e2"}
                color={"white"}
             onClick={()=>dispatch(userLogout())}
              >
                Logout
              </Button></Link>):(   <Link to="/login"><Button
                size={"sm"}
                bg={"#a9b0e2"}
                color={"white"}
    
                mt={2}
              >
                Login
              </Button></Link>)}
              <Link to="/signUp"><Button >
                SignUp
              </Button></Link>
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
