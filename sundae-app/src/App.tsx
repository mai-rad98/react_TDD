import Container from "react-bootstrap/Container";
import React from 'react'
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";

function App() {
  return (
   
      <OrderDetailsProvider>
         <Container> 
          <OrderEntry setOrderPhase={undefined} />
         </Container>
      
       
      </OrderDetailsProvider>
    
   
  );
}

export default App;