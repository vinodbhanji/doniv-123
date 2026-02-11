import { Resend } from "resend";
import { ENV } from "./env.js";

const resend = new Resend(ENV.EMAIL);

// welcome email
export const sendWelcomeEmail = async (email, name) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Welcome to My App 🚀",
    html: `
      <h2>Welcome ${name}</h2>
      <p>Your account has been created successfully.</p>
    `,
  });
};

// delete account email
export const sendDeleteEmail = async (email, name) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Account Deleted",
    html: `
      <h2>Goodbye ${name}</h2>
      <p>Your account has been deleted successfully.</p>
    `,
  });
};
