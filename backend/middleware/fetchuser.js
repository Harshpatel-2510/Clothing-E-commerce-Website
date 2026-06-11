const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
    // 1. Request ke header se token nikalna
    const token = req.header('auth-token');
    
    // 2. Agar token nahi hai, toh andar aane se rok do
    if (!token) {
        return res.status(401).json({ message: "Bina login kiye aap ye nahi kar sakte! 🛑" });
    }

    try {
        // 3. Token ko check (verify) karna ki yeh asli hai ya nakli
        const data = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. Agar asli hai, toh user ka data request me daal do aur aage badhne do (next)
        req.user = data; 
        next(); 
    } catch (error) {
        res.status(401).json({ message: "Aapka token galat (invalid) hai! 🛑" });
    }
}

module.exports = fetchuser;