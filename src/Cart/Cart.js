"use strict";

const UpdateCartException = require("../Cart/UpdateCartException.js");
const MultipleCurrenciesException = require("../Cart/MultipleCurrenciesException.js");
const CartItem = require("../CartItem/CartItem.js");
const EmptyCartException = require("./EmptyCartException.js");

module.exports = class Cart {

    #items = [];
    #currency = "CHF";
    #total = 0;

    constructor(items) {
        this.add(items)
        this.#currency = this.#items.length > 0 ? this.#items[0].currency : "CHF";
        this.#total = 0;
    }

    get total() {
        if ( this.#items.length > 0) {
            return this.items.reduce((total, item) => total + item.total, 0);
        } else {
            return this.#total;
        }
    }

    get items() {
        if(this.#items.length === 0) {
            return [];
        }
        return this.#items;
    }
    
    get currency() {
        return this.#currency;
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
            return
        }
        if (this.#items.length === 0) {
            this.#currency = items[0].currency;
        }

        items.map((item) => {
            if(item instanceof CartItem === false)
                throw new UpdateCartException();
            else
                if (item.currency !== this.#currency) {
                    throw new MultipleCurrenciesException();
                }
                this.#items.push(item)
        });

    }

    remove (item) {
        this.#items = this.#items.filter(i => i !== item);
    }

}