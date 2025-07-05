const joi = require('joi');

module.exports.listingSchema = joi.object({
    listing : joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().required().min(0),
        //   image: joi.string().uri().required(),
         image: joi.array().items(
         joi.object({
            url: joi.string().uri().required(),
            filename: joi.string().allow("", null)
        })).required()
    }).required()
});

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        comment: joi.string().required(),
    }).required(),
});