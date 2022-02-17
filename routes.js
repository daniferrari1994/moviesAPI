import { addToCart, clearCart, getCart, removeFromCart } from "./controllers/cart.controller.js"
import { getTest } from "./controllers/test.controller.js"
import { addUser, getUsers, validateCredentials } from "./controllers/login.controller.js"
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./config/config.js";
import express from "express";

export const routes = (app) => {

    app.route('/api/test')
        .get(getTest)

    app.route('/api/cart')
        .get(getCart)
        .post(addToCart)
        .delete(removeFromCart)

    app.route('/api/cart/clear')
        .delete(clearCart)

    app.route('/api/login')
        .get(getUsers)
        .post(addUser)

    app.route('/api/login/validate')
        .post(validateCredentials)  
}

const checkToken = express.Router();  
checkToken.use((req, res, next) => {

    let token = req.headers['authorization'];
    console.log(token);
    token = token.replace('Bearer ', '')
    console.log(token);
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.json({
                    status: 'NOT - OK',
                    mensaje: 'Token inválido'
                });
            } else {
               
                req.decoded = decoded;    
                next();
            }
        });
    } else {
        res.send({
            status: 'NOT - OK',
            mensaje: 'Token no provisto'
        });
    }
});