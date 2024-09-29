const { Router } = require('express');
const { file_upload_handler } = require('./file-upload-handler');
const { save_card_data_handler, get_card_data_handler } = require('./card-handler');
const { upload } = require('./../utils/utils');

const router = Router();

router.post('/upload', upload.single('file'), file_upload_handler);
router.post('/save/card', save_card_data_handler);
router.get('/get/cards', get_card_data_handler);

module.exports = router;