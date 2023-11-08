import autoBind from "auto-bind";

export class SQLBuilder {
  constructor() {
    this.query = '';
    autoBind(this);
  }

  select(fields) {
    this.query = `SELECT ${fields.join(', ')}`;
    return this;
  }

  selectAll() {
    this.query = 'SELECT *';
    return this;
  }

  insert(table, data) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    this.query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${values.map(value => `'${value}'`).join(', ')})`;
    return this;
  }

  update(table, data) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const clauses = columns.map((column, index) => `${column}='${values[index]}'`);
    this.query = `UPDATE ${table} SET ${clauses.join(', ')}`
    return this;
  }

  from(table) {
    this.query += ` FROM ${table}`;
    return this;
  }

  where(condition) {
    this.query += ` WHERE ${condition}`;
    return this;
  }

  returning(fields) {
    this.query += ` RETURNING ${fields.join(', ')}`;
    return this;
  }

  returningAll() {
    this.query += ` RETURNING *`;
    return this;
  }

  and(condition) {
    this.query += ` AND ${condition}`;
    return this;
  }

  or(condition) {
    this.query += ` OR ${condition}`;
    return this;
  }

  orderBy(field, direction) {
    this.query += ` ORDER BY ${field} ${direction}`;
    return this;
  }

  build() {
    return this.query;
  }
}