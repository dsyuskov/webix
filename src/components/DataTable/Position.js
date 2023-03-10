export default (item) => {
  const { position, positionDynamics } = item;

  return `<div class=position>
      <span>${position}</span>
      ${
        positionDynamics > 0
          ? `<span class="position__item position__item_positive">+${positionDynamics}</span>`
          : `<span class="position__item position__item_negative">${positionDynamics}</span>`
      }
      </div>`;
};
// <span>${positionDynamics > 0 ? '+' : '-'}${positionDynamics}</span>
