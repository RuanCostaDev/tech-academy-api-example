import express, { application } from "express";
import {StatusCodes} from "http-status-codes"


const app = express();
const PORT = process.env.PORT || 3000; //para definir uma porta dinâmica/ variável de ambiente ou default
let users = [
    { id: 1, name: 'Rafael Ribeiro', age: 31 },
    { id: 2, name: 'Gabriel Custódio', age: 27 },
];

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/', (request, response)=> {
    return response.send('<h1>Trabalhando com servidor express</h1>')
});

app.get('/users', (reques, response) => {
    return response.send(users);
});

app.get('/users/:userId', (request, response ) => {
    const userId = request.params.userId;
    const user = users.find(user => {
        return (user.id === Number(userId))
    });
    return response.send(user);
});

app.post('/users', (request, response) => {
    const newUser = request.body;

    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser);
});

app.put('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const updatedUser = request.body;

    users = users.map(user => {
        if (Number(userId) === user.id) {
            return updatedUser;
        }

        return user;
    });
    return response.send(updatedUser);
});

app.delete('/users/:userId', (request, response) => {
    const userId = request.params.userId;

    users = users.filter((user) => user.id !== Number(userId));

    return response.status(StatusCodes.NO_CONTENT).send();
});