import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const PHYSICAL_PRODUCTS = new Set(["prod_UeHxKirwa5YYwZ"]);

const PRODUCT_LINKS = {
  // ─── NOSTRAND ───────────────────────────────────────────────────────────────
  prod_UYynxMKGt1CPwd: { name: "Nostrand · Full Family", url: "https://www.dropbox.com/scl/fi/c6t5ofeo4hz47q49f8vym/Nostrand-FullFamily.zip?rlkey=dn9riqtnerg1odl2mzc58vzqw&st=3ub0b0zq&dl=1" },
  prod_UeHl16vW1YrM6B: { name: "Nostrand · Normal (9 styles)", url: "https://www.dropbox.com/scl/fi/5x7iu9wdi8cu3eku86aft/Nostrand-Normal.zip?rlkey=rurc0besltsurucuilu7jprik&st=y6909isj&dl=1" },
  prod_UeHlFumQCKC2NW: { name: "Nostrand · Oblique (9 styles)", url: "https://www.dropbox.com/scl/fi/z4q4lz7h760fapm8xuh7r/Nostrand-Oblique.zip?rlkey=3dd4rpzepe1ctn5o0o0jt435f&st=aozyl4yw&dl=1" },
  prod_UeHgSFGWDutmL4: { name: "Nostrand · Thin", url: "https://www.dropbox.com/scl/fi/txii6zf016jtq5dd4skus/Nostrand-Thin.zip?rlkey=ylgw6x8e8ghnymr0mek3tdr0i&st=9o742l8n&dl=1" },
  prod_UeHgPfSzl8VGcp: { name: "Nostrand · Thin Oblique", url: "https://www.dropbox.com/scl/fi/p7gxps28ieki9s3qik9iv/Nostrand-ThinOblique.zip?rlkey=v11gtrpezdoxcrqnff7rvgqxc&st=lgzfg026&dl=1" },
  prod_UeHgWJ1mgsYY44: { name: "Nostrand · ExtraLight", url: "https://www.dropbox.com/scl/fi/zsfqrquke30loh637vz9x/Nostrand-ExtraLight.zip?rlkey=hu6c6yl7jd9fn82ces2xnp9kt&st=e8c637dt&dl=1" },
  prod_UeHhYPa7QAxxmT: { name: "Nostrand · ExtraLight Oblique", url: "https://www.dropbox.com/scl/fi/knnqoensr4ou8oozo0o91/Nostrand-ExtraLightOblique.zip?rlkey=nauncqonfyxov1pb105ki5tu0&st=iw5gxtcc&dl=1" },
  prod_UeHhs9twBZOYKv: { name: "Nostrand · Light", url: "https://www.dropbox.com/scl/fi/g0a1o7kyfagzewohr0ep8/Nostrand-Light.zip?rlkey=g35tuwkym7qcb9io5gry3y6ko&st=aevjdars&dl=1" },
  prod_UeHhB2Qzf8jqq2: { name: "Nostrand · Light Oblique", url: "https://www.dropbox.com/scl/fi/0a2g29o8yv09oo9g6er4o/Nostrand-LightOblique.zip?rlkey=5yj7p33ylr41draf1vbaiysc1&st=1praxdko&dl=1" },
  prod_UeHhpLZXUVY7G4: { name: "Nostrand · Regular", url: "https://www.dropbox.com/scl/fi/rto48m66qt7qkxn4izrb1/Nostrand-Regular.zip?rlkey=3iz523ln5ec9ystfpm0cz7dgu&st=450r1s67&dl=1" },
  prod_UeHiH27g7Yiiwz: { name: "Nostrand · Regular Oblique", url: "https://www.dropbox.com/scl/fi/y9qhfy6x4b5x956is3k6x/Nostrand-RegularOblique.zip?rlkey=ahs8u28zfq3ofauw1fccy8a77&st=tdrlqm9m&dl=1" },
  prod_UeHilIjKSTuuaJ: { name: "Nostrand · Medium", url: "https://www.dropbox.com/scl/fi/ubglwr5qof9rbofj0x5um/Nostrand-Medium.zip?rlkey=ibb00q5ylq5pc1mmkgdwnefsj&st=n5qzhwb8&dl=1" },
  prod_UeHinzJhhlZMcb: { name: "Nostrand · Medium Oblique", url: "https://www.dropbox.com/scl/fi/yp4l6m8hcgf9wn8m852k8/Nostrand-MediumOblique.zip?rlkey=6khqmtntxz700pix8yadb463j&st=0vqoc6a4&dl=1" },
  prod_UeHj4w7NhdU2Rg: { name: "Nostrand · SemiBold", url: "https://www.dropbox.com/scl/fi/5leuy3s98rgv7evutghyv/Nostrand-SemiBold.zip?rlkey=6fmdth9dx2wr3o5o014joc26n&st=pgp052jb&dl=1" },
  prod_UeHjo3E11aeJ4G: { name: "Nostrand · SemiBold Oblique", url: "https://www.dropbox.com/scl/fi/8e3ids1t79rej74gsckob/Nostrand-SemiBoldOblique.zip?rlkey=w57e0tioe9co66jyfj8115np7&st=5qbmqto4&dl=1" },
  prod_UeHjV2QoaGp7aM: { name: "Nostrand · Bold", url: "https://www.dropbox.com/scl/fi/eho7m0gh4mzubaxyheeje/Nostrand-Bold.zip?rlkey=6prka9u8chd9b2lir0hvc1xj2&st=ld3wor2d&dl=1" },
  prod_UeHjIdjc1yAlc6: { name: "Nostrand · Bold Oblique", url: "https://www.dropbox.com/scl/fi/1suke1rxfuelvk67nkmut/Nostrand-BoldOblique.zip?rlkey=iulmxet7ftx314scja09rr3n9&st=t203jgdb&dl=1" },
  prod_UeHkdkTzmZmUvy: { name: "Nostrand · ExtraBold", url: "https://www.dropbox.com/scl/fi/c722tc4mmejxrqbddxv3t/Nostrand-ExtraBold.zip?rlkey=67lhotrnetdjyb32m3ys28vfk&st=qw1xzoxf&dl=1" },
  prod_UeHkJqOz6t27sS: { name: "Nostrand · ExtraBold Oblique", url: "https://www.dropbox.com/scl/fi/xz80tcxmquuxe1vf3vjk5/Nostrand-ExtraBoldOblique.zip?rlkey=jhfe5iv1cx16s2722zcn8dtu9&st=19l7ur60&dl=1" },
  prod_UeHkPkRHqpiPvM: { name: "Nostrand · Black", url: "https://www.dropbox.com/scl/fi/1826dfbzu8rgnddjy4vso/Nostrand-Black.zip?rlkey=36yavog4ox0x7ighrq8p9w27q&st=o7ydriwy&dl=1" },
  prod_UeHkb6xJlbYx8U: { name: "Nostrand · Black Oblique", url: "https://www.dropbox.com/scl/fi/of3ws46guwqpzpb1hfu0q/Nostrand-BlackOblique.zip?rlkey=05c9aer4qbuj9zgk9lzgbpogs&st=21j7cd7m&dl=1" },

  // ─── MILKY BAR ───────────────────────────────────────────────────────────────
  prod_UYyo3NX7WRMdE8: { name: "Milky Bar · Full Family", url: "https://www.dropbox.com/scl/fi/kwjejkj8eh3atkt2aq7hg/MilkyBar-FullFamily.zip?rlkey=9glhenavq18p5nxmxsqetirqb&st=jwvy3lsj&dl=1" },
  prod_UeHbTj0CTFTkq6: { name: "Milky Bar · Normal (Soft + Sharp)", url: "https://www.dropbox.com/scl/fi/65f17agcuv2xt6o7bplvz/MilkyBar-Normal.zip?rlkey=u5hayhcg9efoxktgjji8z7efp&st=on0y2kc4&dl=1" },
  prod_UeHdGzumW1YMv1: { name: "Milky Bar · Oblique", url: "https://www.dropbox.com/scl/fi/5sc94bwok2tdemklk6xsg/MilkyBar-Oblique.zip?rlkey=5pw1yzpkfz23qxm5euhqukrdh&st=ik22etvu&dl=1" },
  prod_UeHd6aAMEpQg9w: { name: "Milky Bar · Soft", url: "https://www.dropbox.com/scl/fi/a9e4l38jci8kqiuuch7qh/MilkyBar-Soft.zip?rlkey=y4p7aluekixovu1rl20g6lnw9&st=09v7kgo3&dl=1" },
  prod_UeHeftJxobTD5W: { name: "Milky Bar · Soft Oblique", url: "https://www.dropbox.com/scl/fi/u0aabmrftri5u7j9bum33/MilkyBar-SoftOblique.zip?rlkey=k0zpgdce7cagrk36k5np0oqkg&st=e67s2m10&dl=1" },
  prod_UeHdW1YbQD9eUd: { name: "Milky Bar · Sharp", url: "https://www.dropbox.com/scl/fi/u82l27q3vbtlmxeo57muj/MilkyBar-Sharp.zip?rlkey=g7yb44embmxcyfw607411xdo8&st=dn0vkccw&dl=1" },
  prod_UeHdGqirSFaMsy: { name: "Milky Bar · Sharp Oblique", url: "https://www.dropbox.com/scl/fi/kvczzo99ixhariro4588f/MilkyBar-SharpOblique.zip?rlkey=rm3caj0nm7nr1n3gt19bckkup&st=1d40iv59&dl=1" },

  // ─── KIDCUT ──────────────────────────────────────────────────────────────────
  prod_UYyoaBaln9ZxEI: { name: "Kidcut", url: "https://www.dropbox.com/scl/fi/jek16j9e4ejl6lo54coel/Kidcut.zip?rlkey=tdzbsw00na9wdsd2p2plb8gdz&st=30qdwuen&dl=1" },
};

// Mapping fontId from cart metadata to download links
const FONTID_TO_LINKS = {
  nostrand: [PRODUCT_LINKS["prod_UYynxMKGt1CPwd"]],
  milkybar: [PRODUCT_LINKS["prod_UYyo3NX7WRMdE8"]],
  kidcut: [PRODUCT_LINKS["prod_UYyoaBaln9ZxEI"]],
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
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const rawBody = await getRawBody(req);
  const stripeSignature = req.headers["stripe-signature"];

  if (stripeSignature) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, stripeSignature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error("Webhook error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const customerEmail = session.customer_details?.email || session.customer_email;

      if (!customerEmail) {
        return res.status(400).json({ error: "No customer email" });
      }

      const digitalItems = [];
      const physicalItems = [];

      const cartMeta = session.metadata?.cart;
      if (cartMeta) {
        try {
          const cartItems = JSON.parse(cartMeta);
          cartItems.forEach((fontId) => {
            if (typeof fontId === "string") {
              const links = FONTID_TO_LINKS[fontId.toLowerCase()];
              if (links) {
                links.forEach(l => digitalItems.push(l));
              }
            }
          });
        } catch (e) {
          console.error("Error parsing cart metadata:", e);
        }
      }

      if (digitalItems.length === 0 && physicalItems.length === 0) {
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { expand: ["data.price.product"] });
        lineItems.data.forEach((item) => {
          const productId = item.price?.product?.id;
          const itemName = item.description || item.price?.product?.name;
          if (productId && PHYSICAL_PRODUCTS.has(productId)) {
            physicalItems.push(item.price?.product?.name || "Physical product");
          } else if (productId && PRODUCT_LINKS[productId]) {
            digitalItems.push(PRODUCT_LINKS[productId]);
          } else if (itemName) {
            const match = Object.values(PRODUCT_LINKS).find(p => p.name === itemName);
            if (match) digitalItems.push(match);
          }
        });
      }

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
            <p style="font-size: 16px; color: #111110; margin: 0 0 8px; line-height: 1.5;">If you need a VAT invoice, please reach out to us at <a href="mailto:info@mbartype.com" style="color: #111110;">info@mbartype.com</a></p>
            <p style="font-size: 16px; color: #111110; margin: 24px 0 0;">— Mbar Type</p>
          </div>
        `,
      });

      console.log("Email sent to:", customerEmail);
      return res.status(200).json({ message: "Email sent" });
    }

    return res.status(200).json({ received: true });
  }

  let body;
  try {
    body = JSON.parse(rawBody.toString());
  } catch (err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  const { cart, email, successUrl, cancelUrl } = body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ error: "Empty cart" });
  }

  try {
    const lineItems = cart.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    const fontIds = cart.map((item) => item.fontId || item.name);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: email,
      success_url: successUrl || "https://mbartype.com/buy/cart-page?payment=success",
      cancel_url: cancelUrl || "https://mbartype.com/buy/cart-page",
      metadata: { cart: JSON.stringify(fontIds) },
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
