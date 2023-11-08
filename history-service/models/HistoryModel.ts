import db from '../config/database';
import { SQLBuilder } from "../helpers/SQLBuilder";
import {Events} from "./Events";
import autoBind from "auto-bind";

export class HistoryData {
  private readonly userId: number;
  private readonly event: Events;

  public constructor(userId: number, event: Events) {
    this.userId = userId;
    this.event = event;
    autoBind(this);
  }

  public getUserId(): number {
    return this.userId;
  }

  public getEvent(): Events {
    return this.event;
  }

  public getProps(): Record<string, string> {
    return {
      'userId': this.userId.toString(),
      'event': this.event.toString(),
    }
  }
}

export class HistoryModel {
  private sqlBuilder: SQLBuilder;

  public constructor() {
    this.sqlBuilder = new SQLBuilder();
    autoBind(this);
  }

  public async create(data: HistoryData) {
    return await db.oneOrNone<HistoryData>(
      this.sqlBuilder
        .insert('history', data)
        .build()
    );
  }

  public async getByUserId(id: number) {
    return await db.manyOrNone(
      this.sqlBuilder
        .selectAll()
        .from('history')
        .where(`userid=${id}`)
        .build()
    );
  }
}