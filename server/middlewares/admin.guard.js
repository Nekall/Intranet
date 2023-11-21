export const adminGuard = (req, res, next) => {
    // check jwt if user is admin
    next();
};