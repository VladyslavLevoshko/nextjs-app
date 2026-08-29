import prisma from "@/lib/prisma";
import { HeroLayout, Container } from "../SharedComponents";
import { UserPageTitle, UserCardSection, UserNavigation } from "./UsersComponents";

export const revalidate = 0;

export default async function PostsPage() {
  const perPage = 6;

  const users = await prisma.user.findMany({
    take: perPage,
  });

const total = await prisma.user.count();
const totalPages = Math.ceil(total / perPage);
  return (
    <HeroLayout color = "gray">
      <Container>

        <UserPageTitle/>
        <UserCardSection usersProp = {users}/>
        <UserNavigation totalPages={totalPages}/>
        
      </Container>
    </HeroLayout>
  );
}
