import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx'
import React from 'react'
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
)
