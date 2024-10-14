import { TableContainer, Table, TableCaption, Thead, Tr, Th, Td, Tbody, Tfoot, Flex, Image } from "@chakra-ui/react";
import AsideBar from './AsideBar.jsx';
import banderinVerde from "../assets/banderinVerde.svg";
import banderinRojo from "../assets/banderin-transparente-rojo.svg";
import banderinAmarillo from "../assets/banderin-transparente-amarillo.svg";
import banderinNegro from "../assets/banderin-transparente-negro.svg";
import { useState, useEffect } from "react";
import { StarIcon, ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.js";
import HeaderNav from "./HeaderNav.jsx";
import { useNavigate } from "react-router";

export function ContentMain() {
  const [sort, setSort] = useState({ keyToSort: 'mercado', direccion: 'asc' });
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();

  // Predefined Mercado order
  const mercadoOrder = ['1 INDEX', '2 INDEX', '3 INDEX', '4 INDEX', '5 INDEX', '6 INDEX', 'ARG', 'EEUU'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stocksCollection = collection(db, "stocks");
        const querySnapshot = await getDocs(stocksCollection);
        const stocksList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setStocks(stocksList);
      } catch (err) {
        console.error("Error fetching stocks from Firestore:", err);
        setStocks([]);
      }
    };
    fetchData();
  }, []);

  const handleHeaderClick = (header) => {
    setSort(prevSort => ({
      keyToSort: header.label.toLowerCase(),
      direccion: prevSort.keyToSort === header.label.toLowerCase()
        ? (prevSort.direccion === 'asc' ? 'desc' : 'asc')
        : 'desc',
    }));
  };

  const getSortedArray = (arrayToSort) => {
    return arrayToSort.slice().sort((a, b) => {
      let valueA = a[sort.keyToSort] || "";
      let valueB = b[sort.keyToSort] || "";

      // Custom sorting for Mercado based on predefined order
      if (sort.keyToSort === 'mercado') {
        valueA = mercadoOrder.indexOf(valueA);
        valueB = mercadoOrder.indexOf(valueB);
      }

      if (sort.direccion === 'asc') {
        return valueA > valueB ? 1 : (valueA < valueB ? -1 : 0);
      } else {
        return valueA < valueB ? 1 : (valueA > valueB ? -1 : 0);
      }
    });
  };

  const handleRedirect = () => {
    navigate("/login");
  };

  const headers = [
    { label: 'Logo' },
    { label: 'Company' },
    { label: 'Ticker' },
    { label: 'Tendencia' },
    { label: 'Grafico' },
    { label: 'Pais' },
    { label: 'Mercado' },
    { label: 'Detalles' },
    { label: 'Noticias' }
  ];

  return (
    <>
      <HeaderNav />
      <Flex display={'flex'} flexDirection={{ base: 'column', md: 'row' }}>
        <AsideBar />
        <TableContainer bg={'darkgray'} w={{ base: '100%', md: '80%' }} float={"right"}>
          <Table variant='striped' size="sm">
            <TableCaption>Stocks</TableCaption>
            <Thead>
              <Tr>
                {headers.map((header, index) => (
                  <Th key={index} onClick={() => handleHeaderClick(header)} cursor='pointer'>
                    {header.label}
                    {sort.keyToSort === header.label.toLowerCase() && (
                      sort.direccion === 'asc' ? <ArrowUpIcon ml={2} /> : <ArrowDownIcon ml={2} />
                    )}
                  </Th>
                ))}
                <Th textAlign="center">Favorito</Th>
              </Tr>
            </Thead>
            <Tbody>
              {stocks.length > 0 ? (
                getSortedArray(stocks).map(stock => (
                  <Tr key={stock.id}>
                    <Td><img src={stock.logo} alt={`${stock.company} logo`} width="50" height="50" /></Td>
                    <Td>{stock.company}</Td>
                    <Td>{stock.ticker}</Td>
                    <Td fontSize={18} fontWeight={700}>
                      <Flex align={'center'}>
                        {stock.tendencia === 'Alcista' ? <Image src={banderinVerde} width="10" /> :
                          stock.tendencia === 'Bajista' ? <Image src={banderinRojo} width="10" /> :
                            stock.tendencia === 'Indecision' ? <Image src={banderinAmarillo} width="10" /> :
                              <Image src={banderinNegro} width="10" />}{stock.tendencia}
                      </Flex>
                    </Td>
                    <Td><a href={stock.grafico} target="_blank" rel="noopener noreferrer">Grafico</a></Td>
                    <Td>{stock.pais}</Td>
                    <Td>{stock.mercado}</Td>
                    <Td><a href={stock.detalles} target="_blank" rel="noopener noreferrer">Detalles</a></Td>
                    <Td><a href={stock.noticias} target="_blank" rel="noopener noreferrer">Noticias</a></Td>
                    <Td textAlign="center" onClick={handleRedirect} cursor={'pointer'}>
                      <StarIcon />
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={headers.length + 1}>No data available</Td>
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
}

  
