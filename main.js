//seletores
let countPc = 0;
let countUser = 0;

let home = document.querySelector('#home');
let start = document.querySelector('#start');
let placas = document.querySelector('#placas');

let imgs = document.querySelectorAll("#opcoes > img")
inicial()
//Pagina inicial
function inicial() {
  home.style.display = 'flex';
  start.style.display = 'none';
  imgs.forEach(function (img) {
    img.addEventListener("click", startGame)
  })
  placas.querySelector('#win').style.display = 'none';
  placas.querySelector('#lost').style.display = 'none';
  placas.querySelector('#empate').style.display = 'none';

  window.addEventListener("click", selected); //observar se hove algum click
}

function startGame() {
  home.style.display = 'none';
  start.style.display = 'flex';
  machineChoiceImg()
  let buttonPlayAgain = document.querySelector('#playAgain');
  let buttonReset = document.querySelector('#reset');

  buttonPlayAgain.addEventListener("click", playAgain);
  buttonReset.addEventListener("click", reset);
}

//Identificando qual mão escolhida
function selected(event) {
  let handShot = divCode(event)
  const key = document.querySelector(`[data-choice="${handShot}"]`)

  //verificando se a tecla existe
  const isKeyExists = key;
  if (!isKeyExists) {
    return
  }
  escolha(event)
  verificaGanhador(escolha(event), machineChoiceImg())
  atualizaplacar()
}


function divCode(eventSelected) { //parametro determinado pelo event do selected
  let localDoEvento;
  localDoEvento = eventSelected.target.dataset.choice
  return localDoEvento
}

//Mostrando a escolha na tela
/*window observa o click--> chama selected passando o event -->selected chama divCode e escolha passando o evento vindo do window*/
function escolha(eventSelected) {
  let yourShot = divCode(eventSelected)
  let imgYourShot = document.querySelector('#yourShot')
  imgYourShot.setAttribute('src', `./assets/${yourShot}.png`)
  return yourShot
}
function machineChoiceImg() {
  let myShot = Math.floor(Math.random() * 3) + 1;
  let imgMachineShot = document.querySelector('#myShot')
  let machineChoice;
  if (myShot == 1) {
    machineChoice = 'pedra';
  } else if (myShot == 2) {
    machineChoice = 'tesoura'
  } else if (myShot == 3) {
    machineChoice = 'papel'
  }
  imgMachineShot.setAttribute('src', `./assets/${machineChoice}.png`)
  return machineChoice
}

function verificaGanhador(user, machine) {
  if (user === machine) {
    placas.querySelector('#empate').style.display = 'flex';
  } else if (user === 'pedra' && machine === 'papel') {
    placas.querySelector('#lost').style.display = 'flex';
    countPc++
  } else if (user === 'pedra' && machine === 'tesoura') {
    placas.querySelector('#win').style.display = 'flex';
    countUser++
  } else if (user === 'papel' && machine === 'pedra') {
    placas.querySelector('#win').style.display = 'flex';
    countUser++
  } else if (user === 'papel' && machine === 'tesoura') {
    placas.querySelector('#lost').style.display = 'flex';
    countPc++
  } else if (user === 'tesoura' && machine === 'pedra') {
    placas.querySelector('#lost').style.display = 'flex';
    countPc++
  } else if (user === 'tesoura' && machine === 'papel') {
    placas.querySelector('#win').style.display = 'flex';
    countUser++
  }

}

//Atualizar placas
function atualizaplacar() {
  let yourPoints = document.querySelector('#yourPoints');
  let myPoints = document.querySelector('#myPoints');

  yourPoints.textContent = countUser;
  myPoints.textContent = countPc;
}

function playAgain() {
  inicial()

}

function reset() {
  countPc = 0;
  countUser = 0;
  inicial()
}


