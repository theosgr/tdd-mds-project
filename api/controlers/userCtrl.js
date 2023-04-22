import { validate as uuidValidate} from 'uuid';

export default (userRepo) => {
  const listUsers = (_, res) => {
    res.send({
      data: userRepo.listUsers()
    })
  }

  const createUser = (req, res) => {
    const data = req.body;

    const user = userRepo.createUser(data)
    res.status(201).send({
      data: user
    })
  }

  const updateUser = (req, res) => {
    const data = req.body;
    const id = req.params.id;
  
    if (!uuidValidate(id)) {
      return res.status(400).send({
        error : `L'ID renseigné n'est pas de type UUID`
      })      
    }

    const user = userRepo.updateUser(id, data);
    if (user) {
      return res.send({
        data: user
      })
    }

    res.status(404).send({
      error: `User with id ${id} not found`
    });
  }

  const getUser = (req, res) => {
    const id = req.params.id;
    const user = userRepo.getUser(id);

    if (!uuidValidate(id)) {
      return res.status(400).send({
        error :  `L'ID renseigné n'est pas de type UUID`
      })      
    }

    if (user) {
      return res.send({
        data: user
      })
    }

    res.status(404).send({
      error: `User with id ${id} not found`
    })
  }

  const deleteUser = (req, res) => {
    const id = req.params.id;
    const user = userRepo.deleteUser(id);

    if (!uuidValidate(id)) {
      return res.status(400).send({
        error :  `L'ID renseigné n'est pas de type UUID`
      })      
    }

    if (user) {
      return res.send({
        meta: {
          _deleted: user
        }
      })
    }

    res.status(404).send({
      error: `User with id ${id} not found`
    })


  }

  return {
    listUsers,
    createUser,
    updateUser,
    getUser,
    deleteUser
  }
}