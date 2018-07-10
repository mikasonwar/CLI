
var historia = [];
var contador = 0;
var selecionado = -1;

var hackerman;
$(document).ready(function(){

$(".FormSubmit").submit(function(event) {
  event.preventDefault();
  zSubmit();
});

document.body.onkeyup = function(e){
  var clear=false;
    if(e.keyCode == 38){
      if(selecionado<historia.length-1) {
        selecionado++;
      }

      var xyz = historia[historia.length-1-selecionado];
      $(".value").val(xyz);
    }
    if(e.keyCode == 40){
      if(selecionado>0) {
        selecionado--;
      } else {clear=true;}
      var xyz;
      if(clear){xyz="";}else{xyz= historia[historia.length-1-selecionado];}
      $(".value").val(xyz);
    }

    if(e.keyCode == 27) {
      hackerman=false;
    }
    // console.log("Selecionado: "+selecionado+"\nHistoria lengh: "+historia.length+"\nJunto:"+Number(historia.length-1-selecionado+1));
}


});



function zSubmit() {
  selecionado = -1;
  var value = $(".value").val();
  if(value!="") {
    historia.puxar(value);
    resultado="Erro: Consulte o comando help";
    help="comandos disponiveis: \nmeme\nmath\nhelp\nhistory\nprint";
    helpmeme="Opções disponiveis: lenny, shrug, tableflip, what";
    helpmath="math (NUMERO1) (OPERACAO) (NUMERO2)";



    var x = value.toLowerCase().split(" ");

    if(x[0]=="math") {
      if(x[1]!="help") {
        switch (x[2]) {
          case "+":
            resultado= Number(x[1])+Number(x[3]);
            break;
          case "-":
            resultado= Number(x[1])-Number(x[3]);
            break;
          case "*":
            resultado= Number(x[1])*Number(x[3]);
            break;
          case "/":
            if (Number(x[3]==0)) {
              resultado= "(╯°□°）╯︵ ┻━┻";
            } else {
              resultado= Number(x[1])/Number(x[3]);
            }
            break;
          default:
            resultado= "Erro: Meteste os espaços corretamente? faça math help para mais informações.";
        }
      } else{resultado=helpmath;}
    }

    if(x[0]=="meme") {
      switch (x[1].toLowerCase()) {
        case "lenny":
          resultado="( ͡° ͜ʖ ͡°)";
          break;
        case "shrug":
          resultado="¯\\_(ツ)_/¯";
          break;
        case "tableflip":
          resultado="(╯°□°）╯︵ ┻━┻";
          break;
        case "what":
          resultado="ಠ_ಠ";
          break;
        case "help":
          resultado=helpmeme;
          break;
        default:
          resultado="Erro: Não disponivel ou mal escrito. faça meme help para saber o que está disponivel"
      }
    }

    if(x[0]=="help") {
      switch(x[1]) {
        case "meme":
          resultado=helpmeme;
          break;
        case "math":
          resultado=helpmath;
          break;
        case undefined:
          resultado=help;
          break;
        default:
          resultado="Erro.";
      }
    }

    if(x[0]=="history") {
      if(x[1]===undefined) {
        resultado="";
        for(var i=0;i<historia.length;i++) {

          resultado+="  "+i+" "+historia[i];

          if(i!=historia.length-1){resultado+="\n";}
        }
      } else {resultado="Erro: opções a mais?"}
    }

   if(x[0]=="print") {
    resultado="";
    for(var i=1;i<x.length;i++) {
      if(i!=x.length-1){resultado+=x[i]+" "}else{resultado+=x[i]}
    }
   }
   if(x[0]=="hackerman") {

    if(x[1]===undefined){
      hackerman=true;
      zHackerman();
      resultado="";
    } else {resultado="Erro: não é hackerman suficiente?"}

   }








    contador++;
    if(x[0]=="clear") {
      $(".console").empty();
    } else {
      $(".console").append($(".label").html()+value+"\n"+resultado+"\n\n");
    }
    $(".value").val("");
  }
}


Array.prototype.puxar = function() {
  // console.log("length:\n"+this.length +"\n\nArgumentos:\n"+arguments[0]);
  this[this.length]=arguments[0]
}



async function zHackerman() {
  await sleep(50);
  $(".hackerman").removeClass('hackerman');
  $(".console").append('<span style="white-space:normal" class="hackerman"></span>\n')
    while(hackerman) {
      await sleep(1);
      var cor=Math.floor(Math.random()*16777215).toString(16);
      var y = '#'+cor+" ";
      $(".hackerman").append('<span style="color:#'+cor+'"> #'+cor+' <span>');
    }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
