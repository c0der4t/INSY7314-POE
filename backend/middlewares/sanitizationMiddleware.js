const sanitizeInputs = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {

        req.body[key] = req.body[key].trim();

        req.body[key] = req.body[key]
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;')
          .replace(/\//g, '&#x2F;');

        req.body[key] = req.body[key].replace(/\$/g, '').replace(/\./g, '');
      }
    }
  }
  next();
};

module.exports = { sanitizeInputs };

//reference:
//SnykSec, 2025. Validating and Sanitizing Data in JavaScript. [video] Available at: https://www.youtube.com/shorts/La8_1AqVyUE [Accessed 10 October 2025].