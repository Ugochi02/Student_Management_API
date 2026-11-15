const router = require('express').Router();
const { addStudent, getOneStudent, getAllStudents, updateStudent, deleteStudent, uploadGallery, uploadDifferentImages } = require('../controllers/studentController');
const upload = require('../middleware/multer');
const { studentValidation, updateStudentValidation } = require('../validation/studentValidation.js')


router.post('/api/student', upload.single('profileImage'), studentValidation, addStudent);

router.get('/api/onestudent/:id', getOneStudent);

router.get('/allstudent', getAllStudents);

router.put('/api/updatestudent/:id', upload.single('profileImage'), updateStudentValidation, updateStudent);

router.delete('/api/deletestudent/:id', deleteStudent);

router.post('/api/students/:id/gallery',upload.array('galleryImages', 5),uploadGallery);

router.post('/api/students/:id/images',upload.fields([
        { name: 'passportImage', maxCount: 1 },
        { name: 'identityCardImage', maxCount: 1 },
        { name: 'profileImage', maxCount: 1 },
        { name: 'galleryImages', maxCount: 5 }
    ]), uploadDifferentImages);


module.exports = router
