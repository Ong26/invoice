type CreatePrismaDto<T> = (
  dto: T,
) => T extends Array<infer U>
  ? Array<CreatePrismaDto<U>>
  : T extends object
    ? { create: CreatePrismaDto<T> }
    : T;

export const createPrismaDto = <T>(dto: T): CreatePrismaDto<T> => {
  const keys = Object.keys(dto);
  const result: any = {};

  keys.forEach((key) => {
    const value = dto[key];
    if (!Array.isArray(value) && typeof value === 'object' && value !== null) {
      result[key] = { create: createPrismaDto(value) };
    } else {
      result[key] = value;
    }
  });

  return result;
};
