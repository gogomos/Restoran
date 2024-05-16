// validators.js
const Joi = require('joi');

// Repas validation schema
const repasSchema = Joi.object({
    nom: Joi.string().required(),
    description: Joi.string().required(),
    prix: Joi.number().positive().required(),
    categorie_id: Joi.number().integer().positive().required(),
    restaurant_id: Joi.number().integer().positive().required(),
    image_url: Joi.string().optional().allow(null, '')
});

// Employe validation schema
const employeSchema = Joi.object({
    nom: Joi.string().required(),
    poste: Joi.string().required(),
    restaurant_id: Joi.number().integer().positive().required(),
    image_url: Joi.string().optional().allow(null, '')
});

module.exports = {
    repasSchema,
    employeSchema
};
