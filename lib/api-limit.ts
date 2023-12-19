import { MAX_API_CALLS } from "@/constants";
import { getAuthSession } from "./auth"
import { prisma } from "./prisma";

export const increaseApiLimit = async () => {
    const session = await getAuthSession();

    if (!session?.user) {
        return;
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        }
    });

    if (!user) {
        return;
    }

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            apiCalls: user.apiCalls + 1
        }
    });
}

export const checkApiLimit = async () => {
    const session = await getAuthSession();

    if (!session?.user) {
        return false;
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        }
    });

    if (!user) {
        return;
    }

    if (!user.apiCalls || user.apiCalls < MAX_API_CALLS) {
        return true;
    } else {
        return false;
    }
}

export const getUserApiCount = async () => {
    const session = await getAuthSession();

    if (!session?.user) {
        return 0;
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        }
    });

    if (!user) {
        return 0;
    }

    return user.apiCalls;
}