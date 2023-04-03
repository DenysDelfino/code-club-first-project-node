const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())

/*  
    - Query params => meusite.com/users?nome=rodolfo&age=28   // FILTROS
    - Route params => /users/2    // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
    - Request Body => { "name":"Rodolfo","age":}

    -GET           => Busca informação no back-end
    -POST          => Criar informação no back-end
    -PUT / PATCH   => Alterar/Atualizar informação no back-end
    - DELETE       => Deletar informação no back-end
*/

/* Método GET
const users = []

app.get('/users', (request, response) => {
    return response.json(users)
})
*/

/* Método POST */
const users = [] // Nunca utiliza isso na vida real, pq se reiniciar o servidor irá perder tudo.

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body
   
   const user = { id:uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', (request, response) => { // Método PUT para atualização de dados.
    const { id } = request.params
    const { name, age } = request.body

    const updatedUser = { id, name, age }

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({ message: "User not found"})
    }

    users[index] = updatedUser
    
    return response.json(updatedUser)
})

app.delete('/users/:id', (request, response) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({ message: "User not found"})
    }

    users.splice(index,1)

    return response.status(204).json()
})










app.listen(port, () =>{
    console.log(`✔ Server started on port ${port}`)
})