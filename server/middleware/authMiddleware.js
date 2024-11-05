const admin = require('firebase-admin');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split('Bearer ')[1];
        if (!token) throw new Error('No token provided');
        
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        await auth(req, res, async () => {
            if (!req.user.admin) {
                return res.status(403).json({ message: 'Admin access required' });
            }
            next();
        });
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { auth, isAdmin };
