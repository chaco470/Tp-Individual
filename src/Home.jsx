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
  })
  const Roca = ()=>{
    const name = "rock"
    const img = "https://i.ibb.co/2sPFxR5/Rock.png"
    return(
    
          <img id="link" value = {name}  onClick={()=>setEleccionAJugador(Roca)} src={img} alt="" height="50"/>
   
    )
  } 
  const setEleccionAJugador = (elem) =>{
    (turno == "jugador 1")? setUser1Select(elem):setUser2Select(elem)
  }

  const fijarEleccion = () => {
    setTurno("jugador 2")
  }
  function ganador(){
    const u1s = user1Selec
    const u2s = user2Selec
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
  }
  const Pelea = ()=>{
    ganador()
  }

  const Lista = ({elem})=>{
    return(
      <img id="link" onClick={()=>setEleccionAJugador(elem.name)} src={elem.image} alt=""height="50"/>
    )
  }

  const VsJugador = () =>{
    return(
      <div className="container">
        <p>{turno}</p>
        {coleccion.map(elem=> <Lista elem={elem}/>)}
        <button onClick={fijarEleccion}>Elegir</button>
        {(user1Selec&&user2Selec)? <button onClick={Pelea}>Fight!</button> : <div/>}
        <div>
          {elGanador == ""? <div/>: elGanador }
        </div>
      </div>
    )
  }

  const VsCPU = () =>{
    setUser2Select(coleccion[Math.floor(Math.random() * coleccion.length)]);
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
          {jugador2==="cpu"? <VsCPU/> : <VsJugador/>}
      </div>
      
  )
      
}

export default Home;