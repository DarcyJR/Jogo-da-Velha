//a opção de jogada aparece na tela

const control = document.querySelectorAll(".control")

//console.log(array)
let arrayPosPre = []
let simbolo = "X"
let retorno_valor = 0
let verifica = false//verifica se já existe um vencedor

//pontos
let contador_X = 0
let contador_O = 0

//adiciona o simbolo se o array for igual a indefinido
//passando o mouse pela casa
function mouseOver(id) {
  if (verifica === false) {
    let numero = trocaNumero(id);
    if (arrayPosPre[numero] === undefined) {
      const valor = document.querySelector(`#${id}`);
      valor.innerHTML = simbolo
    }
  }
}

//retira o simbolo se o array for igual a indefinido
//passando o mouse pela casa
function mouseOut(id) {
  let numero = trocaNumero(id);
  if (arrayPosPre[numero] === undefined) {
    const valor = document.querySelector(`#${id}`);
    valor.innerHTML = ""
  }
}

//verifica o click de jogada

function jogada(id) {
  if (verifica === false) {
    let retorno_valor = trocaNumero(id)
    if (arrayPosPre[retorno_valor] === undefined) {
      //console.log(arrayPosPre[retorno_valor])
      arrayPosPre[retorno_valor] = simbolo
      //faz a troca dos caracteres
      if (simbolo === "X") {
        simbolo = "O"
      } else {
        simbolo = "X"
      }
    }
    vencedor()
    robo(simbolo)
  }
}

//converte os id string em numeros para index
function trocaNumero(valor) {
  switch (valor) {
    case "um":
      return 0;
      break;
    case "dois":
      return 1;
      break;
    case "tres":
      return 2;
      break;
    case "quatro":
      return 3;
      break;
    case "cinco":
      return 4;
      break;
    case "seis":
      return 5;
      break;
    case "sete":
      return 6;
      break;
    case "oito":
      return 7;
      break;
    case "nove":
      return 8;
      break;
    default:
    // code block
  }
}

//dar continuidade na parte do jogo e verificação de ganhador

function vencedor() {
  if (verifica === false) {//pra confirmar apenas uma ves a vitoria
    //horizontal
    if (arrayPosPre[0] === arrayPosPre[1] && arrayPosPre[1] === arrayPosPre[2] && arrayPosPre[2] !== undefined) {
      controleVitoria(0, 1, 2, arrayPosPre[0])
      return
    }

    if (arrayPosPre[3] === arrayPosPre[4] && arrayPosPre[4] === arrayPosPre[5] && arrayPosPre[5] !== undefined) {
      controleVitoria(3, 4, 5, arrayPosPre[3])
      return
    }

    if (arrayPosPre[6] === arrayPosPre[7] && arrayPosPre[7] === arrayPosPre[8] && arrayPosPre[8] !== undefined) {
      controleVitoria(6, 7, 8, arrayPosPre[6])
      return
    }

    //vertical
    if (arrayPosPre[0] === arrayPosPre[3] && arrayPosPre[3] === arrayPosPre[6] && arrayPosPre[6] !== undefined) {
      controleVitoria(0, 3, 6, arrayPosPre[0])
      return
    }

    if (arrayPosPre[1] === arrayPosPre[4] && arrayPosPre[4] === arrayPosPre[7] && arrayPosPre[7] !== undefined) {
      controleVitoria(1, 4, 7, arrayPosPre[1])
      return
    }
    if (arrayPosPre[2] === arrayPosPre[5] && arrayPosPre[5] === arrayPosPre[8] && arrayPosPre[8] !== undefined) {
      controleVitoria(2, 5, 8, arrayPosPre[2])
      return
    }

    //transversal
    if (arrayPosPre[0] === arrayPosPre[4] && arrayPosPre[4] === arrayPosPre[8] && arrayPosPre[8] !== undefined) {
      controleVitoria(0, 4, 8, arrayPosPre[0])
      return
    }

    if (arrayPosPre[2] === arrayPosPre[4] && arrayPosPre[4] === arrayPosPre[6] && arrayPosPre[6] !== undefined) {
      controleVitoria(2, 4, 6, arrayPosPre[2])
      return
    }
  }
}

function controleVitoria(valorUm, valorDois, valorTres, simbolo) {
  //resultado falso ninguem venceu
  //contador de pontos
  if (simbolo === "X") {
    contador_X++
    document.querySelector(".grid_pontos_x").innerHTML = contador_X
  } else if (simbolo === "O") {
    contador_O++
    document.querySelector(".grid_pontos_o").innerHTML = contador_O
  }

  //valida vitoria
  if (verifica === false) {
    control[valorUm].style.backgroundColor = "rgb(3, 255, 162)"
    control[valorDois].style.backgroundColor = "rgb(3, 255, 162)"
    control[valorTres].style.backgroundColor = "rgb(3, 255, 162)"
    //possibilita que nao haja ponto duplo dentro do mesmo jogo
    verifica = true
    return
  }
}

function reset() {
  //zera todos os atributos 
  for (let i = 0; i < 9; i++) {
    arrayPosPre[i] = undefined;
    control[i].innerHTML = "";
    control[i].style.backgroundColor = "white"
    verifica = false
  }
  robo(simbolo)
}

function robo(simbolo) {
  const roboA = btnRadio()
  //verificação se ainda existem espaços varios
  if (arrayPosPre[0] === undefined || arrayPosPre[1] === undefined || arrayPosPre[2] === undefined || arrayPosPre[3] === undefined ||
    arrayPosPre[4] === undefined || arrayPosPre[5] === undefined || arrayPosPre[6] === undefined || arrayPosPre[7] === undefined ||
    arrayPosPre[8] === undefined) {
    //o sistema é aceito se o simbolo for O se o robo esta ativo e se a verificação de vitoria for falsa
    if (simbolo === "O" && roboA === true && verifica === false) {
      //gera numero randomico
      const randomA = Math.floor(Math.random() * 9);
      //verifica se a casa está liberada se não joga novamente
      if (arrayPosPre[randomA] === undefined) {
        jogada(control[randomA].id)
        arrayPosPre[randomA] = "O"
        control[randomA].innerHTML = "O"
      } else {
        robo(simbolo)//se a casa estiver preenchida chama a função novamente
      }
    }
  }
}

//verifica se o radio botton computador está ativo
function btnRadio(){
  const btnAdver = document.getElementsByName("adversario")
  return btnAdver[1].checked
}







