import { USER_ROLES } from '../app/modules/users/user/user.constants';
import { User } from '../app/modules/users/user/user.models';
import config from '../config';

const date = new Date();
const year = String(date.getFullYear());
let month = String(date.getMonth() + 1);
if (Number(month) < 10) {
  month = month.toString().padStart(2, '0');
}

const superUser = {
  userName: 'jummun513',
  userId: `${year}${month}000001`,
  name: {
    firstName: 'Md. Jummun',
    middleName: 'Islam',
    lastName: 'Jaber',
  },
  password: config.super_admin_password as string,
  email: 'jummunislam513@gmail.com',
  phone: '+8801794094122',
  role: USER_ROLES.superAdmin,
  gender: 'Male',
  isEmailVerified: true,
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({ role: USER_ROLES.superAdmin });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
