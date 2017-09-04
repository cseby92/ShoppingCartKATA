'use strict';

const idcreator = require('shortid');

class ProductsFactory {

     static createProduct(name, unit, price){
        return {
            id : idcreator.generate(),
            name : name,
            unit : unit,
            price : price
        }
    }

    static createProductWithPieceUnit(name, price){
        return {
            id : idcreator.generate(),
            name : name,
            unit : 'piece',
            price : price
        }
    }

    static createProductWithKgUnit(name, price){
        return {
            id : idcreator.generate(),
            name : name,
            unit : 'kg',
            price : price
        }
    }

}

class ShoppingCart {
    constructor(){
        this.productsInCart = [];
        this.totalPrice = 0;
    }

    addProductToCart(product, quantity) {
        let productInCart = this._getProductIfExists(product);

        if(productInCart){
            productInCart.quantity += quantity;
        }
        this.productsInCart.push({
            product : product,
            quantity : quantity
        })

        this._addItemsCostToTotalPrice(product,quantity);

    }
    _getProductIfExists(product){

        for(let i = 0; i < this.productsInCart.length; i++) {
            if(this.productsInCart[i].product.id === product.id)
                return this.productsInCart[i];
        }
        return null;
    }

    _addItemsCostToTotalPrice(product, quantity){
        this.totalPrice += product.price * quantity;
    }

    getTotalPrice(){
        return this.totalPrice;
    }

    getProducts(){
        return this.productsInCart;
    }

    removeProduct(product){
        for(let i=0; i < this.productsInCart.length; i++){
            if(this.productsInCart[i].product === product ){
                let removed = this.productsInCart.splice(i,1)[0];
                this._removeCostFromTotalPrice(removed.product, removed.quantity );
                return;
            }
        }
    }

    _removeCostFromTotalPrice(product, quantity ){
        this.totalPrice -= product.price * quantity;
    }


}
module.exports = {ProductsFactory, ShoppingCart};