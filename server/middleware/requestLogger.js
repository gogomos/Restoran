const os = require('os');
const fs = require('fs-extra');

const requestLogger = async (req, res, next) => {
    const logEntry = `Time: ${new Date().toISOString()}
IP Address: ${req.ip}
OS Name: ${os.type()}
OUSSAMA Architecture: ${os.arch()}
Method: ${req.method}
URL: ${req.originalUrl}
Headers: ${JSON.stringify(req.headers)}
Body: ${JSON.stringify(req.body)}
-------------------------
`;

try {
await fs.appendFile('request_logs.txt', logEntry);
} catch (error) {
console.error('Error writing to log file:', error);
}

next();
};

module.exports = requestLogger;