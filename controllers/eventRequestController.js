const CarRequest = require("../models/CarRequestModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// CarRequest Schema
function CarRequestData(data) {
	this.title= data.title;
	this.description = data.description;
	this.isbn = data.isbn;
	this.createdAt = data.createdAt;
}

/**
 * 
 * Update Current Car Status
 */
exports.getCarStatus =  [(req,res) => {
	return apiResponse.successResponse(res,'connected')
}]
/**
 * CarRequest List.
 * 
 * @returns {Object}
 */
exports.CarRequestList = [
		function (req, res) {
		try {
			CarRequest.find({user: req.user._id},"title description isbn createdAt").then((CarRequests)=>{
				if(CarRequests.length > 0){
					return apiResponse.successResponseWithData(res, "Operation success", CarRequests);
				}else{
					return apiResponse.successResponseWithData(res, "Operation success", {});
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * CarRequest Detail.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.CarRequestDetail = [
	auth,
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.successResponseWithData(res, "Operation success", {});
		}
		try {
			CarRequest.findOne({_id: req.params.id,user: req.user._id},"title description isbn createdAt").then((CarRequest)=>{                
				if(CarRequest !== null){
					let CarRequestData = new CarRequestData(CarRequest);
					return apiResponse.successResponseWithData(res, "Operation success", CarRequestData);
				}else{
					return apiResponse.successResponseWithData(res, "Operation success", {});
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * CarRequest store.
 * 
 * @param {string}      title 
 * @param {string}      description
 * @param {string}      isbn
 * 
 * @returns {Object}
 */
exports.CarRequestStore = [
	auth,
	body("title", "Title must not be empty.").isLength({ min: 1 }).trim(),
	body("description", "Description must not be empty.").isLength({ min: 1 }).trim(),
	body("isbn", "ISBN must not be empty").isLength({ min: 1 }).trim().custom((value,{req}) => {
		return CarRequest.findOne({isbn : value,user: req.user._id}).then(CarRequest => {
			if (CarRequest) {
				return Promise.reject("CarRequest already exist with this ISBN no.");
			}
		});
	}),
	sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var CarRequest = new CarRequest(
				{ title: req.body.title,
					user: req.user,
					description: req.body.description,
					isbn: req.body.isbn
				});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				//Save CarRequest.
				CarRequest.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
					let CarRequestData = new CarRequestData(CarRequest);
					return apiResponse.successResponseWithData(res,"CarRequest add Success.", CarRequestData);
				});
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * CarRequest update.
 * 
 * @param {string}      title 
 * @param {string}      description
 * @param {string}      isbn
 * 
 * @returns {Object}
 */
exports.CarRequestUpdate = [
	auth,
	body("title", "Title must not be empty.").isLength({ min: 1 }).trim(),
	body("description", "Description must not be empty.").isLength({ min: 1 }).trim(),
	body("isbn", "ISBN must not be empty").isLength({ min: 1 }).trim().custom((value,{req}) => {
		return CarRequest.findOne({isbn : value,user: req.user._id, _id: { "$ne": req.params.id }}).then(CarRequest => {
			if (CarRequest) {
				return Promise.reject("CarRequest already exist with this ISBN no.");
			}
		});
	}),
	sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var CarRequest = new CarRequest(
				{ title: req.body.title,
					description: req.body.description,
					isbn: req.body.isbn,
					_id:req.params.id
				});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				if(!mongoose.Types.ObjectId.isValid(req.params.id)){
					return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
				}else{
					CarRequest.findById(req.params.id, function (err, foundCarRequest) {
						if(foundCarRequest === null){
							return apiResponse.notFoundResponse(res,"CarRequest not exists with this id");
						}else{
							//Check authorized user
							if(foundCarRequest.user.toString() !== req.user._id){
								return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
							}else{
								//update CarRequest.
								CarRequest.findByIdAndUpdate(req.params.id, CarRequest, {},function (err) {
									if (err) { 
										return apiResponse.ErrorResponse(res, err); 
									}else{
										let CarRequestData = new CarRequestData(CarRequest);
										return apiResponse.successResponseWithData(res,"CarRequest update Success.", CarRequestData);
									}
								});
							}
						}
					});
				}
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * CarRequest Delete.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.CarRequestDelete = [
	auth,
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
		}
		try {
			CarRequest.findById(req.params.id, function (err, foundCarRequest) {
				if(foundCarRequest === null){
					return apiResponse.notFoundResponse(res,"CarRequest not exists with this id");
				}else{
					//Check authorized user
					if(foundCarRequest.user.toString() !== req.user._id){
						return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
					}else{
						//delete CarRequest.
						CarRequest.findByIdAndRemove(req.params.id,function (err) {
							if (err) { 
								return apiResponse.ErrorResponse(res, err); 
							}else{
								return apiResponse.successResponse(res,"CarRequest delete Success.");
							}
						});
					}
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];