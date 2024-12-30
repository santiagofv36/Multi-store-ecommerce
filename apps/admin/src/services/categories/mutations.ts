import { api } from '@admin/lib/api';
import {
  ICategory,
  TCreateCategoryInput,
  TFilterCategoryInput,
  TFindOneCategoryInput,
} from '@packages/models';

export async function createCategory(input: TCreateCategoryInput) {
  const { data } = await api.post<ICategory>({
    url: '/category',
    options: { body: JSON.stringify({ ...input, active: true }) },
  });

  return data;
}
export async function updateCategory(input: TFilterCategoryInput) {
  const { data } = await api.patch<ICategory | { statusCode: string }>({
    url: '/category',
    options: { body: JSON.stringify(input) },
  });

  if ('statusCode' in data) {
    throw new Error(data.statusCode);
  }

  return data;
}
export async function deleteCategory(input: TFindOneCategoryInput) {
  const { data } = await api.delete<ICategory>({
    url: `/category/${input._id}`,
  });

  return data;
}
