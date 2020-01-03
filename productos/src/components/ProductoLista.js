import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function ProductoLista({ producto }) {
  const eliminarProducto = id => {
    Swal.fire({
      title: "Confirma que desea eliminar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        const eliminar = async id => {
          try {
            const resultado = await axios.delete(
              `http://localhost:4000/restaurant/${id}`
            );
            if (resultado.status === 200) {
              Swal.fire(
                "Eliminado!",
                "El producto fue eliminado correctamente.",
                "success"
              );
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ha ocurrido un error"
              });
            }
          } catch (error) {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Ha ocurrido un error"
            });
          }
        };

        eliminar(id);
      }
    });
  };

  return (
    <li
      className="list-group-item d-flex justify-content-between 
        align-items-center"
      data-categoria={producto.categoria}
    >
      <p>
        {producto.nombrePlatillo}{" "}
        <span className="font-weight-bold">${producto.precioPlatillo}</span>
      </p>
      <div>
        <Link
          to={`/productos/editar/${producto.id}`}
          className="btn btn-success mr-2"
        >
          Editar
        </Link>

        <button
          type="button"
          className="btn btn-danger"
          onClick={() => eliminarProducto(producto.id)}
        >
          Eliminar &times;
        </button>
      </div>
    </li>
  );
}

export default ProductoLista;
