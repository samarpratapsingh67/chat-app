import { StreamChat } from "stream-chat";
const api_key = "s5hmee6x8y6c";
const api_secret = "bvrc5v6775fa4ww23rygta8amu4e38t2wt2bmvhjjbwx95gqz9xgyuraf5vtnbvw";
import { clerkClient } from '@clerk/express'
// const user_id = "user_2xZzF3GQKALwFTqnAZ7ilEgK6xc";
export async function POST(request) {
      function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
    } 
    const serverClient = StreamChat.getInstance(api_key, api_secret);
    const user =await request.json()  

    // console.log(user)
    const token = serverClient.createToken(user.data.id);
    console.log("a new user has been created",token)
  
    await serverClient.upsertUser({id:user.data.id})
    await clerkClient.users.updateUserMetadata(user.data.id, {
    publicMetadata: {
      token:token,
    },
  })
    const slugs=[
  "Python",
  "JavaScript",
  "Java",
  "Data-Science",
  "Cloud-Computing",
  "Cybersecurity"
]
slugs.forEach(async (item)=>{
    const channel = serverClient.channel('messaging', item , {
      image: 'https://getstream.io/random_png/?name=react',
      name: capitalize(item),
      created_by:{ id:user.data.id}
    //   members: [user.data.id]
    });
    await channel.create();
    channel.addMembers([user.data.id])
})
    return Response.json({ message: 'Hello World' })
}