const { file_model } = require('./../db/model');
const tesseract = require('tesseract.js');
const sharp = require('sharp');
const { parse_card_data } = require('./../utils/utils');

const file_upload_handler = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'file is required.' });
        }

        const new_file = await file_model.create({
            name: req.file.originalname,
            file: {
                data: req.file.buffer,
                content_type: req.file.mimetype,
            },
        });

        const img_buffer = await sharp(req.file.buffer)
            .resize(1000)
            .grayscale()
            .toBuffer();

        const result = await tesseract.recognize(img_buffer, 'eng',
            { tessedit_pageseg_mode: tesseract.PSM.AUTO, }
        );

        const data = parse_card_data(result.data.text);

        data.file = new_file._id;

        res.status(200).json({ data });
    } catch (err) {
        console.error(`error occurred while uploading the file --> ${err.message}`);
        res.status(500).json({ error: { msg: 'something went wrong.' } });
    }
}

module.exports = { file_upload_handler };