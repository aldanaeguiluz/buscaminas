let flag= "&#128681;"
let casillas=[]
let dimensiontablero=6
let numcasillas=36
//variables para ganar
let numflags=Math.floor(Math.random() * (10 - 8) + 8)
let casillaslibres=numcasillas-numflags
let contacasillas=0
let contaflags=0

const reload = document.getElementById("reload");

reload.addEventListener("click", (_) => {
  location.reload();
});

function crearCasillas(){
    for(let i=0; i<numcasillas;i++){
        let casilla={
            mostrando: false,
            flag: false,
            numero: 0
        }
        casillas.push(casilla)
    }
}

function asignarFlags(){
    for(let i=0;i<numflags;i++){
        let casillarandom=Math.floor(Math.random() *(numcasillas-1))
        while(casillas[casillarandom].flag!=false){
            casillarandom=Math.floor(Math.random() *(numcasillas-1))
        }
        casillas[casillarandom].flag=true
    }
}

function asignarNumeros(){
    for(let i=0;i<dimensiontablero;i++){
        for(let j=0;j<dimensiontablero;j++){
            const casilla=devolverCasilla(i,j)
            if(!casilla.flag){
                console.log("la casilla ("+i+","+j+") entro a contar sus flags")
                let num=contarFlags(i,j)
                casilla.numero=num
            }
        }
    }
}

function contarFlags(i,j){
    let conta=0
    for(let fila=i-1; fila<=i+1;fila++){
        for(let col=j-1;col<=j+1;col++){
            if(fila>=0&&col>=0){
                if(fila<dimensiontablero&&col<dimensiontablero){
                    if(fila==i&&col==j){
                    }else{
                        if(devolverCasilla(fila,col).flag){
                            conta++
                        }
                    }
                }
            }
        }
    }
    return conta
}

function devolverCasilla(row,col) {
    const pos = row*dimensiontablero+col
    return casillas[pos]
}

function actualizarTablero(){
    for(let i=0;i<dimensiontablero;i++){
        for(let j=0;j<dimensiontablero;j++){
            const but=document.getElementById(i+"-"+j)
            const casilla=devolverCasilla(i,j)
            if(casilla.mostrando){
                if(casilla.flag){
                    but.innerHTML=flag
                }else{
                    but.innerHTML=casilla.numero
                    but.style.color="black"
                }
                
            }
        }
    }
}

function casillaOnClick(row, col){
    contacasillas++
    let casilla=devolverCasilla(row, col)
    casilla.mostrando=true
    actualizarTablero()
    if(casilla.flag){
        document.getElementById(row+"-"+col).style.backgroundColor="rgb(245, 99, 99)"
        for(let i=0; i<numcasillas;i++){
            casillas[i].mostrando=true
        }
        actualizarTablero()
        document.getElementById("titulo").innerHTML="Buscaminas :("
        document.getElementById("resultado").innerHTML="Perdiste"
    }else{
        if(contacasillas==casillaslibres){
            for(let i=0; i<numcasillas;i++){
            casillas[i].mostrando=true
            }
        actualizarTablero()
        document.getElementById("resultado").innerHTML="Ganaste!!"
        }
    }
}

function main(){
    crearCasillas()
    asignarFlags()
    asignarNumeros()
    actualizarTablero()
    console.log(casillas)
}

main()