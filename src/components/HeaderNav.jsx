import { Flex, Box , Link, Button, Image,
  Alert,
  AlertIcon,
  AlertDescription,
 } from '@chakra-ui/react'
import React, {useContext} from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import Logo  from '../assets/logo.png'
import Banner  from '../assets/banner-comunidad.png'
import Registrate from '../assets/registratesgto.png'
import Tendencias from '../assets/sgtotendencias.png'


const HeaderNav = () => {

  const navigate = useNavigate()

  const gotoRegister = () =>{
    navigate('/register')
  }

  const { logout, currentUser } = useContext(AuthContext);

  return (
<Flex 
  justifyContent={{
    base:"center",
    md:"space-between"
  }}
  p={'2em'} 
  bg="#284907" 
  flexDirection={{
    base: 'column',  
    md: 'row'        
  }} 
  gap={{
    base: '10px',    
    md: '0px'        
  }}
  alignItems={'center'} 
>
  <Image src={Logo} alt="Logo Principal" />

  <Link 
    href='https://chat.whatsapp.com/LfK5C1FofSj3PAFXrzGzvY' 
    target='blank'
  >
    <Image 
      src={Banner} 
      cursor={'pointer'}  
      alt="banner_principal" 
    /> 
  </Link>

  <Image 
    w={'250px'}
    borderRadius={'.5em'}
    src={Tendencias} 
    alt=""
  />

  <Link 
    onClick={gotoRegister} 
  >
    <Image 
      src={Registrate} 
      cursor={'pointer'}  
      alt="banner_principal" 
    /> 
  </Link>

  <Flex 
    align={'center'} 
    flexDirection={{
      base: 'column',  
      md: 'row'       
    }} 
    justify={'center'} 
    alignItems={'center'} 
    m={{ base: '0 auto', md: '0' }}
    textAlign={'center'}
  >
    <Box 
      textAlign={"center"} 
      display={'flex'} 
      flexDirection={'row'} 
      alignItems={'center'} 
      justify={'center'} 
      m={{ base:'0 auto', md: '0' }} 
    >
      {(!currentUser) ? 
        <Button 
          onClick={() => navigate("/login")} 
          colorScheme={"orange"} 
          fontSize={'18'} 
          borderTop={'1px solid orange'} 
          variant='ghost' 
          mr={{base: '0', md:".5em"}}
        >
          Login
        </Button> 
        : (
          <Flex align={'center'}mr={{base: '0', md:'.5em'}} 
          color={'white'}>
              {currentUser.nombre} Plan {currentUser.plan}
            <Alert status='info' borderRadius={'.5em'} mr={'.5em'}>
              <AlertIcon />
              <AlertDescription>Nuevos planes viniendo</AlertDescription>
            </Alert>
            <Button 
            colorScheme='orange' 
            onClick={logout} 
            ml={{ base: '0', md: '0.5em' }} 
            >
        Logout
      </Button>
          </Flex>
      )}
      
      
    </Box>
  </Flex>
</Flex>

  )
}

export default HeaderNav