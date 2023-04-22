import { v4 as uuidv4 } from 'uuid';

export default (User) => {
  
  let date1 = new Date('November 09, 1999')
  date1 = date1.toISOString().slice(0, 10);
  let date2 = new Date('January 25, 1981')
  date2 = date2.toISOString().slice(0, 10);
  let date3 = new Date('February 14, 1998')
  date3 = date3.toISOString().slice(0, 10);
  const users = [
    new User('cef5ee37-15de-4039-8d03-8ecc23d98ecc', 'Grollier', 'Theo', date1, '15 rue de la Grande Motte', '0981234321','test@mail.com'),
    new User('a70f0f97-8ec0-4d66-8bfc-975357f37a1e', 'Dujardin', 'Jean', date2, '15 rue de la Petite Motte', '0921234321','testj@mail.com'),
    new User('a2e84855-be23-42fc-81ed-83e807198c9c', 'Henry', 'Thierry', date3, '19 boulevard des Anciens', '0712382910', 'lemail@mail.com')
  ]

  const listUsers = () => {
    return users;
  }

  const createUser = (user) => {
    users.push(new User(
      uuidv4(),
      user.lastName,
      user.firstName,
      user.birthDate,
      user.address,
      user.phone,
      user.email
    ));

    const userWithoutUUID = {
      lastName: user.lastName,
      firstName: user.firstName,
      birthDate: user.birthDate,
      address: user.address,
      phone: user.phone,
      email: user.email
    }
    return userWithoutUUID;
  }

  const updateUser = (id, user) => {
    let foundUserIdx = 0;
    users.forEach((user, idx) => {
      if (user.id === id) {
        foundUserIdx = idx;
      }
    });
    
    if (foundUserIdx > 0) {
      users[foundUserIdx] = new User(
        user.id,
        user.lastName,
        user.firstName,
        user.birthDate,
        user.address,
        user.phone,
        user.email
      );
      return user;
    }
    return null;
  }

  const getUser = (id) => {
    return users.find(user => user.id === id);
  }

  const deleteUser = (id) => {
    const userIdx = users.findIndex(user => user.id === id);
    if(userIdx >= 0) {
      const deletedUser = users.splice(userIdx, 1)[0];

      return deletedUser;
    }

    return null;
  }

  return {
    listUsers,
    createUser,
    updateUser,
    getUser,
    deleteUser
  }
}
