import { useState } from "react"
import "../styles/Login.css"

export default function Register() {

const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

async function handleRegister(){

try{

const response=
await fetch(
"http://localhost:3333/api/auth/register",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({
name,
email,
password
})

}
)

const data=
await response.json()

if(!response.ok){

throw new Error(
data.message
)

}

alert(
"Conta criada!"
)

console.log(data)

}
catch(err){

alert(
"Erro ao criar conta"
)

console.log(err)

}

}

return (

<div className="login">

<div className="card">

<h1>
Criar Conta
</h1>

<p>
Cadastre sua conta
</p>

<button className="social google">

Continuar com Google

</button>

<button className="social github">

Continuar com GitHub

</button>

<div className="separator">

ou

</div>

<input

placeholder="Nome"

value={name}

onChange={
(e)=>
setName(
e.target.value
)
}

/>

<input

placeholder="Email"

value={email}

onChange={
(e)=>
setEmail(
e.target.value
)
}

/>

<input

type="password"

placeholder="Senha"

value={password}

onChange={
(e)=>
setPassword(
e.target.value
)
}

/>

<button

className="login-btn"

onClick={
handleRegister
}

>

Criar Conta

</button>

<span>

Já possui conta?

<a href="/login">

Entrar

</a>

</span>

</div>

</div>

)

}