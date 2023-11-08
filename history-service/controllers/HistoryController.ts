import {HistoryData, HistoryModel} from "../models/HistoryModel";
import autoBind from 'auto-bind';
import {responses} from "../helpers/responses";
import { Request, Response } from "express";
import {Events} from "../models/Events.ts";

export class HistoryController {
  private model: HistoryModel;

  public constructor() {
    this.model = new HistoryModel();
    autoBind(this);
  }

  public async create(data: HistoryData) {
    try {
      const resolvedData: HistoryData = new HistoryData(
          data.getUserId(),
          data.getEvent()
      );

      await this.model.create(resolvedData);
    } catch (err) {
      console.log(err);
    }
  }

  public async getByUserId(req: Request, res: Response) {
    try {
      const userId: number = +req.params.id;

      const data: Array<{id: number, event: string, userid: string}>
          = await this.model.getByUserId(userId);

      if (!data) {
        responses
          .notFound(res, {
            message: 'No data',
          })
      } else {
        responses
          .success(res, {
            data: {
              userId: userId,
              data: data.map(item => Events[item.event])
            }
          })
      }
    } catch(err: any) {
      console.log(err);
      responses
        .serverError(res, {
          'error': err.message,
        })
    }
  }
}