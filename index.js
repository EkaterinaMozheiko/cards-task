import { cards } from './src/cards.js'

const container = document.querySelector('.container');

renderCards();
colorChange();

function renderCards() {
  let number = 0;
  const compiledData = cards.map(((card, index) => {
    const source = document.querySelector('#card-template').innerHTML,
        template = Handlebars.compile(source);

    Handlebars.registerHelper('card-type', card.type);

    if (index === (cards.length - 1) && index !== 0) {
      Handlebars.registerHelper('card-shift', 'card-shift');
    }
    else {
      Handlebars.registerHelper('card-shift', 'card-shift-0');
    }

    return template({number: ++number});
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
        arrayCards = [...narrowCards, ...wideCards];
  const bodyElement = document.querySelector('body');

  [...arrayCards].map(card => {
    card.addEventListener('mouseenter', (e) => {
      bodyElement.style.backgroundColor = '#f6f2de';
      e.stopPropagation();
    });

    card.addEventListener('mouseleave', (e) => {
      bodyElement.style.backgroundColor = '#e9e6d3';
      e.stopPropagation();
    })
  });

  container.addEventListener('mouseenter', () => {
    bodyElement.style.backgroundColor = '#e9e6d3';
  });

  container.addEventListener('mouseleave', () => {
    bodyElement.style.backgroundColor = '#f6f2de';
  });
}

document.addEventListener('click', function(event) {
  if (event.shiftKey && event.altKey) {
    cards.push(
      {
        type: 'wide',
      });
    renderCards();
    colorChange();
    return;
  }

  if (event.shiftKey) {
    cards.push(
      {
        type: 'narrow',
      });
    renderCards();
    colorChange();
    return;
  }

  cards.pop();
  renderCards();
  colorChange();
});
