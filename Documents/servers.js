require('dotenv').config();

module.exports = {
    servers: [
        {url: `http://localhost:${process.env.PORT}/`, description: 'development server'}
    ]
}