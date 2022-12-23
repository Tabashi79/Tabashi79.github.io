(function() {
  document.addEventListener('DOMContentLoaded', function() {
    let body = document.querySelector('.body');
    let colorBackground = document.querySelector('.color-background');
    let btnСolor = document.querySelector('.btn-color');

    function bgColor() {
      body.style.backgroundColor = colorBackground.value;
    }

    bgColor();

    document.addEventListener('input', bgColor);
    btnСolor.addEventListener('click', function() {
      body.style.removeProperty('background-color');
      colorBackground.value = '';
    });

  });
})();
