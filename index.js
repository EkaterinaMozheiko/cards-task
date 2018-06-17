import { cards } from './src/cards.js'

const container = document.querySelector('.container');

renderCards(cards);
colorChange();

function renderCards(cards) {
  let number = 0;
  if(!cards) {
    return;
  }
  const compiledData = cards.map(((card, index) => {
    const source = document.querySelector('#card-template').innerHTML;
    const template = Handlebars.compile(source);

    Handlebars.registerHelper('card-type', card.type);

    if (index === (cards.length - 1) && index !== 0) {
      Handlebars.registerHelper('card-shift', 'card-shift');
    }
    else {
      Handlebars.registerHelper('card-shift', 'card-shift-0');
    }

    return template({ number: ++number });
  }));

  container.innerHTML = compiledData.join('');

  const narrowCards = document.querySelectorAll('.narrow');
  if (narrowCards.length > 0 && cards[cards.length - 1].type !== 'wide') {
    const wideCards = document.querySelectorAll('.wide');
    wideCards.forEach(wideCard => wideCard.style.width = '400px');
  }
}

function colorChange() {
  const narrowCards = document.querySelectorAll('.narrow'),
        wideCards = document.querySelectorAll('.wide'),
        arrayCards = [...narrowCards, ...wideCards],
        bodyElement = document.querySelector('body');

  [...arrayCards].map(card => {

    card.addEventListener('click', event => {
      if (event.shiftKey || event.altKey) {
        return;
      }
      cards.pop();
      renderCards(cards);
      history.pushState(cards, null);
    });

    card.addEventListener('mouseenter', event => {
      bodyElement.style.backgroundColor = '#f6f2de';
    });

    card.addEventListener('mouseleave', event => {
      bodyElement.style.backgroundColor = '#e9e6d3';
    });
  });

  container.addEventListener('mouseenter', () => {
    bodyElement.style.backgroundColor = '#e9e6d3';
  });

  container.addEventListener('mouseleave', () => {
    bodyElement.style.backgroundColor = '#f6f2de';
  });
}

function changeCards(cards, event) {
  if (event.shiftKey && event.altKey) {
    cards.push(
      {
        type: 'wide',
      });
  }
  else if (event.shiftKey) {
    cards.push(
      {
        type: 'narrow',
      });
  }

  renderCards(cards);
  colorChange();
  history.pushState(cards, null);
}

document.addEventListener('click', changeCards.bind(null, cards));

window.addEventListener ("popstate", event => {
  const state = event.state;
  renderCards(state);
  colorChange();
});
