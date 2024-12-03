const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    const filePath = path.resolve(__dirname, '../../comments.json');
    const newComment = JSON.parse(event.body).comment;

    if (!newComment) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Comment is required' }),
        };
    }

    try {
        const data = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '[]';
        const comments = JSON.parse(data);
        comments.push(newComment);

        fs.writeFileSync(filePath, JSON.stringify(comments));

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to save comment' }),
        };
    }
};