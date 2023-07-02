const errorMiddleware = (handler) => async (req, res) => {
    console.log("executing error middleware")
    try {
      await handler(req, res);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal Server Error';
      res.status(statusCode).json({ message: message });
    }
  };
  
  export default errorMiddleware;
    