import React, { Fragment } from "react";
import ProductoLista from "./ProductoLista";

function Productos({ productos, guardarRecargarProductos }) {
  return (
    <Fragment>
      <h1 className="text-center">Productos</h1>
      <ul className="list-group mt-5">
        {productos.map(producto => (
          <ProductoLista producto={producto} key={producto.id} guardarRecargarProductos={guardarRecargarProductos} />
        ))}
      </ul>
    </Fragment>
  );
}

export default Productos;
