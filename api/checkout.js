import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const PHYSICAL_PRODUCTS = new Set(["prod_UeHxKirwa5YYwZ"]);

const PRODUCT_LINKS = {
  // ─── NOSTRAND ───────────────────────────────────────────────────────────────
  prod_UYynxMKGt1CPwd: { name: "Nostrand · Full Family", url: "https://www.dropbox.com/scl/fi/2ywehv0w09516moh7u7ni/Nostrand-FullFamily.zip?rlkey=cqshkdy2o74o7i3tb06zhuqn2&st=c40w228e&dl=1" },
  prod_UeHl16vW1YrM6B: { name: "Nostrand · Normal (9 styles)", url: "https://www.dropbox.com/scl/fi/w8v5ey7zq6n4l0bdpzhpn/Nostrand-Normal.zip?rlkey=3n1nxcw4lak2hkpyit6wb14yp&st=cddastur&dl=1" },
  prod_UeHlFumQCKC2NW: { name: "Nostrand · Oblique (9 styles)", url: "https://www.dropbox.com/scl/fi/zuvidfhs68xx5glck74c6/Nostrand-Oblique.zip?rlkey=fub79nfv63wlen917x6ywfpq5&st=5orjhd8i&dl=1" },
  prod_UeHgSFGWDutmL4: { name: "Nostrand · Thin", url: "https://www.dropbox.com/scl/fi/e76u4ewp7z0616cs18w5t/Nostrand-Thin.zip?rlkey=k1o0e0tlz0msr3f72c9btod4f&st=ni509urf&dl=1" },
  prod_UeHgPfSzl8VGcp: { name: "Nostrand · Thin Oblique", url: "https://www.dropbox.com/scl/fi/njphaz8pxfwna3zs5m129/Nostrand-ThinOblique.zip?rlkey=boz4jz9045mdmkcdzp3kseogp&st=rhpug7ga&dl=1" },
  prod_UeHgWJ1mgsYY44: { name: "Nostrand · ExtraLight", url: "https://www.dropbox.com/scl/fi/11w5kg9jxssmi4t4qbot5/Nostrand-ExtraLight.zip?rlkey=nps9i9p2dnzzp6fjlrj1jojtq&st=s6wu2qmc&dl=1" },
  prod_UeHhYPa7QAxxmT: { name: "Nostrand · ExtraLight Oblique", url: "https://www.dropbox.com/scl/fi/ru0ptpe2y55l08aveatwv/Nostrand-ExtraLightOblique.zip?rlkey=466fcylcptatyhjq53a2q4p9o&st=uneoe0cg&dl=1" },
  prod_UeHhs9twBZOYKv: { name: "Nostrand · Light", url: "https://www.dropbox.com/scl/fi/3d27jeyc8szr2yrpsh4jb/Nostrand-Light.zip?rlkey=b2gnjxj8evd3y9ut59eh1dtfa&st=hkc4mibb&dl=1" },
  prod_UeHhB2Qzf8jqq2: { name: "Nostrand · Light Oblique", url: "https://www.dropbox.com/scl/fi/uhutepbm8bluj42mrkm78/Nostrand-LightOblique.zip?rlkey=80v28f7pxvn2p2dypyka71fch&st=mfk5dddd&dl=1" },
  prod_UeHhpLZXUVY7G4: { name: "Nostrand · Regular", url: "https://www.dropbox.com/scl/fi/q5v0n8ezeqag93g8n3ulp/Nostrand-Regular.zip?rlkey=jxke5zg2w25hnuu9l5mycgqs8&st=3e2x6fov&dl=1" },
  prod_UeHiH27g7Yiiwz: { name: "Nostrand · Regular Oblique", url: "https://www.dropbox.com/scl/fi/jhb9j2qtf43ed7hndv79y/Nostrand-RegularOblique.zip?rlkey=hzq7dppjcalm0xwgt2spmd7mn&st=uii8be9a&dl=1" },
  prod_UeHilIjKSTuuaJ: { name: "Nostrand · Medium", url: "https://www.dropbox.com/scl/fi/3dun802u8f1eevg5beut4/Nostrand-Medium.zip?rlkey=2nfywblepw7f9m11q8ory2kit&st=elaam4mt&dl=1" },
  prod_UeHinzJhhlZMcb: { name: "Nostrand · Medium Oblique", url: "https://www.dropbox.com/scl/fi/s67w2f8yx9tn7pt4yfiji/Nostrand-MediumOblique.zip?rlkey=026oh7zd7pm07ofubvhlj10vx&st=wh72sggq&dl=1" },
  prod_UeHj4w7NhdU2Rg: { name: "Nostrand · SemiBold", url: "https://www.dropbox.com/scl/fi/t833x9o6kyq8yogib96or/Nostrand-SemiBold.zip?rlkey=qrscrwkrzzospidjxgc8ocbwf&st=bd822fhm&dl=1" },
  prod_UeHjo3E11aeJ4G: { name: "Nostrand · SemiBold Oblique", url: "https://www.dropbox.com/scl/fi/s3h98wtf0qcqkg9k98m0w/Nostrand-SemiBoldOblique.zip?rlkey=kaq48z3m7fuui382nq83wdwab&st=g0tgku9v&dl=1" },
  prod_UeHjV2QoaGp7aM: { name: "Nostrand · Bold", url: "https://www.dropbox.com/scl/fi/801ixccisjp9oc8pt7738/Nostrand-Bold.zip?rlkey=amnv09944c17bsyws02kcbmgs&st=2pmxulat&dl=1" },
  prod_UeHjIdjc1yAlc6: { name: "Nostrand · Bold Oblique", url: "https://www.dropbox.com/scl/fi/dj0m443pmbbbnw7giaeyp/Nostrand-BoldOblique.zip?rlkey=9gvboa4woywpqld8k4o8nu5is&st=pm3nbvg0&dl=1" },
  prod_UeHkdkTzmZmUvy: { name: "Nostrand · ExtraBold", url: "https://www.dropbox.com/scl/fi/goteynn69h65fwukk4gc9/Nostrand-ExtraBold.zip?rlkey=m1ct8spnfkry3rry7ktjtawuw&st=9x48scs9&dl=1" },
  prod_UeHkJqOz6t27sS: { name: "Nostrand · ExtraBold Oblique", url: "https://www.dropbox.com/scl/fi/o2tx8mh0lvbkrirly3ize/Nostrand-ExtraBoldOblique.zip?rlkey=c7uj6srkt8o2c02ntbb4zrz4s&st=8935ythi&dl=1" },
  prod_UeHkPkRHqpiPvM: { name: "Nostrand · Black", url: "https://www.dropbox.com/scl/fi/dam3qj0qioaf8c36fvjxp/Nostrand-Black.zip?rlkey=teujkj6q38lizmjnnjz61jtvh&st=sj9yipoh&dl=1" },
  prod_UeHkb6xJlbYx8U: { name: "Nostrand · Black Oblique", url: "https://www.dropbox.com/scl/fi/zoxvp9ww1dme3ewhvof8m/Nostrand-BlackOblique.zip?rlkey=5sp65l9xqdv7zn7oolq26qudh&st=gizeufgt&dl=1" },

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
