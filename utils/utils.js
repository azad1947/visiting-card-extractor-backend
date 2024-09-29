const multer = require('multer');

// File upload configuration
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|png/;
        const extname = fileTypes.test(file.mimetype);
        if (extname) {
            return cb(null, true);
        } else {
            cb(new Error('Error: File upload only supports the following filetypes: ' + fileTypes), false);
        }
    }
});

const parse_card_data = (data) => {
    const lines = data.split('\n').map(line => line.trim()).filter(line => line);

    const result = {
        name: null,
        job_title: null,
        company: null,
        email: null,
        phone: null,
        address: null
    };

    const job_titles = ["CEO", "Manager", "Director", "Engineer", "Founder", "Developer",
        "Tester", "Designer", "Consultant", "Teacher", "Lawyer",];
    const company_keywords = ["Inc", "LLC", "Corp", "Company", "Ltd", "Technologies", "Solutions"];
    const address_keywords = ["street", "st", "road", "rd", "avenue", "ave",
        "lane", "ln", "drive", "dr", "building", "apt", "apartment",
        "block", "city", "state", "country", "floor"];
    const email_regex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
    const phone_regex = /^(?:[a-zA-Z]+\s*[+-]?\d+(-\d+)?(\s+[+-]?\d+(-\d+)?)*|([+-]?\d+(-\d+)?(\s+[+-]?\d+(-\d+)?)*?)?)$/;

    const address_lines = []
    lines.forEach(line => {
        //check for mail
        const words = line.split(' ');
        if (!result.name && (words.length === 2 || words.length === 3)) {
            result.name = line;
            return;
        }

        //check for email
        if (!result.email && email_regex.test(line)) {
            result.email = line.match(email_regex)[0];
            return;
        }

        // check for phone
        if (!result.phone && phone_regex.test(line)) {
            result.phone = line.match(/[+-]?\s*\d+/g).join('');
            return;
        }

        // check for job title
        if (!result.job_title && job_titles.some(title => line.toLowerCase().includes(title.toLowerCase()))) {
            result.job_title = line;
            return;
        }

        // check for company
        if (!result.company && company_keywords.some(keyword => line.includes(keyword))) {
            result.company = line;
            return;
        }

        // check for address
        // TODO: we can add some map library to extract address
        // if (!result.address && (/\d{1,2}/.test(line) || address_keywords.some(keyword => line.toLowerCase().includes(keyword)))) {
        //     result.address = line;
        //     return;
        // }

        const has_number = /\d/.test(line);
        const has_address_keyword = address_keywords.some(keyword => line.toLowerCase().includes(keyword));

        if (has_number || has_address_keyword) {
            address_lines.push(line);
        }

    });

    result.address = address_lines.join(', ');

    return result;
}

module.exports = { upload, parse_card_data };