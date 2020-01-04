import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Productos from "./components/Productos";
import EditarProducto from "./components/EditarProducto";
import AgregarProducto from "./components/AgregarProducto";
import Producto from "./components/Producto";
import axios from "axios";

function App() {
  const [productos, guardarProductos] = useState([]);
  const [recargarProductos, guardarRecargarProductos] = useState(true);

  useEffect(() => {
    if (recargarProductos) {
      const consultarApi = async () => {
        //consultar api de jsonserver
        const resultado = await axios.get("http://localhost:4000/restaurant");

        guardarProductos(resultado.data);
      };

      consultarApi();

      guardarRecargarProductos(false);
    }
  }, [recargarProductos]);

  //importa el orden porque escanea de arriba abajo, los id tenerlos ultimos
  //cuando queremos pasar datos a un componente usamos render
  return (
    <Router>
      <Header />
      <main className="container mt-5">
        <Switch>
          <Route
            exact
            path="/productos"
            render={() => <Productos productos={productos} guardarRecargarProductos={guardarRecargarProductos}/>}
          />
          <Route exact path="/nuevo-producto"
           render={() => (
             <AgregarProducto
             guardarRecargarProductos={guardarRecargarProductos}/>
             )} />
          <Route exact path="/productos/:id" component={Producto} />
          <Route
            exact
            path="/productos/editar/:id"
            render={props => { 
              //tomar el Id del producto
              const idProducto = parseInt(props.match.params.id);

              //el producto que se pasa al state
              const producto = productos.filter(p => (
                p.id === idProducto
              ))
              return (
              <EditarProducto
                producto={producto[0]}
                guardarRecargarProductos={guardarRecargarProductos}
              />
            )}}
          />
        </Switch>
      </main>
      <p className="mt-4 p2 text-center">Todos los derechos reservados</p>
    </Router>
  );
}

export default App;
