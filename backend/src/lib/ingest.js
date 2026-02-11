import { Inngest } from "inngest";
import User from "../../models/User.js";
import { connDB } from "./db.js";
import { sendWelcomeEmail, sendDeleteEmail } from "./email.js";
import { upsertStramUser, deleteStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "my-app" });

const createUser = inngest.createFunction(
  { id: "create-user" },
  { event: "clerk/user.created"},
  async ({ event }) => {
    await connDB();
    console.log("User event data:", event.data);

    const { id, email_addresses, first_name, last_name, image_url} = event.data;
    const newUser={
        clerkID: id,
        name: `${first_name} ${last_name}`,
        email: email_addresses[0]?.email_address,
        image: image_url
    }
    const user = new User(newUser);
    await user.save();
    await sendWelcomeEmail(user.email, user.name);
    // adding in stram
    await upsertStramUser({
      id: newUser.clerkID.toString(),
      name: newUser.name,
      image: newUser.image
    })
  },
);

const deleteUser = inngest.createFunction(
  { id: "delete-user" },
  { event: "clerk/user.deleted"},
  async ({ event }) => {
    await connDB();
    const { id } = event.data;
    const newUser={
      clerkID: id
    }
    const user = await User.findOne(newUser); 
    if(user){
      await sendDeleteEmail(user.email, user.name);
      await User.findOneAndDelete({ clerkID: id });
    }

    // deleting user  in stream as well
    await deleteStreamUser(id.toString())
  },
);

export const functions = [createUser, deleteUser];