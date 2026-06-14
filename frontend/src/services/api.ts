const API_URL =
"http://localhost:3333/api"

export async function registerUser(
name:string,
email:string,
password:string
){

const response=
await fetch(
`${API_URL}/auth/register`,
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

if(!response.ok){

throw new Error(
"Erro ao registrar"
)

}

return response.json()

}