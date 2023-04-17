import { v4 as uuidv4 } from 'uuid';

export default (User) => {
  
  let date1 = new Date('November 09, 1999')
  date1 = date1.toISOString().slice(0, 10);
  let date2 = new Date('January 25, 1981')
  date2 = date2.toISOString().slice(0, 10);
  let date3 = new Date('February 14, 1998')
  date3 = date3.toISOString().slice(0, 10);
  const users = [
    new User(uuidv4(), 'Grollier', 'Theo', date1, '15 rue de la Grande Motte', '0981234321','test@mail.com'),
    new User(uuidv4(), 'Dujardin', 'Jean', date2, '15 rue de la Petite Motte', '0921234321','testj@mail.com'),
    new User('a2e84855-be23-42fc-81ed-83e807198c9c', 'Henry', 'Thierry', date3, '19 boulevard des Anciens', '0712382910', 'lemail@mail.com')
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

  return {
    listUsers,
    createUser,
    updateUser
  }
}
