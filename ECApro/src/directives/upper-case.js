export default {
    inserted: function(el, _, vnode) {
      if (el.type === 'number') {
          el.addEventListener('input', async function(e) {
              const newValue = e.target.value.toUpperCase();
  
              // Validación para permitir solo números y un punto decimal
              const regex = /^[0-9]*\.?[0-9]*$/;
              if (regex.test(newValue)) {
                  vnode.componentInstance.$emit('input', newValue);
              } else {
                  // Si el valor no es válido, puedes mostrar un mensaje de error o restringir la entrada
                  // Por ejemplo, puedes eliminar el último carácter:
                  e.target.value = newValue.slice(0, -1);
              }
          });
      }
  }
};
