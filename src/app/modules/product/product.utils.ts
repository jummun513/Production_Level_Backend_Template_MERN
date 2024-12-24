import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const findLastCreateProductId = async () => {
  const lastCreateProduct = await ProductModel.findOne(
    {},
    { serialNo: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastCreateProduct?.serialNo ? lastCreateProduct.serialNo : undefined;
};

export const generateProductId = async (payload: TProduct) => {
  let currentId = (0).toString();
  const lastProductId = await findLastCreateProductId();
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1);

  const lastProductYear = lastProductId?.substring(0, 4);
  const lastProductMonth = lastProductId?.substring(4, 6);

  const currentProductCode = payload.productCode;

  if (lastProductId && lastProductYear === year && lastProductMonth === month) {
    currentId = lastProductId.substring(6, 12);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(6, '0');

  incrementId = `${year}${month}${incrementId}${currentProductCode}`;

  return incrementId;
};
