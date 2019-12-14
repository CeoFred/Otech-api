
const env = process.env.NODE_ENV || "development";

const config = {
    development: {
        server: {
            port: process.env.PORT || 2000,
            hostname: process.env.HOSTNAME || "localhost",
        },
        database: {
            url: "mongodb://localhost/fixbot",
        },
    },

    test: {
        server: {
            port: process.env.PORT || 2001,
            hostname: process.env.HOSTNAME || "localhost",
        },
        database: {
            url: "mongodb+srv://fixbot-admin:messilo18_@node-app-gifce.gcp.mongodb.net/fixbot-test?retryWrites=true&w=majority",
        },
    },

    production: {
        server: {
            port: process.env.PORT || 443,
            hostname: process.env.HOSTNAME || "localhost",
        },
        database: {
            url:"mongodb+srv://fixbot-admin:messilo18_@node-app-gifce.gcp.mongodb.net/fixbot-main?retryWrites=true&w=majority",
        },
    },
    
};

config[env].isDev = env === "development";
config[env].isTest = env === "test";
config[env].isProd = env === "production";

exports.default = config[env];
