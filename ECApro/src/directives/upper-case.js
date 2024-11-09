export default {
    inserted: function(el, _, vnode) {
        el.addEventListener('input', async function(e) {
          e.target.value = e.target.value.toUpperCase()
          vnode.componentInstance.$emit('input', e.target.value.toUpperCase())
        })
      }
};
