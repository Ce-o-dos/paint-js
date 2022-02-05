window.addEventListener("load", () => {
  const canva = document.querySelector("#canvas");
  const ctx = canva.getContext("2d");

  const toolsBar = document.querySelector(".tools");

  const coordenadasMouse = document.getElementById("coordenadas");

  //state pencil

  var statePencil = false;

  canva.addEventListener("mousedown", () => {
    statePencil = true;
  });

  canva.addEventListener("mouseup", () => {
    statePencil = false;
    ctx.beginPath();
  });

  //Select a color

  const color = document.querySelector("#color");

  const setPenColor = () => {
    color.addEventListener("mouseout", () => {
      //pass
    });

    return color.value;
  };

  //Cambiar la resolución del canvas

  const cambiarResolucion = document.getElementById("change");

  cambiarResolucion.addEventListener("click", () =>{
    const altoCanva = document.getElementById("alto-canva").value;
    const anchoCanva = document.getElementById("ancho-canva").value; 
    if(altoCanva == 0 || anchoCanva == 0 || altoCanva <= 0 || anchoCanva <= 0){
      alert("Elige una medida real porfavor")
    } else{
      canva.width = altoCanva;
      canva.height = anchoCanva;
    }
    

  })


  //Eventos para dibujar
  canva.addEventListener("mousemove", (e) => {
    let positionCanva = {
      leftCanva: canva.offsetLeft,
      topCanva: canva.offsetTop,
      botomCanva: window.innerHeight - canva.offsetTop - canva.offsetHeight,
    };

    let mousePosition = {
      x: e.clientX,
      y: e.clientY,
    };

    let scroll = {
      x: scrollX,
      y: scrollY,
    };

    let canvaPosition = {
      x: mousePosition.x - positionCanva.leftCanva + scroll.x,
      y: mousePosition.y - positionCanva.topCanva + scroll.y,
    };

    //console.log(mousePosition.x, mousePosition.y)

    coordenadasMouse.innerHTML = `${Math.round(canvaPosition.x)}, ${Math.round(
      canvaPosition.y
    )} pixeles`;
    //console.log(mousePosition.x + " " + mousePosition.y)
    if (statePencil == true) {
      //pencil color

      window.addEventListener("click", setPenColor);

      //mouse position

      DrawLines(setPenColor(), canvaPosition.x, canvaPosition.y);
    } else {
      return;
    }
  });

  let linePencil;

  //Elementos dentro de la Toolsvar
  toolsBar.addEventListener("mousemove", () => {
    let line = document.getElementById("line");

    line.addEventListener("mouseout", () => {
      linePencil = line.value;
      pincel.style.border = "2px solid blue";
      lapiz.style.border = "1px solid black";
    });

    //Herramientas para dibujar

    //Codigo del lapiz
    let lapiz = document.querySelector("#lapiz");

    lapiz.addEventListener("click", () => {
      lapiz.style.border = "2px solid blue";
      pincel.style.border = "1px solid black";
      linePencil = 1;
    });

    //Codigo del pincel
    let pincel = document.querySelector("#pincel");

    pincel.addEventListener("click", () => {
      pincel.style.border = "2px solid blue";
      lapiz.style.border = "1px solid black";
      linePencil = line.value;
    });
  });
  lapiz.style.border = "2px solid blue";

  //Funcion para dibujar con lapiz dentro del Canva

  const DrawLines = (color, positionX, positionY) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = linePencil;
    ctx.lineCap = "round";
    ctx.lineTo(positionX, positionY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(positionX, positionY);
  }

  //canvas medidas
  canva.width = "600";
  canva.height = "600";


  //Descargar dibujo

  const btnDescargar = document.getElementById("descargar")

  btnDescargar.addEventListener("click", () => {

    // Crear un elemento <a>
    let enlace = document.createElement('a');
    // El título
    enlace.download = "image.jpg";
    // Convertir la imagen a Base64 y ponerlo en el enlace
    enlace.href = canvas.toDataURL("image/jpeg", 1);
    // Hacer click en él
    enlace.click();
  });
});
