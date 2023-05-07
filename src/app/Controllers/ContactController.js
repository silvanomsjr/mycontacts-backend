const ContactsRepository = require('../Repositories/ContactsRepository');

class ContactController {
  async index(req,res){
    //Listar todos os registros
    const { orderBy } = req.query;
    const allUsers = await ContactsRepository.findAll(orderBy);
    res.json(allUsers);
  }

  async show(req,res){
    //Obter um registro
    const id = req.params.id;

    const user = await ContactsRepository.findById(id);

    if(!user){
      return res.status(404).json({ error: 'User not found'});
    }

    res.json(user);
  }

  async store(req, res){
    //Criar novo registro

    const { name, email, phone, category_id} = req.body

    if(!name){
      return res.status(400).json({ error: 'Name is required.'});
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if(contactExists){
      return res.status(400).json({ error: 'This e-mail is already in use.'});
    }

    const contact = await ContactsRepository.create(name, email, phone, category_id);
    console.log(contact);

    res.json(contact);

  }

  async update(req, res){
    //Atualizar registro
    const { id } = req.params
    const { name, email, phone, category_id } = req.body;

    const contactExists = await ContactsRepository.findById(id);

    if(!contactExists){
      return res.status(404).json({ error: 'User not found.' });
    }


    const contactByEmail = await ContactsRepository.findByEmail(email);

    if(contactByEmail && contactByEmail.id !== id){
      return res.status(400).json({ error: "This e-mail is already in use" });
    }

    const contact = await ContactsRepository.update(id, { name, email, category_id, phone })
    res.json(contact);
  }

  async delete(req, res){
    //Deletar registro
    const id = req.params.id;
    await ContactsRepository.delete(id);

    res.sendStatus(204);

  }
}

module.exports = new ContactController();
