import type { User } from "@prisma/client";
import { UserCard } from "./";

export function UserCardSection( { usersProp } : { usersProp : User[]}){
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {usersProp.map( ( user ) => (
                <UserCard
                key={user.id}
                id={String(user.id)}
                name={user.name ?? "Пользователь"}
                email={user.email} />
            ))}

        </section>
    )
}
