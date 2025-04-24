export interface UserDTO {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const toUserDTO = (user: any): UserDTO => {
  return {
    id: user?.id,
    name: user.name,
    email: user.email,
    phone: user?.phone,
    createdAt: user?.createdAt,
    updatedAt: user?.updatedAt,
  };
};
