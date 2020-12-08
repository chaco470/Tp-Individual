import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";





const Login = () => {
  const history = useHistory();
  const [jugador2, setJugador2] = useState("");
  const [habilitado, setHabilitarJ2] = useState(false);
  const [jugador1, setJugador1] = useState("");



  const jugarCpu= () =>{
    localStorage.setItem("vsCPU",true)
    localStorage.setItem("victoriasJ1",0)
    localStorage.setItem("victoriasJ2",0)
    localStorage.setItem("jugador2","cpu")
    localStorage.setItem("jugador1",jugador1)
    history.push("./home")
  }
  const jugarPlayer = () => {
    localStorage.setItem("vsCPU",false)
    localStorage.setItem("victoriasJ1",0)
    localStorage.setItem("victoriasJ2",0)
    localStorage.setItem("jugador1",jugador1);
    localStorage.setItem("jugador2",jugador2)
    history.push("/home");
    
      }


const handleInputChange = (event) => {

  setJugador1(event.target.value)
}
const handleInputChange2 = (event) => {

  setJugador2(event.target.value)
}
  
const habilitarJugador = () => {
  setHabilitarJ2(true)
}

return (
  <div>
      
        <label>
          NameTag
          <input
            value={jugador1}
            onChange={handleInputChange}
            className="form-control"
          ></input>
        </label>
        <p>Elegir Oponente</p>
        <button onClick={()=>habilitarJugador()}>vsPlayer</button>
        <button onClick={()=>jugarCpu()}>vsCpu</button>
        {habilitado?
        (<label>
        NameTagPlayer2
          <input
          value={jugador2}
          onChange={handleInputChange2}
          className="form-control"
        ></input>
        <button onClick={()=>jugarPlayer()}>
          Jugar
        </button>
      </label>
      ):<div></div>}
    </div>
)
        }
export default Login;
