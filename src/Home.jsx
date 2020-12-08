import React, { useState, useEffect } from "react";
import "./LinkSelectorText.css"
import { useHistory } from "react-router-dom";

const Home = () =>{
  const [jugador1, setJugador1] = useState({})
  const [user1Selec, setUser1Select] = useState()
  const [user2Selec, setUser2Select] = useState({})
  const [turno, setTurno] = useState("jugador 1")
  const [jugador2, setJugador2] = useState({})


  const history = useHistory();

  useEffect(()=> {

      setJugador1(JSON.stringify(localStorage.getItem("jugador1")))
      setJugador2(JSON.stringify(localStorage.getItem("jugador2")))
  })

  const Roca = ()=>{
    const name = "rock"
    const img = "https://i.ibb.co/2sPFxR5/Rock.png"
    function leGanaA(otro){
      return(otro.name =="lizzard"|| otro.name =="scissor")
    }
    return(
    
          <img id="link" value = {name}  onClick={()=>setEleccionAJugador(Roca)} src={img} alt="" height="50"/>
   
    )
  } 
  const Papel = ()=>{
    const name = "papper"
    const img = "https://i.ibb.co/GsJCY3w/Papper.png"
    function leGanaA(otro){
      return(otro.name =="spock"|| otro.name =="rock")
    }
    return(
      
        <img value = {name}  onClick={()=>setEleccionAJugador(Papel)} id="link" src={img} alt=""height="50"/>
      
    )
  } 
  const Tijera = ()=>{
    const name = "scissor"
    const img = "https://i.ibb.co/fvfv4Zn/Sissors.png"
    function leGanaA(otro){
      return(otro.name =="lizzard"|| otro.name =="papper")
    }
    return(
      
          <img value = {name} onClick={()=>setEleccionAJugador(Tijera)} id="link" src={img} alt=""height="50"/>
     
    )
  }
  const Lagarto = ()=>{
    const name = "lizzard"
    const img = "https://i.ibb.co/44JpdYy/Lizzard.png"
    function leGanaA(otro){
      return(otro.name =="spock"|| otro.name =="papper")
    }
    return(
      
          <img id="link" value = {name}  onClick={()=>setEleccionAJugador(Lagarto)} src={img} alt=""height="50"/>
      
    )
  }

  const Spock = ()=>{
    const name = "spock"
    const img = "https://i.ibb.co/qNsHqn0/Spock.png"
    const leGanaA =(otro)=>{
      return(otro.prop.name =="rock"|| otro.prop.name =="scissor")
    }
    return(
          <img id="link" value = {name}  onClick={()=>setEleccionAJugador(()=>Spock())} src={img} alt=""height="50"/>
          
    )
  }

  const setEleccionAJugador = (elem) =>{
    (turno == "jugador 1")? setUser1Select(elem):setUser2Select(elem)
    console.log(user1Selec)
    console.log(user2Selec)
  }

  const fijarEleccion = () => {
    setTurno("jugador 2")
  }
  function ganador(){
    const u1s = user1Selec.props.value
    const u2s = user2Selec.props.value
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
    return res
  }
  const Pelea = ()=>{
    console.log(ganador())
  }
  const VsJugador = () =>{
    return(
      <div className="container">
        <p>{turno}</p>
        <Roca/><Papel/><Tijera/><Lagarto/><Spock/>
        <button onClick={fijarEleccion}>Elegir</button>
        {(user1Selec&&user2Selec)? <button onClick={Pelea}>Fight!</button> : <div/>}
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
          Jugador 1 :{JSON.stringify(localStorage.getItem("jugador1"))}
          jugador 2 :{localStorage.getItem("cpu")?(
            JSON.stringify(localStorage.getItem("cpu"))):
            JSON.stringify(localStorage.getItem("jugador2")) 
        } 
          <VsJugador/>
      </div>
      
  )
      
}

export default Home;