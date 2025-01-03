"use server"

import prisma from "@repo/db/client";

export const userUpdate = async (updatedUser: { id: number; name: string | null; email: string | null; number: string }): Promise<any> => {
    const user = await prisma.user.update({
        where: {
            id: updatedUser.id,
        },
        data: {
            name: updatedUser.name,
            email: updatedUser.email,
            number: updatedUser.number,
        },
    });
    return user;
}
