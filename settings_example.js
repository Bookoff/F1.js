module.exports = {
    "express" : {
        "port" : 3000
    },
    "distribution" : {
        "grade" : "single-process", // grade can be: single-process, multi-process or multi-server
        "type" : "redis", // memory (=single-process) and redis are now supported
        "settings": {
            "port" 	: 9202,
            "host" 	: "spadefish.redistogo.com",
            "db"	: 1,
            "auth" : ""
        }
    }
}