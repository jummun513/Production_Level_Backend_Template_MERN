import { User } from './user/user.models';

const getAllUsersFromDB = async () => {
  const dataQuery = User.find({}, { __v: 0 }).skip(0).limit(0).exec();
  // const dataQuery = User.find({}, { __v: 0, isDeleted: 0, password: 0 })
  //   .skip(0)
  //   .limit(0)
  //   .exec();
  const countQuery = User.countDocuments().exec();
  const [data, count] = await Promise.all([dataQuery, countQuery]);
  return { data: data, meta: { page: 1, limit: 0, total: count } };
};

export const usersServices = {
  getAllUsersFromDB,
};
