export const responseHandlers = (req, res, next) => {
    try {
        res.status(req.status || 200).json({
            status: req.status  || 200,
            succes:true,
            data:req.user
        });
    } catch (error) {
        next(error)
    }
}