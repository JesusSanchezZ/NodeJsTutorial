// babel sirve para hacer importacion de paquetes sin require
import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto')

// listener
btnEliminar.addEventListener('click', () => {
    //console.log('diste click en eliminar');
    Swal.fire({
        title: '¿Estás seguro de borrar este proyecto?',
        text: "¡Un proyecto eliminado no se puede recuperar!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, borrar!',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '¡Proyecto Eliminado!',
            'Tu proyecto se ha eliminado.',
            'success'
          );
          // Redireccionamos al inicio
          setTimeout(() => {
              window.location.href = '/'
          }, 3000);
        }
      })
})