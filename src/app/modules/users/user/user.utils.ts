import { User } from './user.models';

const findLastCreateUserId = async () => {
  const lastCreateUser = await User.findOne({}, { userId: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastCreateUser?.userId ? lastCreateUser.userId : undefined;
};

export const generateUserId = async () => {
  let currentId = (0).toString();
  const lastUserId = await findLastCreateUserId();
  const date = new Date();
  const year = String(date.getFullYear());
  let month = String(date.getMonth() + 1);
  if (Number(month) < 10) {
    month = month.toString().padStart(2, '0');
  }

  const lastUserYear = lastUserId?.substring(0, 4);
  const lastUserMonth = lastUserId?.substring(4, 6);

  if (lastUserId && lastUserYear === year && lastUserMonth === month) {
    currentId = lastUserId.substring(6, 12);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(6, '0');

  incrementId = `${year}${month}${incrementId}`;

  return incrementId;
};
