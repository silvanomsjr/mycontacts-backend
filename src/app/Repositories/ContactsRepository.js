const { v4: uuid } = require('uuid');

const db = require('../../database');

class ContacsRepository {

  async findAll(orderBy = 'ASC'){
    const direction = orderBy.toUpperCase() == 'DESC' ? 'DESC' : 'ASC';
    const allRows = await db.query(`SELECT * FROM contacts ORDER BY name ${direction}`);
    return allRows;
  }

  async findById(id){
    const [user] = await db.query('SELECT * FROM contacts WHERE id=$1;', [id]);
    return user;
  }

  async findByEmail(email){
    const [user] = await db.query('SELECT * FROM contacts WHERE email=$1', [email]);
    return user;
  }

  async delete(id){
    await db.query('DELETE FROM contacts WHERE id=$1', [id]);
  }

  async update(id, { name, email, phone, category_id }){
    const [user] = await db.query(`
      UPDATE contacts
      SET name=$1, email=$2, phone=$3, category_id=$4
      WHERE id=$5
      RETURNING *`, [name, email, phone, category_id, id]);
    return user;
  }


  async create(name, email, phone, category_id){
    const [row] = await db.query('INSERT INTO contacts(name, email, phone, category_id) VALUES($1,$2,$3,$4) RETURNING *;', [name, email, phone, category_id]);
    return row;
  }
}


module.exports = new ContacsRepository();
