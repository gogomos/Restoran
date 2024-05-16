// middleware/validate.js
const { repasSchema } = require('../helpers/validators');
const validate = (req, res, next) => {
        console.log(req.body);
        const { error } = repasSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                errors: error.details.map(detail => detail.message)
            });
        }

        next();
};
module.exports = validate;
