'use strict';

const expect = require('chai').expect;
const shoppingCartClasses = require('./index');
const ProductsFactory = shoppingCartClasses.ProductsFactory;
const ShoppingCart = shoppingCartClasses.ShoppingCart;

describe('testing productsFactory', () => {
    it('should return the matching product', ()=>{
    let createdProduct = ProductsFactory.createProduct('Chirios', 'piece', 3.4);
    expect(createdProduct).to.eql(
        {
            id : createdProduct.id,
            name : 'Chirios',
            unit : 'piece',
            price : 3.4
        });
    });

    it('should return the matching product with unit piece', ()=>{
        let createdProduct = ProductsFactory.createProductWithPieceUnit('Mountain Dew 0.75', 1.3);
    expect(createdProduct).to.eql(
        {
            id : createdProduct.id,
            name : 'Mountain Dew 0.75',
            unit : 'piece',
            price : 1.3
        });
    });

    it('should return the matching product with unit kg', () =>{
        let createdProduct = ProductsFactory.createProductWithKgUnit('Potato', 0.9);
        expect(createdProduct).to.eql(
        {
            id : createdProduct.id,
            name : 'Potato',
            unit : 'kg',
            price : 0.9
        });
    });
});

describe('testing shoppingCart', () => {
    let cart;
    beforeEach(function(done) {
        cart = new ShoppingCart();
        done();
    });

    it('should return 0 productsInCart empty cart', () => {
        expect(cart.getProducts().length).to.eql(0);
    });

    it('should return 0 total cost for empty cart', () => {
        expect(cart.getTotalPrice()).to.eql(0);
    });

    it('should return 1 item if adding 1 item to the cart', () => {
        let product = ProductsFactory.createProductWithPieceUnit('Ketchup', 2.68);
        cart.addProductToCart(product , 1);
        expect(cart.getProducts().length).to.eql(1);
        expect(cart.getProducts()[0]).to.eql({
            product : product,
            quantity : 1
        });
    });

    it('should return 5 ketchup if adding 3 + 2 ketchup item to the cart', () => {
        let product = ProductsFactory.createProductWithPieceUnit('Ketchup', 2.68);
        cart.addProductToCart(product , 2);
        cart.addProductToCart(product , 3);
            expect(cart.getProducts()[0]).to.eql({
            product : product,
            quantity : 5
        });
    });

    it('should return 2 and 3 items if adding 3 + 2 items to the cart', () => {
        let product1 = ProductsFactory.createProductWithPieceUnit('Ketchup', 2.68);
        let product2 = ProductsFactory.createProductWithKgUnit('Potato', 0.9);
        cart.addProductToCart(product1 , 2);
        cart.addProductToCart(product2 , 3);

        console.log(cart.getProducts());

        //TODO: include contain nem működik????
        expect(cart.getProducts()[0]).to.eql({
            product : product1,
            quantity : 2
        });

        expect(cart.getProducts()[1]).to.eql({
            product : product2,
            quantity : 3
        });
    });
    it('should return the price of 5 ketchup if adding 3 + 2 ketchup item to the cart', () => {
        let product = ProductsFactory.createProductWithPieceUnit('Ketchup', 2.68);
        cart.addProductToCart(product , 2);
        cart.addProductToCart(product , 3);
        expect(cart.getTotalPrice()).to.closeTo(
            5 * 2.68,0.1
        );
    });

    it('the total price should work with kg or other type of units too', () =>{
        let product = ProductsFactory.createProductWithKgUnit('Mushroom', 1.6);
        cart.addProductToCart(product , 2.3);

        expect(cart.getTotalPrice()).to.closeTo(
            2.3 * 1.6,0.1
        );
    });

    it('the total price should work with kg or other type of units too', () =>{
        let product = ProductsFactory.createProductWithKgUnit('Mushroom', 1.6);
        cart.addProductToCart(product , 2.3);
        cart.removeProduct(product);

        expect(cart.getProducts().length).to.eql(0);
        expect(cart.getTotalPrice()).to.eql(0);
    });

});