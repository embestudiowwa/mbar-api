import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const PHYSICAL_PRODUCTS = new Set(["prod_UeHxKirwa5YYwZ"]);

const PRODUCT_LINKS = {
  // ─── NOSTRAND ───────────────────────────────────────────────────────────────
  prod_UYynxMKGt1CPwd: { name: "Nostrand · Full Family", url: "https://www.dropbox.com/scl/fi/zmimxubmqc8fff8a1yqwk/Nostrand-FullFamily.zip?rlkey=p9pn2vbazh7yozwvb6drhmffm&st=rbe15uw7&dl=1" },
  prod_UeHl16vW1YrM6B: { name: "Nostrand · Normal (9 styles)", url: "https://www.dropbox.com/scl/fi/ofpwf99dw8wjk1cr03sly/Nostrand-MediumOblique.zip?rlkey=apdbbkdfc92qkdkg77hqmrxpi&st=rxwzw9bt&dl=1" },
  prod_UeHlFumQCKC2NW: { name: "Nostrand · Oblique (9 styles)", url: "https://www.dropbox.com/scl/fi/k4zvpuuoqp3qkpni7urdr/Nostrand-Oblique.zip?rlkey=i5z8n5m5nmr5avfiuh85bu724&st=ryvc8ziz&dl=1" },
  prod_UeHgSFGWDutmL4: { name: "Nostrand · Thin", url: "https://www.dropbox.com/scl/fi/9hk4724x3zwa1ftnp6sjs/Nostrand-Thin.zip?rlkey=1odg0vwcgzj54zkqsq8cwk0xt&st=qh5azc9k&dl=1" },
  prod_UeHgPfSzl8VGcp: { name: "Nostrand · Thin Oblique", url: "https://www.dropbox.com/scl/fi/wtbf5csipt1bfqduqqk0j/Nostrand-ThinOblique.zip?rlkey=ekdygpdgvts4g1fycka9u2cp7&st=j3z9t3gr&dl=1" },
  prod_UeHgWJ1mgsYY44: { name: "Nostrand · ExtraLight", url: "https://www.dropbox.com/scl/fi/kl7yu7lhedddkp2y3kg7s/Nostrand-ExtraLight.zip?rlkey=gs51umjnghguhsuo95kk2q40r&st=86agd833&dl=1" },
  prod_UeHhYPa7QAxxmT: { name: "Nostrand · ExtraLight Oblique", url: "https://www.dropbox.com/scl/fi/2w3b7ru4sp9dywvgdfm7g/Nostrand-ExtraLightOblique.zip?rlkey=tb1m7ei1a2urwj9ahmifibbz1&st=qwrbevr4&dl=1" },
  prod_UeHhs9twBZOYKv: { name: "Nostrand · Light", url: "https://www.dropbox.com/scl/fi/zk28hfigelgu5x0z08xbu/Nostrand-Light.zip?rlkey=4gy6pnmsqx5rno6mk0p48ycl9&st=uo6b4xx1&dl=1" },
  prod_UeHhB2Qzf8jqq2: { name: "Nostrand · Light Oblique", url: "https://www.dropbox.com/scl/fi/y844ikya5ks183ogulb8o/Nostrand-LightOblique.zip?rlkey=nf23tw9jr4alwrr6bgnshlopl&st=enwud3bp&dl=1" },
  prod_UeHhpLZXUVY7G4: { name: "Nostrand · Regular", url: "https://www.dropbox.com/scl/fi/jc489ih54s1wrykzcd75j/Nostrand-Regular.zip?rlkey=kchn45py2zz7vzans72qcbrae&st=dmq1odnr&dl=1" },
  prod_UeHiH27g7Yiiwz: { name: "Nostrand · Regular Oblique", url: "https://www.dropbox.com/scl/fi/cy23xwvajmxdpw0eulwej/Nostrand-RegularOblique.zip?rlkey=4beq4wn5owcxuiw9fjg7uedl9&st=mayotfo1&dl=1" },
  prod_UeHilIjKSTuuaJ: { name: "Nostrand · Medium", url: "https://www.dropbox.com/scl/fi/o0d1r5k6dprc3qry30m8d/Nostrand-Medium.zip?rlkey=1lmtdk9ttv71qknkv7755sa2z&st=8kq5y832&dl=1" },
  prod_UeHinzJhhlZMcb: { name: "Nostrand · Medium Oblique", url: "https://www.dropbox.com/scl/fi/ofpwf99dw8wjk1cr03sly/Nostrand-MediumOblique.zip?rlkey=apdbbkdfc92qkdkg77hqmrxpi&st=rxwzw9bt&dl=1" },
  prod_UeHj4w7NhdU2Rg: { name: "Nostrand · SemiBold", url: "https://www.dropbox.com/scl/fi/cy23xwvajmxdpw0eulwej/Nostrand-RegularOblique.zip?rlkey=4beq4wn5owcxuiw9fjg7uedl9&st=mayotfo1&dl=1" },
  prod_UeHjo3E11aeJ4G: { name: "Nostrand · SemiBold Oblique", url: "https://www.dropbox.com/scl/fi/9syu250bslbxanagwkgjj/Nostrand-SemiBoldOblique.zip?rlkey=u7lqqmtsq5ljacj5fhvwtvhc6&st=3gk5kxcg&dl=1" },
  prod_UeHjV2QoaGp7aM: { name: "Nostrand · Bold", url: "https://www.dropbox.com/scl/fi/e7md6biwsy7ph0qz93o00/Nostrand-Bold.zip?rlkey=ycd8f4op7ibhrlikgivfqcyym&st=mtfiazkl&dl=1" },
  prod_UeHjIdjc1yAlc6: { name: "Nostrand · Bold Oblique", url: "https://www.dropbox.com/scl/fi/mv08s1u270yys9xaia8lt/Nostrand-BoldOblique.zip?rlkey=27z6lqgby2a69czv7z2tbgjga&st=d1em0yaf&dl=1" },
  prod_UeHkdkTzmZmUvy: { name: "Nostrand · ExtraBold", url: "https://www.dropbox.com/scl/fi/9iibn6sz6cbv0dtef0e96/Nostrand-ExtraBold.zip?rlkey=mafshwf2d0yspu79ywgx9jkkn&st=dqwnutno&dl=1" },
  prod_UeHkJqOz6t27sS: { name: "Nostrand · ExtraBold Oblique", url: "https://www.dropbox.com/scl/fi/6ix33m256xb55yfiz34td/Nostrand-ExtraBoldOblique.zip?rlkey=3yfmr3r57j660yrgx8dt4ocyd&st=so6r3h1u&dl=1" },
  prod_UeHkPkRHqpiPvM: { name: "Nostrand · Black", url: "https://www.dropbox.com/scl/fi/bkklgarwgnckflyhl02ar/Nostrand-Black.zip?rlkey=wsd383yyyr5tjwwa6k95duupn&st=2dm89bj8&dl=1" },
  prod_UeHkb6xJlbYx8U: { name: "Nostrand · Black Oblique", url: "https://www.dropbox.com/scl/fi/v72bm4xo86i0p040rudiy/Nostrand-BlackOblique.zip?rlkey=8az4e3omcsnw93h2shydh4d43&st=dblmy8r5&dl=1" },

  // ─── MILKY BAR ───────────────────────────────────────────────────────────────
  prod_UYyo3NX7WRMdE8: { name: "Milky Bar · Full Family", url: "https://www.dropbox.com/scl/fi/34rvurnlqm8nywdoigaj5/MilkyBar-FullFamily.zip?rlkey=37abykym3c4afk3pba9u1lpgj&st=4x0kh8re&dl=1" },
  prod_UeHbTj0CTFTkq6: { name: "Milky Bar · Normal (Soft + Sharp)", url: "https://www.dropbox.com/scl/fi/6ygys60m28xum5fqzds3g/MilkyBar-Normal.zip?rlkey=cjpykqvxrzjewbjysjkrlh2i4&st=5xz0yg3d&dl=1" },
  prod_UeHdGzumW1YMv1: { name: "Milky Bar · Oblique (Soft + Sharp)", url: "https://www.dropbox.com/scl/fi/7ha1sbxafgcgs6yv1h1qn/MilkyBar-Oblique.zip?rlkey=bw7dq2iu2ehr00d6y0dhk7hfj&st=220noi37&dl=1" },
  prod_UeHd6aAMEpQg9w: { name: "Milky Bar · Soft", url: "https://www.dropbox.com/scl/fi/s3pgga7xq0khxj1qzwz22/MilkyBar-Soft.zip?rlkey=sm7rgomtpeftb8b6u4gh75wn7&st=13fcycwe&dl=1" },
  prod_UeHeftJxobTD5W: { name: "Milky Bar · Soft Oblique", url: "https://www.dropbox.com/scl/fi/h04oitsbhzgw7ovu3b5nq/MilkyBar-SoftOblique.zip?rlkey=m87d3lkvu36qoob42zl2307o2&st=so6ssbhq&dl=1" },
  prod_UeHdW1YbQD9eUd: { name: "Milky Bar · Sharp", url: "https://www.dropbox.com/scl/fi/isidnzq2xk0edaw6sjwr7/MilkyBar-Sharp.zip?rlkey=lj3ekb1c9tx90ht8r8qsh21f5&st=b2gocm62&dl=1" },
  prod_UeHdGqirSFaMsy: { name: "Milky Bar · Sharp Oblique", url: "https://www.dropbox.com/scl/fi/13axdsc0c4zagda83q1rj/MilkyBar-SharpOblique.zip?rlkey=qgotaqg5kmzpieiktlm2bge3d&st=8nzfhzyb&dl=1" },

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
      payment_method_types: ["card", "paypal", "blik"],
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
