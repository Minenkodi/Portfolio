export type Category = {
  id: string;
  name: string;
  categoryTypeId: CategoryType;
};

export type CategoryTypes = {
  id: string;
  kind: string;
  caption: string;
}

export type CategoryState = {
  types: CategoryTypes[],
  categories: ResponseDate[],
  currentType: CategoryType,
  currentCategory: Category | null,
  error?: string;
};
export type RequestDate = {
  name: string;
  categoryTypeId: CategoryType;
}

export type RequestUpdate = RequestDate & { id: string };
// export type ResponseUpdate = Omit<ResponseDate, 'categoryTypeId'>;

export type ResponseDate = {
  id: string;
  name: string;
  // categoryTypeId: CategoryType;
  amount: string;
}

export type CategoryType = string;