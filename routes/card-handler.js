const { card_model } = require("../db/model");

const save_card_data_handler = async (req, res) => {
    try {
        const { name, job_title, company, email, phone, address, file } = req.body;
        const obj = { name, job_title, company, email, phone, address, file };
        await card_model.create(obj);
        res.status(200).json({ msg: 'data has been saved.' });
    } catch (err) {
        console.log('err occurred while saving the card data --> ', err.message);
        res.status(400).json({ error: { msg: 'something went wrong.' } });
    }
}

const get_card_data_handler = async (req, res) => {
    try {
        let page_no = parseInt(req.query.page_no) > 0 ? parseInt(req.query.page_no) : 1;
        const limit = 5;
        const total = await card_model.countDocuments({});
        const data = await card_model.find({}, { file: 0 })
            .sort({ createdAt: -1 })
            .skip((page_no - 1) * limit)
            .limit(limit)
            .lean();
        res.status(200).json({ data, total });
    } catch (err) {
        console.log('err occurred while saving the card data --> ', err.message);
        res.status(400).json({ error: { msg: 'something went wrong.' } });
    }
}

module.exports = {
    save_card_data_handler,
    get_card_data_handler
}