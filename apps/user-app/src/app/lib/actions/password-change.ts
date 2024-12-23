"use server"
import bcrypt from "bcrypt";
import prisma from "@repo/db/client";

export const passwordChange = async ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }): Promise<{message : string}> => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: 1
            }
        });

        if (!user) {
            throw new Error("User not found");
        }

        const result = await bcrypt.compare(oldPassword, user.password);
        if (!result) {
            throw new Error("Old Password is Incorrect");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: {
                id: 1
            },
            data: {
                password: hashedPassword
            }
        });

    } catch (error) {
        // Optionally handle specific errors here (e.g., log them)
        throw new Error(error instanceof Error ? error.message : "An error occurred during password change");
    }

    return {
        "message": "Password changed successfully"
    };
}
