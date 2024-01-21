// import interact from 'interactjs';

// export const dragMoveListener = (event) => {
//   const target = event.target;

//   const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
//   const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

//   target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

//   target.setAttribute('data-x', x);
//   target.setAttribute('data-y', y);

//   event.stopImmediatePropagation();
//   return [x, y];
// };

// interact('.draggable').draggable({
//   autoScroll: false,
//   inertia: false,
//   listeners: {
//     move: dragMoveListener,
//   },

//   modifiers: [interact.modifiers.restrictRect({ endOnly: true, restriction: '#App' })],
// });
