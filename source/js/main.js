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
      question: '',
      answers: [],
    },
    step4: {
      name: '',
      phone: '',
      email: '',
      call: '',
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
      const formTitle = formItem.querySelector('.form__title');

      answersObj[`step${formItemIndex}`].question = formTitle.textContent;

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

      if (formItemIndex !== formItems.length - 1) {
        answersObj[`step${formItemIndex}`].answers.length = 0;
        inputsChecked.forEach(inputChecked => {
          answersObj[`step${formItemIndex}`].answers.push(inputChecked.value);
        });
        
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
      }
    });
  });

  const postData = body => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  const sendForm = () => {
    form.addEventListener('submit', event => {
      event.preventDefault();

      answersObj.step4.name = document.getElementById('quiz-name').value;
      answersObj.step4.phone = document.getElementById('quiz-phone').value;
      answersObj.step4.email = document.getElementById('quiz-email').value;
      answersObj.step4.call = document.getElementById('quiz-call').value;

      // for (let key in answersObj.step4) {
      //   if (answersObj.step4[key].value === "") {
      //     alert("Введите даные во все поля");
      //   }
      // }

      if (document.getElementById('quiz-policy').checked) {
        postData(answersObj)
          .then((res) => res.json())
          .then((res) => {
            if (res.status === 'ok') {
              overlay.classList.add('hide');
              quiz.classList.add('hide');
              form.reset();
              alert(res.message);
            } else if (res.status === 'error') {
              alert(res.message);
            }
          });
      } else {
        alert('Дайте согласие на обработку персональных данных');
      }
     
    });
  };

  overlay.classList.add('hide');
  quiz.classList.add('hide');


  passTestButton.addEventListener('click', () => {
    overlay.classList.remove('hide');
    quiz.classList.remove('hide');
  });

  sendForm();
});