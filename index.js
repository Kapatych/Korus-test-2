const state = [
  {
    question: 'Какого цвета небо?',
    answers: ['Красное', 'Синее', 'Черное', 'Желтое'],
    right: ['Синее']
  },
  {
    question: 'Выберите геометрические фигуры',
    answers: ['Квадрат', 'Круг', 'Столб', 'Тарелка'],
    right: ['Квадрат', 'Круг']
  }
];

let userAnswers = {};
const testForm = document.querySelector('.test');
const result = document.querySelector('.result');
const btn = document.querySelector('.btn');
const btnReset = document.querySelector('.reset');

const compareArray = (first, second) => {
  if (first.length !== second.length) return false;

  first = first.sort();
  second = second.sort();
  for (let i = 0; i < first.length; i++) {
    if (first[i] !== second[i]) {
      return false;
    }
  }
  return true;
};

const createQuestion = ({answers, question, right}, idx) => {
  let container = document.createElement('div');
  container.classList.add('question__row');
  container.insertAdjacentHTML('afterbegin', `<p class="question__title">${idx}. ${question}</p>`);
  answers.forEach(answer => {
      const data = `<p><label class="question__answer"><input type="${right.length > 1 ? 'checkbox' : 'radio'}" name="q${idx}" value="${answer}"/><span>${answer}</span></label></p>`;
      container.insertAdjacentHTML('beforeend', data)
    }
  );

  return container;
};

const createResult = ({question, right}, idx) => {
  let container = document.createElement('div');
  container.classList.add('result__row');
  container.insertAdjacentHTML('afterbegin', `<p class="question__title">${idx}. ${question}</p>`);
  container.insertAdjacentHTML('beforeend', `<p>${userAnswers['q' + idx]} - ${compareArray(right, userAnswers['q' + idx]) ? 'Верно' : 'Неверно'}</p>`);
  return container
};

const changeAnswerHandler = ({type, name, value}) => {
  if (type === 'checkbox') {
    (!userAnswers[name])
      ? userAnswers[name] = [value]
      : userAnswers[name].push(value);
  } else {
    userAnswers[name] = [value]
  }

  if (Object.keys(userAnswers).length === state.length) {
    btn.classList.remove('disabled')
  }
};

const toggleHandler = () => {
  testForm.classList.toggle('hide');
  result.classList.toggle('hide');
};

const submitHandler = (e) => {
  e.preventDefault();
  state.forEach((el, idx) => btnReset.before(createResult(el, idx + 1)));
  toggleHandler();
};

const reset = () => {
  userAnswers = {};
  testForm.reset();
  result.querySelectorAll('.result__row').forEach(row => row.remove());
  btn.classList.add('disabled');
  toggleHandler();
};

state.forEach((el, idx) => btn.before(createQuestion(el, idx + 1)));
const answers = document.querySelectorAll('.question__answer');
answers.forEach(answer => answer.addEventListener('change', (e) => changeAnswerHandler(e.target)));
testForm.addEventListener('submit', (e) => submitHandler(e));
btnReset.addEventListener('click', () => reset());
