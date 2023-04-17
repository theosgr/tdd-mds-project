export default (User) => {
  let date1 = new Date('November 09, 1999')
  let date2 = new Date('January 25, 1981')
  const users = [
    new User('user1', 'Grollier', 'Theo', date1, '15 rue de la Grande Motte', '0981234321','test@mail.com'),
    new User('user2', 'Dujardin', 'Jean', date2, '15 rue de la Petite Motte', '0921234321','testj@mail.com')
  ]

  const listUsers = () => {
    return users;
  }

  const createUser = (user) => {
    users.push(new User(
      user.id,
      user.lastName,
      user.firstName,
      user.birthDate,
      user.address,
      user.phone,
      user.email
    ));
    return user;
  }

  return {
    listUsers,
    createUser
  }
}
