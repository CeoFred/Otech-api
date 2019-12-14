const successResponse = function (res, msg) {
    var data = {
        status: 1,
        message: msg
    };
    return res.status(200).json(data);
};

const successResponseWithData = function (res, msg, data) {
    var resData = {
        status: 1,
        message: msg,
        data: data
    };
    return res.status(200).json(resData);
};

const ErrorResponse = function (res, msg) {
    var data = {
        status: 0,
        message: msg,
    };
    return res.status(500).json(data);
};

const notFoundResponse = function (res, msg) {
    var data = {
        status: 0,
        message: msg,
    };
    return res.status(404).json(data);
};

const validationErrorWithData = function (res, msg, data) {
    var resData = {
        status: 0,
        message: msg,
        data: data
    };
    return res.status(400).json(resData);
};

const  unauthorizedResponse = function (res, msg) {
    var data = {
        status: 0,
        message: msg,
    };
    return res.status(401).json(data);
};

module.exports = {
    unauthorizedResponse,validationErrorWithData,notFoundResponse,ErrorResponse,successResponse,successResponseWithData
}