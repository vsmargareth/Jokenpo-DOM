let countPc = 10;
let countUser = 3;

let home = document.querySelector('#home');
let start = document.querySelector('#start');
start.style.display = 'none';

let placar = document.querySelector('#placar');
// placar.style.display = 'none';

let imgs = document.querySelectorAll("#opcoes > img")
imgs.forEach(function (img) {
  img.addEventListener("click", startGame)
})
placar.querySelector('#win').style.display = 'none';
placar.querySelector('#lost').style.display = 'none';
placar.querySelector('#empate').style.display = 'none';


function startGame() {
  home.style.display = 'none';
  start.style.display = 'flex'
  machineChoiceImg()
  atualizaPlacar()

}

//Identificando qual mão escolhida
window.addEventListener("click", selected); //observar se hove alhum click
function selected(event) {
  let handShot = divCode(event)
  const key = document.querySelector(`[data-choice="${handShot}"]`)

  //verificando se a tecla existe
  const isKeyExists = key;
  if (!isKeyExists) {
    return
  }
  console.log(handShot)
  escolha(event)
  verificaGanhador(escolha(event), machineChoiceImg())

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
    placar.querySelector('#empate').style.display = 'flex';
  } else if (user === 'pedra' && machine === 'papel') {
    placar.querySelector('#lost').style.display = 'flex';
    countPc++
  } else if (user === 'pedra' && machine === 'tesoura') {
    placar.querySelector('#win').style.display = 'flex';
    countUser++
  } else if (user === 'papel' && machine === 'pedra') {
    placar.querySelector('#win').style.display = 'flex';
    countUser++
  } else if (user === 'papel' && machine === 'tesoura') {
    placar.querySelector('#lost').style.display = 'flex';
    countPc++
  } else if (user === 'tesoura' && machine === 'pedra') {
    placar.querySelector('#lost').style.display = 'flex';
    countPc++
  } else if (user === 'tesoura' && machine === 'papel') {
    placar.querySelector('#win').style.display = 'flex';
    countUser++
  }
}

//Atualizar placar
function atualizaPlacar() {
  let yourPoints = document.querySelector('#yourPoints');
  let myPoints = document.querySelector('#myPoints');

  yourPoints.textContent = countUser;
  myPoints.textContent = countPc;
}


