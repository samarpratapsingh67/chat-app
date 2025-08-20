
import ChatForum from "../../../components/chatforum"
import {currentUser} from "@clerk/nextjs/server";
export default async function Page({ params }) {
    const slug = (await params).slug
     const user =await currentUser();
     console.log(user);
    return <ChatForum slug={slug} clerkUser={{id:user.id,name:user.firstName, token:user.publicMetadata.token}}/>
}
