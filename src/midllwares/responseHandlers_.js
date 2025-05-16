export const responeHandlers = (req, res, next) => {
    try {
        res.status(req.status).json({
            status: req.status,
            succes:true,
            data:req.user
        });
    } catch (error) {
        next(error)
    }
}