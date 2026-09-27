import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Where contact messages are delivered.
const CONTACT_TO = "iamfaizankhanca@gmail.com";
// Resend's shared sender. It only delivers to the email address of the Resend
// account owner, which is what we want here. Replace it with an address on a
// verified domain if you later want a branded sender.
const CONTACT_FROM = "Portfolio Contact <onboarding@resend.dev>";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100, "Your name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(254, "Your email address is too long.")
    .email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(1, "Please enter a message.")
    .max(5000, "Your message is too long (5000 characters maximum)."),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactResult = { ok: true } | { ok: false; error: string };

const GENERIC_ERROR = "Your message couldn't be sent right now. Please try again in a moment.";

// Collapse line breaks so visitor-supplied text can never inject extra headers.
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator((data: ContactInput) => data)
  .handler(async ({ data }): Promise<ContactResult> => {
    // Never throw for problems a visitor can cause: return a result instead.
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check your details." };
    }
    const { name, email, message } = parsed.data;

    // Server-only secret. Read at request time; never exposed to the browser.
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[contact] RESEND_API_KEY is not configured.");
      return { ok: false, error: GENERIC_ERROR };
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: CONTACT_FROM,
          to: [CONTACT_TO],
          reply_to: email,
          subject: `New portfolio message from ${oneLine(name)}`,
          text: `Name: ${oneLine(name)}\nEmail: ${email}\n\nMessage:\n${message}`,
        }),
        signal: AbortSignal.timeout(10_000),
      });

      if (!response.ok) {
        // Log details server-side only; visitors get a generic message.
        console.error(
          "[contact] Resend rejected the request:",
          response.status,
          await response.text(),
        );
        return { ok: false, error: GENERIC_ERROR };
      }
      return { ok: true };
    } catch (error) {
      console.error("[contact] Failed to reach Resend:", error);
      return { ok: false, error: GENERIC_ERROR };
    }
  });
