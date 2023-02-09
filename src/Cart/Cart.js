"use strict";

const EmptyCartException = require("../Cart/EmptyCartException.js");
const UpdateCartException = require("../Cart/UpdateCartException.js");
const CartItem = require("../CartItem/CartItem.js");

module.exports = class Cart {

    #items = [];

    constructor(items) {
        this.#items = items || [];
    }

    get total() {
        return this.items.reduce((total, item) => total + item.total, 0);
    }

    get items() {
        if(this.#items.length === 0) {
            throw new EmptyCartException();
        }
        return this.#items;
    }

    count(distinct) {
        if (distinct) {
          return new Set(this.items.map(item => item.articleId)).size;
        } else {
          return this.items.reduce((sum, item) => sum + item.quantity, 0);
        }
    }
    

    add(items) {
        if(!items || items.length <= 0) {
            throw new UpdateCartException();
        }
        items.map((item) => {
            if(item instanceof CartItem === false)
                throw new UpdateCartException();
            else
                this.#items.push(item)
        });
    }

    remove (item) {
        this.#items = this.#items.filter(i => i !== item);
    }

}