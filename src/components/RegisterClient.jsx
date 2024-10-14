import React, { useState } from 'react';
import { Flex, Input, Box, Button, Select, FormControl, 
  Alert,
  AlertIcon,
  AlertTitle, } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { db } from '../../firebase';

export const RegisterClient = () => {
  const [formValues, setFormValues] = useState({
    nombre: '',
    apellido: '',
    email: '',
    pais: '',
    telefono: '',
    plan: '',
    tiempo_del_plan: '',
    password: '',
    confirm_password: '', 
  });

  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
};

const validateForm = () => {
  if (!formValues.nombre || !formValues.apellido || !formValues.email || !formValues.password || formValues.password !== formValues.confirm_password) {
    setFormError("Por favor llena todos los campos y que la contraseña sea la misma.");
    return false;
  }
  return true;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const auth = getAuth();

  try {
    // Create user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, formValues.email, formValues.password);

    // Get the registered user
    const user = userCredential.user;

    // Prepare user data to be stored in Firestore
    const userData = {
      uid: user.uid, // User's UID from Firebase
      nombre: formValues.nombre,
      apellido: formValues.apellido,
      email: formValues.email,
      pais: formValues.pais,
      telefono: formValues.telefono,
      plan: formValues.plan,
      tiempo_del_plan: formValues.tiempo_del_plan,
      // Add any other user details you want to store
    };

    // Store user data in Firestore with email as document ID
    await setDoc(doc(db, "users", user.email), userData);
    loginPage()
  } catch (err) {
    //console.error("Error durante la registración:", err.message);
    setFormError("Error durante la registración"); 
  }
};

const navigate = useNavigate();
const home = () => navigate('/')
const loginPage = () => navigate('/login')

const handleClick = () =>{
  home()
}

  return (
    <FormControl as="form" onSubmit={handleSubmit} isInvalid={!!formError}>
      <Flex h={"100vh"} alignItems={"center"} bg={"#284907"}>
        <Flex p={'2'} display={"flex"} flexDirection={'column'} w={{base:'75%', md:"35%"}} align={"center"} m={"0 auto"} bg={'White'} borderRadius={'.5em'} boxShadow={"10px 10px #ff4f00"}>
          <Button onClick={handleClick} alignSelf={'flex-end'}>
            <CloseIcon />
          </Button>
          <Box fontWeight={"700"}>REGISTRO</Box>
          <Input placeholder='Nombre' m={'.5em'} name='nombre' onChange={handleChange} />
          <Input placeholder='Apellido' m={'.5em'} name='apellido' onChange={handleChange} />
          <Input placeholder='Email' m={'.5em'} name='email' onChange={handleChange} />
          <Input placeholder='Pais' m={'.5em'} name='pais' onChange={handleChange} />
          <Input placeholder='Telefono' m={'.5em'} name='telefono' onChange={handleChange} />
          <Select placeholder='Selecciona un plan' name='plan' onChange={handleChange}>
            <option value='Gratuito'>Gratuito</option>
          </Select>
          <Select placeholder='Tiempo del plan' m={'.5em'} name='tiempo_del_plan' onChange={handleChange}>
            <option value='Indeterminado'>Indeterminado</option>
          </Select>
          <Input type="password" placeholder='Contraseña' m={'.5em'} name='password' onChange={handleChange} />
          <Input type="password" placeholder='Confirmar Contraseña' name='confirm_password' m={'.5em'} onChange={handleChange} />
          {formError && 
            <Alert status='warning'>
            <AlertIcon />
            <AlertTitle>{formError}</AlertTitle>
            </Alert>}
          <Button colorScheme='orange' size='md' m={'.5em'} type='submit'>Registrar</Button>
        </Flex>
      </Flex>
    </FormControl>
  );
};
