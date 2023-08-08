import { Prisma } from "@prisma/client";
import { cookies } from "next/dist/client/components/headers";
import { prisma } from "./prisma";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  const localCartId = cookies().get("localCartId")?.value;
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: { include: { product: true } } },
      })
    : null;

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    // arr.reduce(callback(accumulator, currentValue), initialValue)
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  const newCart = await prisma.cart.create({
    data: {},
  });

  // Note: Needs encryption + secure settings in real production app
  cookies().set("localCartId", newCart.id);

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}

// import { prisma } from "./prisma";
// import { cookies } from "next/dist/client/components/headers";
// import { Prisma } from "@prisma/client";

// export type cartWithProducts = Prisma.CartGetPayload<{
//   include: { items: { include: { product: true } } };
// }>;

// export type shoppingCart = cartWithProducts & {
//   size: number;
//   subtotal: number;
// };

// // state management
// //get cart form db
// export const getCart = async (): Promise<shoppingCart | null> => {
//   const localCartId = cookies().get("localCardId")?.value;
//   const cart = localCartId
//     ? await prisma.cart.findUnique({
//         where: { id: localCartId },
//         include: { items: { include: { product: true } } },
//       })
//     : null;
//   if (!cart) {
//     return null;
//   }
//   return {
//     ...cart,
//     // arr.reduce(callback(accumulator, currentValue), initialValue)
//     size: cart.items.reduce((accu, item) => accu + item.quantity, 0),
//     subtotal: cart.items.reduce(
//       (accu, item) => accu + item.quantity * item.product.price,
//       0,
//     ),
//   };
// };

// // 2.30
// export const createCart = async (): Promise<shoppingCart> => {
//   const newCart = await prisma.cart.create({
//     data: {},
//   });

//   // Note: Needs encryption + secure settings in real production app
//   cookies().set("localCartId", newCart.id);

//   return {
//     ...newCart,
//     items: [],
//     size: 0,
//     subtotal: 0,
//   };
// };
