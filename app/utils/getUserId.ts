import getToken from "@/app/utils/getToken";
import prisma from "@/app/utils/db";

export default async function getUserId() {
  const token = getToken();
  if (!token) {
    return "";
  }

  const session = await prisma.session.findFirst({
    where: {
      sessionToken: token,
    },
  });

  if (!session) {
    return "";
  }

  return session.userId;
}
