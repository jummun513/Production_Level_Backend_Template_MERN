import { USER_ROLES } from '../app/modules/users/user/user.constants';
import { User } from '../app/modules/users/user/user.models';

const superUser = {
  userName: 'jummun513',
  userId: '202501000001',
  name: {
    firstName: 'Md. Jummun',
    middleName: 'Islam',
    lastName: 'Jaber',
  },
  email: 'jummunislam513@gmail.com',
  phone: '+8801794094122',
  role: USER_ROLES.superAdmin,
  gender: 'Male',
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({ role: USER_ROLES.superAdmin });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
