import { validate as uuidValidate} from 'uuid';

export default (userRepo) => {
  const listUsers = (_, res) => {
    res.send({
      data: userRepo.listUsers()
    })
  }

  const createUser = (req, res) => {
    const data = req.body;
    if (!uuidValidate(data.id)) {
      return res.status(400).send({
        error : {
          message: `L'ID renseigné n'est pas de type UUID`
        }
      })      
    }
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
        error : {
          message: `L'ID renseigné n'est pas de type UUID`
        }
      })      
    }

    const user = userRepo.updateUser(id, data);
    if (user) {
      return res.send({
        data: user
      })
    }

    res.status(404).send({
      error: `User ${id} not found`
    });
  }

  return {
    listUsers,
    createUser,
    updateUser
  }
}