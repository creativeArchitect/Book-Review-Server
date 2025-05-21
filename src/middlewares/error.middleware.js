
const errorMiddleware = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;

    err.msg = err.msg || "Something went wrong";

    return res.status(err.status).json({
        success: false,
        message: err.msg,
        track: err.track,
    })
}

export default errorMiddleware;


















