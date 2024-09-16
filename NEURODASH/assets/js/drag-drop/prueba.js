import Sortable from 'sortablejs';

// const sortableb = new Sortable();

// const sourceCard = document.getElementById('sourceCard');

// sortableb.create(sourceCard, {})

// console.log(sortableb)


// Selecciona los divs donde quieres hacer los elementos arrastrables
const sourceCard = document.getElementById('sourceCard');
const dropZone = document.getElementById('dropZone');

// Configuración de Sortable
new Sortable(sourceCard, {
  group: 'shared', // define ambos divs en el mismo grupo
  animation: 150
});

new Sortable(dropZone, {
  group: 'shared',
  animation: 150
});
