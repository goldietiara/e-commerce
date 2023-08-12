"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const productInCart = await cart.items.find(
    (cart) => cart.productId === productId,
  );

  if (quantity === 0) {
    if (productInCart) {
      await prisma.cartItem.delete({
        where: { id: productInCart.id },
      });
    }
  } else if (productInCart) {
    await prisma.cartItem.update({
      where: { id: productInCart.id },
      data: { quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cardId: cart.id,
        productId,
        quantity,
      },
    });
  }
  revalidatePath("/cart");
}
