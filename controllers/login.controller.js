import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js"

const usersContent = [
    {
        id: 1,
        nombre: "Dan",
        apellido: "Ferrari",
        direccion: "Calle Falsa 123",
        movil: "+54 1234567890",
        email: "daniferrari1994@gmail.com",
        password: "Ferrari1994",
        role: "admin"
    },

    {
        id: 2,
        nombre: "User",
        apellido: "User",
        direccion: "Calle falsa 123",
        movil: "+54 1122334455",
        email: "user@user.com",
        password: "12345678",
        role: "user"
    }
];

export const getUsers = (req, res) => {
    res.send(usersContent);
}

export const validateCredentials = (req, res) => {

    const credentials = req.body;
    const indexUser = usersContent.findIndex(user => user.email === credentials.email)
    
    console.log("Index:",indexUser);
    console.log("Credenciales HTML", credentials.email, credentials.password);

    if (indexUser >= 0 && usersContent[indexUser].password === credentials.password) {
        console.log("User valido");
        const payload = {
            email: usersContent[indexUser].email,
            nombre: usersContent[indexUser].nombre,
            apellido: usersContent[indexUser].apellido,
            password: usersContent[indexUser].password,
            role: usersContent[indexUser].role
        }

        const token = jwt.sign(payload, SECRET_KEY);

        res.json({
            status: 'OK',
            token: token,
            message: 'Usuario Validado',
        })


    } else {
        console.log("Usuario no valido");
        res.json({
            status: 'NOT OK',
            message: 'Invalid user or password'
        })
    }
}

export const addUser = (req, res) => {
    const userToAdd = req.body;
    const index = usersContent.findIndex(user => user.email === userToAdd.email) 
      
    if (index < 0) {
        
        usersContent.push({
            id: usersContent.length+1,
            nombre: userToAdd.nombre,
            apellido: userToAdd.apellido,
            direccion: userToAdd.direccion,
            movil: userToAdd.movil,
            email: userToAdd.email,
            password: userToAdd.password,
            role: "user"
        });  

        res.send({
            status: "OK",
            description: "add user",
            usersContent
        });
    } else {
        res.send({
            status: "NOT OK",
            description: "User already exist",
            usersContent
        });
    }
}