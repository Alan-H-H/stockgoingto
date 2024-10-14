
import AccIones from './AccIones.jsx'
import HeaderNav from './HeaderNav.jsx'
import { AuthContext } from '../context/authContext.jsx'
import { StarIcon } from '@chakra-ui/icons'
import { useContext } from 'react'
import  { useNavigate } from 'react-router-dom'
import { Button, Flex } from '@chakra-ui/react';

export function DashboardMain() {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
      };
    
    const {currentUser} = useContext(AuthContext)

    const goToFavorites = () => {
      navigate("/favorites/"+currentUser.uid)
    }

    if(currentUser){
        return (
        <>
        <HeaderNav />
        <Flex bg={"#284907"} 
           p={4}
           gap={2} >
          <Button 
           onClick={goToFavorites}
           margin={'0 auto'} 
           fontSize={'18'}
           color={'white'}
           bg={'black'}
           mb={'.4em'}
           _hover={{ opacity: 0.8 }}
           ><StarIcon /> Ver Favoritos </Button>
        </Flex>
        <AccIones />
        </>
      )}
      else{goToLogin}
  
}
