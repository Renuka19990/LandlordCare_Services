import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast, FormControl, FormLabel, Input, Button, Heading, Box } from '@chakra-ui/react';
import { loginUser } from '../Redux/actions';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
  
    // Check if email is admin@gmail.com and password is 'admin'
    const isAdmin = formData.email === "admin@gmail.com" && formData.password === "admin";
  
    dispatch(loginUser(formData))
      .then(() => {
        if (isAdmin) {
          // If the user is an admin, redirect to the admin page
          navigate('/admin');
        } else {
          // For regular users, store user data in local storage
          localStorage.setItem('userEmail', formData.email);
          localStorage.setItem('userPassword', formData.password);
          navigate('/');
        }
  
        toast({
          title: 'Login Successful',
          description: 'User logged in successfully',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: 'Login Failed',
          description: 'Invalid credentials',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  };
  
  return (
    < >
      <Box   width={{ base: "90%", md: "40%" }} margin={"auto"} boxShadow={"xl"} padding={10} borderRadius={10} marginTop={20}>
        <Heading className='heading' style={{ width: 'fit-content', margin: 'auto', fontSize: '40px' }}>
          Login Page
        </Heading>
        <form onSubmit={handleLogin}>
          <FormControl style={{ margin: 'auto', fontSize: '19px' }}>
            <FormLabel>Username</FormLabel>
            <Input
              className='usernamelogin'
              type='text'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl style={{ margin: 'auto', fontSize: '19px' }}>
            <FormLabel>Password</FormLabel>
            <Input
              className='passwordlogin'
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>
          <Button className='btn' type='submit' bg={"#a9b0e2"} width={{ base: "40%", md: "40%" }} >
            Login
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Login;
