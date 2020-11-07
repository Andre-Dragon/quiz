document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const overlay = document.querySelector('.overlay'),
    quiz = document.querySelector('.quiz'),
    passTestButton = document.querySelector('.pass__test--button'),
    form = document.querySelector('.quiz__body--form'),
    formItems = form.querySelectorAll('fieldset'),
    btnsNext = form.querySelectorAll('.form-button__btn-next'),
    btnsPrev = form.querySelectorAll('.form-button__btn-prev'),
    countPercent = document.getElementById('quiz__position--percent__change');

  const answersObj = {
    step0: {
      question: '',
      answers: [],

    },

    step1: {
      question: '',
      answers: [],

    },

    step2: {
      question: '',
      answers: [],

    },

    step3: {
      questio: '',
      answers: [],

    },
  };

  let sumPercent = Math.floor(100 / formItems.length);
  countPercent.textContent = sumPercent + '%';

  btnsNext.forEach( (btn, btnIndex) => {
    btn.addEventListener('click', event => {
      event.preventDefault();

      
      sumPercent += Math.floor(100 / formItems.length);
      countPercent.textContent = sumPercent + '%';
      

      formItems[btnIndex].style.display = 'none';
      formItems[btnIndex + 1].style.display = 'block';
    
    });

    btn.disabled = true;
  });

  btnsPrev.forEach( (btn, btnIndex) => {
    btn.addEventListener('click', event => {
      event.preventDefault();

      sumPercent -= Math.floor(100 / formItems.length);
      countPercent.textContent = sumPercent + '%';

      formItems[btnIndex + 1].style.display = 'none';
      formItems[btnIndex].style.display = 'block';
    });
  });
    
  formItems.forEach( (formItem, formItemIndex) => {

    if (formItemIndex === 0) {
      formItem.style.display = 'block';
    } else {
      formItem.style.display = 'none';
    }

    if (formItemIndex !== formItems.length - 1) {
      const inputs = formItem.querySelectorAll('input');

      inputs.forEach(input => {
        const parent = input.parentNode;
        input.checked = false;
        parent.classList.remove('active-radio');
      });

    }

    // Выбор radio
    formItem.addEventListener('change', event => {
      const target = event.target;
      const inputsChecked = formItem.querySelectorAll('input:checked');
      
      if (inputsChecked.length > 0) {
        btnsNext[formItemIndex].disabled = false;
      } else {
        btnsNext[formItemIndex].disabled = true;
      }

      if (target.classList.contains('input-radio')) {
        const inputRadio = formItem.querySelectorAll('.input-radio');
        inputRadio.forEach(input => {

          if (input === target) {
            input.parentNode.classList.add('active-radio');
          } else {
            input.parentNode.classList.remove('active-radio');
          }

        });
      } else {
        return;
      }
    });

  });

  overlay.classList.add('hide');
  quiz.classList.add('hide');


  passTestButton.addEventListener('click', () => {
    overlay.classList.remove('hide');
  quiz.classList.remove('hide');
  });

});