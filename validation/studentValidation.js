const Joi = require('joi');

const studentValidation = (req, res, next) => {
    const schema = Joi.object({
        fullName: Joi.string().trim().pattern(new RegExp('^[A-Za-z]{3,}$')).required().message({
            "any.required": "fullName must be entered.",
            "string.empty": "fullName cannot be empty."
        }),
        email: Joi.string().email().trim().required().messages({
            "any.required": "Email must be required",
            "string.empty": "Email cannot be empty",
            "string.email": "Email must be a valid email format."
        }),
        phone: Joi.string().min(10).required().message({
            "any.required": "PhoneNumber must be required",
            "string.empty": "PhoneNumber cannot be empty"
        }),
        department: Joi.string().trim.required().messages({
            "any.required": "Department must be required",
            "string.empty": "Department cannot be empty."
        })
    });
    
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ 
            message: error.details[0].message 
        })
    }

    next();
}

const updateStudentValidation = (req, res, next) => {
    const schema = Joi.object({
        studentId: Joi.string().valid("JPG", "JPEG", "PNG").required().messages({
            "any.required": "Student ID must exist before uploading images."
        }),
    })
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    next();
}

module.exports = {
    studentValidation,
    updateStudentValidation
}                                                