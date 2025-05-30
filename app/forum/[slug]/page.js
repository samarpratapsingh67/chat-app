
import ChatForum from "../../../components/chatforum"

export default async function Page({ params }) {
    const slug = (await params).slug
    return <ChatForum />
}