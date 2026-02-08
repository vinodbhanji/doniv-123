import { Inngest } from "inngest";
import User from "../models/User.js";
import { connDB } from "../src/lib/db.js";

export const inngest = new Inngest({ id: "my-app" });

const createUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.created"},
  async ({ event }) => {
    await connDB();
    console.log("User event data:", event.data);

    const { id, email_addresses, first_name, last_name, image_url} = event.data;
    const nerUser={
        clerkID: id,
        name: `${first_name} ${last_name}`,
        email: email_addresses[0]?.email_address,
        image: image_url
    }
    const user = new User(nerUser);
    await user.save();
  },
);

const deleteUser = inngest.createFunction(
  { id: "delete-user" },
  { event: "user.deleted"},
  async ({ event }) => {
    await connDB();
    const { id } = event.data;
    const nerUser={
      clerkID: id
    }
    await User.findOneAndDelete(nerUser); 
  },
);

export const functions = [createUser, deleteUser];