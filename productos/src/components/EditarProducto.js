import React, { useState, useRef } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Error from "./Error";
import { withRouter } from "react-router-dom";

function EditarProducto({ history, producto, guardarRecargarProductos }) {
  // generar los ref
  const precioPlatilloRef = useRef("");
  const nombrePlatilloRef = useRef("");

  // state
  const [error, guardarError] = useState(false);
  const [categoria, guardarCategoria] = useState("");
  const leerValorRadio = e => {
    guardarCategoria(e.target.value);
  };

  const editarProducto = async e => {
    e.preventDefault();

    //revisar si cambio la categoia, de lo contrario asignar el mismo valor
    let categoriaPlatillo = categoria === "" ? producto.categoria : categoria;

    const productoEdited = {
      precioPlatillo: precioPlatilloRef.current.value,
      nombrePlatillo: nombrePlatilloRef.current.value,
      categoria: categoriaPlatillo
    };

    if (
      productoEdited.nombrePlatillo === "" ||
      productoEdited.precioPlatillo === "" ||
      productoEdited.categoria === ""
    ) {
      guardarError(true);
      return;
    }

    guardarError(false);

    //editar
    try {
      const resultado = await axios.put(
        `http://localhost:4000/restaurant/${producto.id}`,
        productoEdited
      );
      console.log(resultado);
      if (resultado.status === 200) {
        Swal.fire(
          "Producto Modificado",
          "El producto se actualizo correctamente",
          "success"
        );
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error"
      });
    }

    //Redirigir al usuario hacia los productos
    guardarRecargarProductos(true);
    history.push("/productos");
  };

  return (
    <div className="col-md-8 mx-auto">
      <div className="col-md-8 mx-auto ">
        <h1 className="text-center">Editar Producto</h1>
        {error ? <Error mensaje="todos los campos son obligatorios" /> : null}
        <form className="mt-5" onSubmit={editarProducto}>
          <div className="form-group">
            <label>Nombre Platillo</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              placeholder="Nombre Platillo"
              ref={nombrePlatilloRef}
              defaultValue={producto.nombrePlatillo}
            />
          </div>

          <div className="form-group">
            <label>Precio Platillo</label>
            <input
              type="number"
              className="form-control"
              name="precio"
              placeholder="Precio Platillo"
              ref={precioPlatilloRef}
              defaultValue={producto.precioPlatillo}
            />
          </div>

          <legend className="text-center">Categoría:</legend>
          <div className="text-center">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="categoria"
                value="postre"
                onChange={leerValorRadio}
                defaultChecked={producto.categoria === "postre"}
              />
              <label className="form-check-label">Postre</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="categoria"
                value="bebida"
                onChange={leerValorRadio}
                defaultChecked={producto.categoria === "bebida"}
              />
              <label className="form-check-label">Bebida</label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="categoria"
                value="cortes"
                onChange={leerValorRadio}
                defaultChecked={producto.categoria === "cortes"}
              />
              <label className="form-check-label">Cortes</label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="categoria"
                value="ensalada"
                onChange={leerValorRadio}
                defaultChecked={producto.categoria === "ensalada"}
              />
              <label className="form-check-label">Ensalada</label>
            </div>
          </div>

          <input
            type="submit"
            className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3"
            value="Modificar Producto"
          />
        </form>
      </div>
    </div>
  );
}

export default withRouter(EditarProducto);
