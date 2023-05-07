const { v4: uuid } = require('uuid');

const db = require('../../database');

class CategoryRepository{

  async findAll(orderBy = 'ASC'){
    const direction = orderBy.toUpperCase() == 'DESC' ? 'DESC' : 'ASC';
    const allRows = await db.query(`SELECT * FROM categories ORDER BY name ${direction}`);
    return allRows;
  }

  async findById(id){
    const [user] = await db.query('SELECT * FROM categories WHERE id=$1;', [id]);
    return user;
  }

  async delete(id){
    await db.query('DELETE FROM categories WHERE id=$1', [id]);
  }

  async update(id, { name }){
    const [category] = await db.query(`
      UPDATE categories
      SET name=$1
      WHERE id=$2
      RETURNING *`, [name, id]);
    return category;
  }


  async create(name){
    const [row] = await db.query('INSERT INTO categories(name) VALUES($1) RETURNING *;', [name]);
    return row;
  }
}


module.exports = new CategoryRepository();
