import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const PRODUCT_LINKS = {
  prod_UYynxMKGt1CPwd: {
    name: "Nostrand · Full Family",
    url: "https://www.dropbox.com/scl/fi/dlbevkyxph7h2788u17l9/Nostrand-Full_Family.zip?rlkey=3w7ac2wthwtgvewhosqorq5nf&st=aoh5sbk3&dl=1",
  },
  prod_UYyo3NX7WRMdE8: {
    name: "Milky Bar · Full Family",
    url: "https://www.dropbox.com/scl/fi/4anduy1xakqilfn53o1kj/MilkyBar_FullFamily.zip?rlkey=iz0geal2xoo291dttnapd59uf&st=d6mu16rh&dl=1",
  },
  prod_UYyoaBaln9ZxEI: {
    name: "Kidcut",
    url: "https://www.dropbox.com/scl/fi/m1t3zd4aaol3eluztmmh1/Kidcut-full.zip?rlkey=2l1k256bw2g1o0ovhuu2g32do&st=6sztnr8w&dl=1",
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

    const purchasedItems = lineItems.data
      .map((item) => {
        const productId = item.price?.product?.id;
        return PRODUCT_LINKS[productId] || null;
      })
      .filter(Boolean);

    if (purchasedItems.length === 0) {
      console.log("No matching products for:", session.id);
      return res.status(200).json({ message: "No matching products" });
    }

const downloadLinks = purchasedItems
  .map(
    (item) =>
      `<li style="margin-bottom: 20px;"><p style="font-size: 16px; font-weight: 600; margin: 0 0 4px; color: #111110;">${item.name}</p><a href="${item.url}" style="font-size: 16px; color: #111110; text-decoration: underline;">Download ${item.name}</a></li>`
  )
  .join("");

    await resend.emails.send({
      from: "Mbar Type <info@mbartype.com>",
      to: customerEmail,
      subject: "Your font files are ready to download — Mbar Type",
html: `
  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 48px 32px; color: #111110;">
    <h1 style="font-size: 28px; font-weight: 600; margin: 0 0 16px; letter-spacing: -0.02em;">Thank you for your purchase!</h1>
    <p style="font-size: 16px; color: #111110; margin: 0 0 40px; line-height: 1.5;">Your fonts are ready to download. Click the links below to get your files.</p>
    <ul style="list-style: none; padding: 0; margin: 0 0 40px;">
      ${downloadLinks}
    </ul>
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
