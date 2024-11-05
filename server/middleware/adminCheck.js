const admin = require('firebase-admin');

const adminCheck = async (req, res, next) => {
    try {
        const user = req.user;
        
        // Check if user has admin custom claim
        const { admin: isAdmin } = await admin.auth().getUser(user.uid);
        
        if (!isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Access denied: Admin privileges required'
            });
        }

        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Failed to verify admin status'
        });
    }
};

module.exports = adminCheck;
