import React, { useState, useContext } from 'react';
import { Flex, Input, Box, Link, Button, FormControl, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';

export const LoginClient = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
  
    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, inputs.email, inputs.password);

      const user = userCredential.user;
  
      //console.log("User logged in:", user);

      navigate("/dashboard/" + user.uid);
    } catch (err) {
      //console.error("Error during login:", err.message);
      setError("Error en el Login, verifica el ingreso"); 
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
  
    const auth = getAuth();
  
    try {
      // Send a password reset email
      await sendPasswordResetEmail(auth, inputs.email);
      setError("Email de reseteo de contraseña enviado. Por favor revise su correo.");
    } catch (err) {
      //console.error("Error durante el reseteo de contraseña:", err.message);
      setError("Error durante el reseteo de contraseña"); 
    }
  };
  

  const home = () =>{
    navigate('/')
  }

  const handleClick = () =>{
    home()
  }

  return (
    <FormControl>
      <Flex h={"100vh"} alignItems={"center"} bg={"#284907"}>
        <Flex p={'3'} flexDirection={'column'} w={{base: '75%', md:"25%"}} align={"center"} m={"0 auto"} bg={'White'} borderRadius={'1em'} boxShadow={"10px 10px #ff4f00"}>
          <Button onClick={handleClick} alignSelf={'flex-end'}>
            <CloseIcon />
          </Button>
          <Box fontWeight={"700"}>LOGIN</Box>
            <Input placeholder='Email' name='email' m={'1em'} onChange={handleChange} />
              <Input placeholder='Password' type='password' name='password' m={'1em'} onChange={handleChange} />
          <Button variant='solid' colorScheme='orange' size='md' m={'1em'} onClick={handleSubmit}>Login</Button>
          {err && 
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>{err}</AlertTitle>
          </Alert>
          }
          <Button bg={'white'} onClick={()=>navigate("/register")} m={'.3em'}>Registrarse</Button>
          <Button bg={'white'} onClick={handleReset} m={'.3em'}>Olvidaste tu contraseña?</Button>
        </Flex>
      </Flex>
    </FormControl>
  );
};



