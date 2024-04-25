import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../Redux/actions';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Box,
} from '@chakra-ui/react';

export const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector((store) => store.users);
  console.log(users);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
    navigate('/login');
  };

  return (
    <>
      <Box  width={{ base: "90%", md: "40%" }} margin={"auto"} boxShadow={"xl"} padding={10} borderRadius={10} marginTop={20}>
        <Heading
          className="heading"
          style={{
            width: 'fit-content',
            margin: 'auto',
            fontSize: '40px',
          }}
        >
          SignUp Page
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl style={{ margin: 'auto', fontSize: '19px' }}>
            <FormLabel>First Name</FormLabel>
            <Input
              className="username"
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl style={{ margin: 'auto', fontSize: '19px' }}>
            <FormLabel>Last Name</FormLabel>
            <Input
              className="username"
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl style={{ margin: 'auto', fontSize: '19px' }}>
            <FormLabel>Email</FormLabel>
            <Input
              className="username"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl style={{ margin: 'auto', fontSize: '19px' }}>
            <FormLabel>Password</FormLabel>
            <Input
              className="password"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>
          <Button className="btn" type="submit" bg={"#a9b0e2"} width={{ base: "40%", md: "40%" }}>
            Sign Up
          </Button>
        </form>
      </Box>
    </>
  );
};

export default SignUp;
