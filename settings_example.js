"use strict";

module.exports = {
    "express" : {
        "port" : 3000
    },
    "distribution" : {
        "type" : "redis", // memory (=single-process) and redis are now supported
        "settings": {
            "port" 	: 9202,
            "db"    : 1,
            "host" 	: "spadefish.redistogo.com",
            "password" : ""
        },
        "distributedEntities"   : undefined,
        "localEntities"         : ["webserver", "nameserver"]
        /*
         "settings": {
         "db"    : 1,
         "port" 	: 6379,
         "host" 	: "127.0.0.1"
         }
         */
    },
    "cookies" : {
        "key" : "rand key"
    }
}