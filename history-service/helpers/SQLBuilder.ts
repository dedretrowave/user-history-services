import {HistoryData} from "../models/HistoryModel";
import autoBind from "auto-bind";

export class SQLBuilder {
  private query: string;

  public constructor() {
    this.query = '';
    autoBind(this);
  }

  public select(data: HistoryData): SQLBuilder {
    const columns: Array<string> = Object.keys(data.getProps());
    this.query = `SELECT ${columns.join(', ')}`;
    return this;
  }

  public selectAll(): SQLBuilder {
    this.query = 'SELECT *';
    return this;
  }

  public insert(
      table: string,
      data: HistoryData): SQLBuilder {
    const columns = Object.keys(data.getProps()).join(', ');
    const values = Object.values(data.getProps());

    this.query =
        `INSERT INTO ${table} (${columns}) 
           VALUES (${values})`;
    return this;
  }

  public update(
      table: string,
      data: HistoryData): SQLBuilder {
    const columns: Array<string> = Object.keys(data.getProps());
    const values: Array<string> = Object.values(data.getProps());
    const clauses: Array<string> = columns
        .map((column: string, index: number): string => {
          return `${column}='${values[index]}'`
        });

    this.query =
        `UPDATE ${table} 
            SET ${clauses.join(', ')}`
    return this;
  }

  public from(table: string): SQLBuilder {
    this.query += ` FROM ${table}`;
    return this;
  }

  public where(condition: string): SQLBuilder {
    this.query += ` WHERE ${condition}`;
    return this;
  }

  public returningAll(): SQLBuilder {
    this.query += ` RETURNING *`;
    return this;
  }

  public and(condition: string): SQLBuilder {
    this.query += ` AND ${condition}`;
    return this;
  }

  public or(condition: string): SQLBuilder {
    this.query += ` OR ${condition}`;
    return this;
  }

  public orderBy(
      field: string,
      direction: string): SQLBuilder {
    this.query += ` ORDER BY ${field} ${direction}`;
    return this;
  }

  public build(): string {
    return this.query;
  }
}