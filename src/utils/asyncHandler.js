// Handling with promises

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    return Promise.resolve(requestHandler(req, res, next)).catch((err) =>
      next(err)
    );
  };
};

export { asyncHandler };
// Another method using try catch with async await syntax

// const asyncHandler = (fn) => {
//     return async (req, res, next) => {
//         try {
//             const result = await fn(req, res, next);
//             return result;
//         } catch (error) {
//             res.status(err.code || 500).json({
//                 success: false,
//                 message: err.message || "Internal Server Error",
//             })
//             next(error);
//         }
//     };
// }
