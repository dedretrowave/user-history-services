import db from '../config/database.cjs';
import { SQLBuilder } from "../helpers/SQLBuilder.js";
import autoBind from "auto-bind";

export class UserModel {
  constructor() {
    this.sqlBuilder = new SQLBuilder();
    autoBind(this);
  }

  async create({name, email, password}) {
    return await db.oneOrNone(
      this.sqlBuilder
        .insert('users', {name, email, password})
        .returningAll()
        .build()
    );
  }

  async getAll() {
    return await db.manyOrNone(
      this.sqlBuilder
        .select('*')
        .from('users')
        .build()
    );
  }

  async getByEmail(email) {
    return await db.oneOrNone(
      this.sqlBuilder
        .selectAll()
        .from('users')
        .where(`email='${email}'`)
        .build()
    );
  }

  async getById(id) {
    return await db.oneOrNone(
      this.sqlBuilder
        .selectAll()
        .from('users')
        .where(`id=${id}`)
        .build()
    );
  }

  async update(id, data) {
    return await db.oneOrNone(
      this.sqlBuilder
        .update('users', data)
        .where(`id=${id}`)
        .returningAll()
        .build()
    );
  }
}