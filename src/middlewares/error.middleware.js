const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.msg = err.msg || "Something went wrong";
  
    return res.status(err.statusCode).json({
      success: false,
      message: err.msg,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  };
  
  export default errorMiddleware;
  