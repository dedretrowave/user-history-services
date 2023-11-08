export const responses = {
  success: (res, data) => {
    return res
      .status(200)
      .json({
        success: true,
        data,
      })
  },
  badRequest: (res, data) => {
    return res
      .status(400)
      .json({
        success: false,
        data
      })
  },
  notFound: (res, data) => {
    return res
      .status(404)
      .json({
        success: false,
        data
      });
  },
  forbidden: (res, data) => {
    return res
      .status(403)
      .json({
        success: false,
        data
      })
  },
  serverError: (res, data) => {
    return res
      .status(500)
      .json({
        success: false,
        data
      })
  },
}