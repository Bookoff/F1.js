/**
 * Author: Filnik
 * Creation date: 25/01/13 | 15:57
 * Project: F1.js
 * License: MIT
 */

"use strict";

function Entity (client, id, address) {
    this.client = client;
    this.id = id;
    this.address = address;
}

Entity.find = function (id, fn) {
    this.client.hgetall('entity:' + id + ':address', function (err, obj) {
        if (err){
            return fn(err);
        }
        return fn(null, new Entity(this.client, id, obj));
    });
};

Entity.prototype.save = function(fn){
    this.client.hmset('entity:' + this.id + ':address', this.address, fn);
};

module.exports = Entity;