import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css"


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
  event.preventDefault()
  setJugador1(event.target.value)
}
const handleInputChange2 = (event) => {
  event.preventDefault()
  setJugador2(event.target.value)
}
  
const habilitarJugador = () => {
  setHabilitarJ2(true)
}

return (
  <body>
<div class="container" align= "center">
	<section id="content">
		<form action="">
			<h1>Piedra, Papel, Tijera, Lagarto, Spock</h1>
			<div >
				<input value={jugador1} onChange={handleInputChange} type="text" placeholder="Nombre Jugador 1" required="" id="username" />
			</div>
			<div>
        {habilitado?
    (<label>
      <input value={jugador2} onChange={handleInputChange2} type="text" placeholder="Nombre Jugador 2" required="" id="username" 
      className="form-control"></input>
    <input text-align= "center" id="imput" onClick={()=>jugarPlayer()} value= "JUGAR"/>
  </label>
  ):<div></div>}
			</div>
			<div>
				<input id="imput" value="VSCPU" onClick={()=>jugarCpu()}/>
        
        <input id="imput" onClick={()=>habilitarJugador()} value = "VSJugador"/>
			</div>
		</form>
	</section>
</div>
</body>
)

}
export default Login;
