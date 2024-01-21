import { InteractEvent } from '@interactjs/types';
import interact from 'interactjs';

import { POSITION_ZERO } from './constans';

export const dragMoveListener = (event: InteractEvent) => {
  //jak to sprytnie otypowac?
  const x = (parseFloat(event.target.getAttribute('data-x')) || POSITION_ZERO) + event.dx;
  const y = (parseFloat(event.target.getAttribute('data-y')) || POSITION_ZERO) + event.dy;

  event.target.style.transition = event.target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  event.target.setAttribute('data-x', x.toString());
  event.target.setAttribute('data-y', y.toString());

  event.stopImmediatePropagation();
  return [x, y];
};

interact('.draggable').draggable({
  autoScroll: false,
  inertia: false,
  listeners: {
    move: dragMoveListener,
  },

  modifiers: [interact.modifiers.restrictRect({ endOnly: true, restriction: '#App' })],
});
