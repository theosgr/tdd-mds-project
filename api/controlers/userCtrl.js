
export default (userRepo) => {
  const listUsers = (_, res) => {
    res.send({
      data: userRepo.listUsers()
    })
  }

  const createUser = (req, res) => {
    const data = req.body;
    console.log(data)

    const user = userRepo.createUser(data)
    res.status(201).send({
      data: user
    })
  }

  return {
    listUsers,
    createUser
  }
}