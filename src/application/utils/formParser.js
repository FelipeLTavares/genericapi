const multiparty = require('multiparty')

const formParser = async (request) => {
    return new Promise((resolve, reject) => {
        const form = new multiparty.Form();

        form.parse(request, (err, rawFields, files) => {
            if (err) return reject(err);
            const fields = Object.entries(rawFields)
                .map(([key, value]) => [key, value[0]])
                .reduce((old, [key, value]) => ({ ...old, [key]: value }), {});

            return resolve({ fields, files });
        });
    });
};

module.exports = formParser;