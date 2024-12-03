const fs = require('fs');
const path = require('path');

exports.handler = async () => {
    const filePath = path.resolve(__dirname, '../../comments.json');

    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const comments = JSON.parse(data);
        return {
            statusCode: 200,
            body: JSON.stringify(comments),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to read comments' }),
        };
    }
};