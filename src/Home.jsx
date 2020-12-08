import React, { useState, useEffect } from "react";
import "./LinkSelectorText.css"
import { useHistory } from "react-router-dom";

const Home = () =>{
  const [jugador1, setJugador1] = useState("")
  const [user1Selec, setUser1Select] = useState(null)
  const [user2Selec, setUser2Select] = useState(null)
  const [turno, setTurno] = useState("jugador 1")
  const [jugador2, setJugador2] = useState("")
  const [elGanador, setElGanador] = useState("")
  const [victoriasJ1, setvictoriasJ1] = useState(0)
  const [victoriasJ2, setvictoriasJ2] = useState(0)
  const [isVsCPU, setIsVsCPU] = useState(null)


  const roca = {name : "rock", image: "https://i.ibb.co/2sPFxR5/Rock.png"}
  const papel = {name : "papper", image: "https://i.ibb.co/GsJCY3w/Papper.png"}
  const tijera = {name : "scissor", image: "https://i.ibb.co/fvfv4Zn/Sissors.png"}
  const lagarto = {name : "lizzard", image: "https://i.ibb.co/44JpdYy/Lizzard.png"}
  const spock = {name : "spock", image: "https://i.ibb.co/qNsHqn0/Spock.png"}
  const coleccion = [roca,papel,tijera, lagarto, spock]
  const history = useHistory();

  useEffect(()=> {

      setJugador1(JSON.stringify(localStorage.getItem("jugador1")))
      setJugador2(JSON.stringify(localStorage.getItem("jugador2")))
      setvictoriasJ1(JSON.parse(localStorage.getItem("victoriasJ1")))
      setvictoriasJ2(JSON.parse(localStorage.getItem("victoriasJ2")))
      setIsVsCPU(JSON.parse(localStorage.getItem("vsCPU")))
  })

  const setEleccionAJugador = (elem) =>{
    (turno == "jugador 1")? setUser1Select(elem):setUser2Select(elem)
  }

  const fijarEleccion = () => {
    setTurno("jugador 2")
  }
  function ganador(){
    
    const u1s = user1Selec
    const u2s = isVsCPU? coleccion[Math.floor(Math.random() * coleccion.length)].name: user2Selec
    console.log(u2s)
    let res = jugador1
    switch(u1s){
      case 'spock':
        res = u2s=="scissor"|| u2s == "rock"? jugador1: jugador2;
        break;
      case 'lizzard':
        res = u2s =="spock"|| u2s =="papper"? jugador1: jugador2;
        break;
      case 'papper':
        res = u2s =="rock"|| u2s =="spock"? jugador1: jugador2;
        break;
      case 'scissor':
        res = u2s =="lizzard"|| u2s =="papper"? jugador1: jugador2;
        break;
        case 'rock':
          res = u2s =="scissor"|| u2s =="lizzard"? jugador1: jugador2;
        break;
        default: res= "empate"
    }
    setElGanador(res)
    SetPuntosAGanador(res)
    prepararParaSiguienteDuelo()
  }

  function prepararParaSiguienteDuelo(){
    setUser1Select(null)
    setUser2Select(null)
    setTurno("jugador 1")
  }

  function SetPuntosAGanador (res) {
    if(res===jugador1){
      let puntos = victoriasJ1 + 1
      localStorage.removeItem("victoriasJ1")
      localStorage.setItem("victoriasJ1",puntos)
    }else{
      let puntos = victoriasJ2 + 1
      localStorage.removeItem("victoriasJ2")
      localStorage.setItem("victoriasJ2",puntos)
    }
  }

  const Pelea = ()=>{
    ganador()
  }

  const Lista = ({elem})=>{
    return(
      <img id="link" onClick={()=>setEleccionAJugador(elem.name)} src={elem.image} alt=""height="50"/>
    )
  }

  const Mostrar =()=>{
    if(!isVsCPU){
    return(
      <div className="container">
        <p>{turno}</p>
        {coleccion.map(elem=> <Lista elem={elem}/>)}
        <button onClick={fijarEleccion}>Elegir</button>
        {(user1Selec&&user2Selec)? <button onClick={Pelea}>Fight!</button> : <div/>}
        <div>
          {elGanador == ""? <div/>: elGanador }
        </div>
        <div>
          <p>victorias J1: {victoriasJ1}</p>
          <p>victorias J2: {victoriasJ2}</p>
        </div>
      </div>
    )
}else{
    return(
      <div className="container">
        <p>{turno}</p>
        {coleccion.map(elem=> <Lista elem={elem}/>)}

        {(user1Selec)? <button onClick={Pelea}>Fight!</button> : <div/>}
        <div>
          {elGanador == ""? <div/>: elGanador }
        </div>
      </div>
    )
}
}
  const salir = ()=>{
    localStorage.removeItem("jugador1")
    localStorage.removeItem("jugador2")
    localStorage.removeItem("cpu")
    history.push("./login")
  }
  return(

      <div>
        <button onClick={salir}>salir</button>
          Jugador 1 :{jugador1}
          jugador 2 :{jugador2} 
          <Mostrar/>
      </div>
      
  )
      
}

export default Home;