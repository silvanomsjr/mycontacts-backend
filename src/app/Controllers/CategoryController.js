const CategoriesRepository = require('../Repositories/CategoriesRepository');

class ContactController {
  async index(req,res){
    //Listar todos os registros
    const { orderBy } = req.query;
    const allCategories = await CategoriesRepository.findAll(orderBy);
    res.json(allCategories);
  }

  async show(req,res){
    //Obter um registro
    const id = req.params.id;

    const category = await CategoriesRepository.findById(id);

    if(!category){
      return res.status(404).json({ error: 'Category not found'});
    }

    res.json(category);
  }

  async store(req, res){
    //Criar novo registro

    const { name } = req.body

    if(!name){
      return res.status(400).json({ error: 'Name is required.'});
    }

    const category = await CategoriesRepository.create(name);

    res.json(category);

  }

  async update(req, res){
    //Atualizar registro
    const { id } = req.params
    const { name } = req.body;

    const categoryExists = await CategoriesRepository.findById(id);

    if(!categoryExists){
      return res.status(404).json({ error: 'Category not found.' });
    }

    const category = await CategoriesRepository.update(id, { name })
    res.json(category);
  }

  async delete(req, res){
    //Deletar registro
    const id = req.params.id;
    await CategoriesRepository.delete(id);

    res.sendStatus(204);

  }
}

module.exports = new ContactController();
