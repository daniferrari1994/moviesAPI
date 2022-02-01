let cartContent = [];

export const getCart = (req, res) => {
    res.send(cartContent);
}


export const addToCart = (req, res) => {
    const itemToAdd = req.body;

    if (cartContent.findIndex(movie => movie.id === itemToAdd.id) < 0) {
        cartContent.push(itemToAdd);   
        res.send({
            status: "OK",
            description: "Add movie",
            cartContent
        });
    } else {
        res.send({
            status: "NOT OK",
            description: "Movie already exist",
            cartContent
        });
    }
}

export const removeFromCart = (req, res) => {
    const urlId = req.query.id;
    const indextoRemove = cartContent.findIndex(movie => movie.id === urlId);

    if (indextoRemove >= 0) {
        cartContent.splice(indextoRemove, 1);
        res.send({
            status: "OK",
            description: "Delete movie",
            cartContent
        });
    } else {
        res.send({
            status: "NOT OK",
            description: "Movie not found",
            cartContent
        });
    }

}

export const clearCart = (req, res) => {
    cartContent = [];
    res.send({
        status: "OK",
        description: "Cart empty",
        cartContent
    });
}