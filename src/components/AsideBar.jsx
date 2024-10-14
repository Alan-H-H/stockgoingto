
import { Flex, Link, Image } from '@chakra-ui/react'
import StockPieChart  from './StockpieChart'
import BannerProgramador from '../assets/Banner-programador.jpeg'

const AsideBar = () => {

  return (
    <Flex 
  w={{ md: "20%", base: '100%' }} 
  bg={"#284907"} 
  align={'center'} 
  justify='flex-start'
  pb={'1em'} 
  display={"flex"} 
  flexDirection={"column"} 
  h={{ md: "85vh", base: 'auto' }} 
  overflowY="auto"
>

  <StockPieChart />
  <Link 
    mt="auto" // Pushes the link to the bottom
    target="_blank" 
    rel="noopener noreferrer"
    href='https://alan-hackbartt.netlify.app'
  >
    <Image 
      w={'250px'}
      borderRadius={'.5em'}
      mt={'5'}
      src={BannerProgramador} 
      alt=""
    />
  </Link>  
</Flex>


  )
}

export default AsideBar