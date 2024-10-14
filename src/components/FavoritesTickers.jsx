import React, { useContext, useState, useEffect } from 'react';
import HeaderNav from './HeaderNav';
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Td, Tbody, Tfoot, Button, Flex, Image } from "@chakra-ui/react";
import banderinVerde from "../assets/banderinVerde.svg"
import banderinRojo from "../assets/banderin-transparente-rojo.svg"
import banderinAmarillo from "../assets/banderin-transparente-amarillo.svg"
import banderinNegro from "../assets/banderin-transparente-negro.svg"
import { AuthContext } from '../context/authContext';
import { ViewIcon } from '@chakra-ui/icons';
import AsideBar from './AsideBar';
import { useNavigate } from 'react-router-dom';

export const FavoritesTickers = () => {
    const { currentUser } = useContext(AuthContext);
    const [storedFavorites, setStoredFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setStoredFavorites(favorites);
    }, []);

    const handlePanelNavigation = () => {
        if (currentUser?.uid) {
            navigate(`/dashboard/${currentUser.uid}`);
        }
    };

    return (
        <>
            <HeaderNav />
            <Flex 
                bg={"#284907"} 
                display={'flex'} 
                justify={'center'}
                p={4} 
                gap={2} 
            >
                <Button 
                    onClick={handlePanelNavigation}
                    fontSize={'18'} 
                    p={'3'} 
                    color={'white'}
                    bg={'black'}
                    mb={'.4em'}
                    _hover={{ opacity: 0.8 }}
                >
                    <ViewIcon mr={'.3em'} /> Ver Todos los Activos
                </Button>
            </Flex>
            <Flex display={'flex'}
            flexDirection={{base:'column', md:'row'}}>
            <AsideBar />
            <TableContainer bg={'darkgray'} w={{
            base:'100%',
            md: '80%'
            }} float={"right"}>
                <Table variant='striped' size="sm">
                    <TableCaption>Stocks</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Logo</Th>
                            <Th>Company</Th>
                            <Th>Mercado</Th>
                            <Th>Ticker</Th>
                            <Th>Pais</Th>
                            <Th>Tendencia</Th>
                            <Th>Grafico</Th>
                            <Th>Detalles</Th>
                            <Th>Noticias</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {storedFavorites.length > 0 ? (
                            storedFavorites.map(stock => (
                                <Tr key={stock.id} className="stock-row">
                                    <Td><img src={stock.logo} alt={`${stock.company} logo`} width="50" height="50" /></Td>
                                    <Td>{stock.company}</Td>
                                    <Td>{stock.mercado}</Td>
                                    <Td>{stock.ticker}</Td>
                                    <Td>{stock.pais}</Td>
                                    
                                        
                                    <Td 
                                    fontSize={18}
                                    fontWeight={700}
                                        >
                                            <Flex align={'center'}>
                                        {stock.tendencia === 'Alcista' ? <Image src={banderinVerde} width="10" /> :
                                        stock.tendencia === 'Bajista' ? <Image src={banderinRojo} width="10" /> :
                                        stock.tendencia === 'Indecision' ? <Image src={banderinAmarillo} width="10" /> :
                                        <Image src={banderinNegro} width="10" />}{stock.tendencia}
                                       
                                            </Flex>
                                    </Td>
                                    <Td><a href={stock.grafico} target="_blank" rel="noopener noreferrer">Grafico</a></Td>
                                    <Td><a href={stock.detalles} target="_blank" rel="noopener noreferrer">Details</a></Td>
                                    <Td><a href={stock.noticias} target="_blank" rel="noopener noreferrer">News</a></Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan={9}>No data available</Td>
                            </Tr>
                        )}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th></Th>
                            <Th></Th>
                            <Th></Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            </Flex>
            
        </>
    );
};

