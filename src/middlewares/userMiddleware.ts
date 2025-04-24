import { body, param } from "express-validator";
import { PrismaClient } from "../../generated/prisma/client";

const prisma = new PrismaClient();

export const validateUser = (method: "story" | "update" | "paramUserId") => {
  switch (method) {
    case "story":
      return [
        body("name", "O Nome é obrigatório").notEmpty(),
        body("email", "O E-mail é obrigatório").notEmpty(),
        body("email", "O E-mail deve ser um e-mail válido")
          .isEmail()
          .custom((value) => {
            return prisma.user
              .findUnique({
                where: {
                  email: value,
                },
              })
              .then((user) => {
                if (user) {
                  return Promise.reject("Esse Email já está em uso");
                }
              });
          }),
        body("phone", "O Telefone deve ser um Telefone válido")
          .optional()
          .isMobilePhone("pt-BR")
          .custom((value) => {
            return prisma.user
              .findUnique({
                where: {
                  phone: value,
                },
              })
              .then((user) => {
                if (user) {
                  return Promise.reject("Esse telefone já está em uso");
                }
              });
          }),
      ];
    case "paramUserId":
      return [
        param("id", "O ID é obrigatório").notEmpty(),
        param("id", "O ID deve ser um UUID válido").isUUID(),
        param("id").custom((value) => {
          return prisma.user
            .findUnique({
              where: {
                id: value,
              },
            })
            .then((user) => {
              if (!user) {
                return Promise.reject("Esse usuário não existe");
              }
            });
        }),
      ];
    case "update":
      return [
        param("id", "O ID é obrigatório").notEmpty(),
        param("id", "O ID deve ser um UUID válido").isUUID(),
        param("id").custom((value) => {
          return prisma.user
            .findUnique({
              where: {
                id: value,
              },
            })
            .then((user) => {
              if (!user) {
                return Promise.reject("Esse usuário não existe");
              }
            });
        }),
        body("name", "O Nome é obrigatório").notEmpty(),
        body("email", "O E-mail é obrigatório").notEmpty(),
        body("email", "O E-mail deve ser um e-mail válido")
          .isEmail()
          .custom((value, { req }) => {
            return prisma.user
              .findUnique({
                where: {
                  email: value,
                  AND: {
                    id: {
                      not: req?.params?.id,
                    },
                  },
                },
              })
              .then((user) => {
                if (user) {
                  return Promise.reject("Esse Email já está em uso");
                }
              });
          }),
        body("phone", "O Telefone deve ser um Telefone válido")
          .optional()
          .isMobilePhone("pt-BR")
          .custom((value, { req }) => {
            return prisma.user
              .findUnique({
                where: {
                  phone: value,
                  AND: {
                    id: {
                      not: req?.params?.id,
                    },
                  },
                },
              })
              .then((user) => {
                if (user) {
                  return Promise.reject("Esse telefone já está em uso");
                }
              });
          }),
      ];
  }
};

export default validateUser;
