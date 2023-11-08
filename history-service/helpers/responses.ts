import { Response } from 'express';

export const responses = {
  success: (res: Response, data: Record<any, any>) => {
    return res
      .status(200)
      .json({
        success: true,
        data,
      })
  },
  badRequest: (res: Response, data: Record<any, any>) => {
    return res
      .status(400)
      .json({
        success: false,
        data
      })
  },
  notFound: (res: Response, data: Record<any, any>) => {
    return res
      .status(404)
      .json({
        success: false,
        data
      });
  },
  forbidden: (res: Response, data: Record<any, any>) => {
    return res
      .status(403)
      .json({
        success: false,
        data
      })
  },
  serverError: (res: Response, data: Record<any, any>) => {
    return res
      .status(500)
      .json({
        success: false,
        data
      })
  },
}