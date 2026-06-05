import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const PHYSICAL_PRODUCTS = new Set(["prod_UeIf1rsHDwduyp"]);

const PRODUCT_LINKS = {
  // ─── NOSTRAND ───────────────────────────────────────────────────────────────
  prod_UYzn62qq9GLPuZ: {
    name: "Nostrand · Full Family",
    url: "https://www.dropbox.com/scl/fi/x2489fganghm74qhp2tou/Nostrand-FullFamily.zip?rlkey=fr4x2zobboon15frocyxujtf4&st=ob5hqajx&dl=1",
  },
  prod_UeIiD1qG6SLHtE: {
    name: "Nostrand · Normal (9 styles)",
    url: "https://www.dropbox.com/scl/fi/8bn97niwg8yaum7troeyo/Nostrand-Normal.zip?rlkey=qr1rnfpp708b251jmtotr03jz&st=7xjtsrft&dl=1",
  },
  prod_UeIfMVeE52mE4s: {
    name: "Nostrand · Thin",
    url: "https://www.dropbox.com/scl/fi/pnyhivflk77c8xa7ljzwh/Nostrand-Thin.zip?rlkey=srlvtu1ievu0fa4sawsmbmeya&st=kpeymhq9&dl=1",
  },
  // ─── MILKY BAR ───────────────────────────────────────────────────────────────
  prod_UYzn6zxrcV9Lq3: {
    name: "Milky Bar · Full Family",
    url: "https://www.dropbox.com/scl/fi/kwjejkj8eh3atkt2aq7hg/MilkyBar-FullFamily.zip?rlkey=9glhenavq18p5nxmxsqetirqb&st=jwvy3lsj&dl=1",
  },
  // ─── KIDCUT ──────────────────────────────────────────────────────────────────
  prod_UYzn6HnI7ezIOb: {
    name: "Kidcut",
    url: "https://www.dropbox.com/scl/fi/jek16j9e4ejl6lo54coel/Kidcut.zip?rlkey=tdzbsw00na9wdsd2p2plb8gdz&st=30qdwuen&dl=1",
  },
};

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sig = req.headers["stripe-signature"];
  const rawBody = await getRawBody(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email;

    if (!customerEmail) {
      return res.status(400).json({ error: "No customer email" });
    }

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price.product"],
    });

    const digitalItems = [];
    const physicalItems = [];

    lineItems.data.forEach((item) => {
      const productId = item.price?.product?.id;
      if (PHYSICAL_PRODUCTS.has(productId)) {
        physicalItems.push(item.price?.product?.name || "Physical product");
      } else if (PRODUCT_LINKS[productId]) {
        digitalItems.push(PRODUCT_LINKS[productId]);
      }
    });

    if (digitalItems.length === 0 && physicalItems.length === 0) {
      console.log("No matching products for:", session.id);
      return res.status(200).json({ message: "No matching products" });
    }

    const downloadSection = digitalItems.length > 0 ? `
      <p style="font-size: 16px; color: #555555; margin: 0 0 16px; line-height: 1.5;">Your fonts are ready to download:</p>
      <ul style="list-style: none; padding: 0; margin: 0 0 40px;">
        ${digitalItems.map((item) => `
          <li style="margin-bottom: 20px;">
            <p style="font-size: 16px; font-weight: 600; margin: 0 0 4px; color: #111110;">${item.name}</p>
            <a href="${item.url}" style="font-size: 16px; color: #555555; text-decoration: underline;">Download ${item.name}</a>
          </li>`).join("")}
      </ul>` : "";

    const physicalSection = physicalItems.length > 0 ? `
      <p style="font-size: 16px; color: #555555; margin: 0 0 16px; line-height: 1.5;">Your physical order:</p>
      <ul style="list-style: none; padding: 0; margin: 0 0 24px;">
        ${physicalItems.map((name) => `
          <li style="margin-bottom: 12px;">
            <p style="font-size: 16px; font-weight: 600; margin: 0 0 4px; color: #111110;">${name}</p>
            <p style="font-size: 16px; color: #555555; margin: 0;">Will be shipped within 3 business days. We'll reach out to confirm your shipping address.</p>
          </li>`).join("")}
      </ul>` : "";

    await resend.emails.send({
      from: "Mbar Type <info@mbartype.com>",
      to: customerEmail,
      subject: "Your order confirmation — Mbar Type",
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 48px 32px; color: #111110;">
          <h1 style="font-size: 28px; font-weight: 600; margin: 0 0 16px; letter-spacing: -0.02em;">Thank you for your purchase!</h1>
          ${downloadSection}
          ${physicalSection}
          <p style="font-size: 16px; color: #111110; margin: 0 0 8px; line-height: 1.5;">If you have any questions, contact us at <a href="mailto:info@mbartype.com" style="color: #111110;">info@mbartype.com</a></p>
          <p style="font-size: 16px; color: #111110; margin: 24px 0 0;">— Mbar Type</p>
        </div>
      `,
    });

    console.log("Email sent to:", customerEmail);
    return res.status(200).json({ message: "Email sent" });
  }

  return res.status(200).json({ received: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
