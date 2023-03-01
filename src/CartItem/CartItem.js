"use strict";

const InvalidArticleIdException = require("./InvalidArticleIdException.js");
const InvalidQuantityException = require("./InvalidQuantityException.js");
const InvalidPriceException = require("./InvalidPriceException.js");
const InvalidCurrencyException = require("./InvalidCurrencyException.js");

module.exports = class CartItem {

    //region private attributes
    #articleId;
    #name;
    #quantity;
    #price;
    #currency;
    //endregion private attributes

    //region public methods
    constructor(articleId, name, quantity, price, currency){

        if(articleId < 1) throw new InvalidArticleIdException()
        if(quantity < 1) throw new InvalidQuantityException()
        if(price < quantity) throw new InvalidPriceException()
        if(currency && currency.length !== 3) throw new InvalidCurrencyException()
        

        this.#articleId = articleId
        this.#name = name
        this.#quantity = quantity
        this.#price = price
        this.#currency = currency || "CHF"
        
    }

    get articleId() {
        return this.#articleId;
    }

    get name() {
        return this.#name;
    }

    get quantity() {
        return this.#quantity;
    }

    get price() {
        return this.#price;
    }

    get currency() {
        return this.#currency;
    }

    get total() {
        return this.#quantity * this.#price;
    }
  

    set quantity(value) {
        if(value < 0){
            throw new InvalidQuantityException();
        }
        this.#quantity = value;
    }

    

    set price(value) {
        if(value < this.#quantity){
            throw new InvalidPriceException();
        }
        this.#price = value;
    }

}



