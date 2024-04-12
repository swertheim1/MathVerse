// Middleware to verify authorization token
const verifyToken = (req, res, next) => {
    // Get the authorization header
    const authHeader = req.headers['authorization'];
    // Check if the authorization header exists
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is missing' });
    }
    // Check if the authorization header starts with 'Bearer'
    if (!authHeader.startsWith('Bearer')) {
      return res.status(401).json({ message: 'Invalid authorization header format' });
    }
    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];
    // Verify the token (you may use JWT library for this)
    // For example:
    // if (token is valid) {
    //   next(); // Token is valid, proceed to the next middleware or handler
    // } else {
    //   return res.status(401).json({ message: 'Invalid token' });
    // }

    next();
  };
  
module.exports = verifyToken; 