import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const PHYSICAL_PRODUCTS = new Set(["prod_UeHxKirwa5YYwZ"]);

const PRODUCT_LINKS = {
  // ─── NOSTRAND ───────────────────────────────────────────────────────────────
  prod_UYynxMKGt1CPwd: { name: "Nostrand · Full Family", url: "https://www.dropbox.com/scl/fi/wzygruzzmvmp30783sh6x/Nostrand-FullFamily-Variable.zip?rlkey=v8jg8c4d1rab3hjvk83x4mxch&st=aechhxcz&dl=1" },
  prod_UeHl16vW1YrM6B: { name: "Nostrand · Normal (9 styles)", url: "https://www.dropbox.com/scl/fi/bf1tr7vsr9dhrfbvgdl7u/Nostrand-Normal-9-styles.zip?rlkey=hqwbt8b2a6aw90k4ktz9bkvct&st=loancmkh&dl=1" },
  prod_UeHlFumQCKC2NW: { name: "Nostrand · Oblique (9 styles)", url: "https://www.dropbox.com/scl/fi/mny2k9gb2o4qg487q3vi0/Nostrand-Oblique-9-styles.zip?rlkey=kux45gptnbpern564tlencess&st=mo9uoxyx&dl=1" },
  prod_UeHgSFGWDutmL4: { name: "Nostrand · Thin", url: "https://www.dropbox.com/scl/fi/f17g4h4htof0ccqkh003j/Nostrand-Thin.zip?rlkey=jcdhhnuk30eeyr61u0c9m6mr3&st=9s0ijr7q&dl=1" },
  prod_UeHgPfSzl8VGcp: { name: "Nostrand · Thin Oblique", url: "https://www.dropbox.com/scl/fi/928ct3fpdwci8bxjqx4tz/Nostrand-ThinOblique.zip?rlkey=xis7m29bx63skxjiozhzts5r2&st=ya7n5hx8&dl=1" },
  prod_UeHgWJ1mgsYY44: { name: "Nostrand · ExtraLight", url: "https://www.dropbox.com/scl/fi/b7go8fbvgza3o6r23lmwu/Nostrand-ExtraLight.zip?rlkey=ta3qngkb7qjbbjb7n9zvg4kei&st=8vxps35m&dl=1" },
  prod_UeHhYPa7QAxxmT: { name: "Nostrand · ExtraLight Oblique", url: "https://www.dropbox.com/scl/fi/glncthwqut06vvq9hao55/Nostrand-ExtraLightOblique.zip?rlkey=5izccyyvf0keq1655mrkbrpu3&st=adzefvkx&dl=1" },
  prod_UeHhs9twBZOYKv: { name: "Nostrand · Light", url: "https://www.dropbox.com/scl/fi/1br40blc3h3v1r2gv6sh8/Nostrand-Light.zip?rlkey=eu65g0mysceu8xvga6042tluj&st=q7yqorwr&dl=1" },
  prod_UeHhB2Qzf8jqq2: { name: "Nostrand · Light Oblique", url: "https://www.dropbox.com/scl/fi/f4xo74wlykdxskxvo4453/Nostrand-LightOblique.zip?rlkey=tduildzh3lj70y4ngoygng13u&st=5aaus6pe&dl=1" },
  prod_UeHhpLZXUVY7G4: { name: "Nostrand · Regular", url: "https://www.dropbox.com/scl/fi/8tfxfnuj3ty54i5gy4ufp/Nostrand-Regular.zip?rlkey=jb5ihzfp7hxgduspd1zca1sid&st=w5dvmbjs&dl=0" },
  prod_UeHiH27g7Yiiwz: { name: "Nostrand · Regular Oblique", url: "https://www.dropbox.com/scl/fi/5gdsf5tg1r8wki5vkl2gy/Nostrand-RegularOblique.zip?rlkey=xhycz5g2fms989xrnun3n0xon&st=2ol5np4c&dl=1" },
  prod_UeHilIjKSTuuaJ: { name: "Nostrand · Medium", url: "https://www.dropbox.com/scl/fi/5t0d81cn2686avfk2r9ii/Nostrand-Medium.zip?rlkey=c2kzjzaniji8nw8jllwepfgfw&st=7m348rdm&dl=1" },
  prod_UeHinzJhhlZMcb: { name: "Nostrand · Medium Oblique", url: "https://www.dropbox.com/scl/fi/xklv2g2nout7xavh7krkl/Nostrand-MediumOblique.zip?rlkey=43brumq51kc593tzsaqga2qfq&st=dxwsjhd5&dl=1" },
  prod_UeHj4w7NhdU2Rg: { name: "Nostrand · SemiBold", url: "https://www.dropbox.com/scl/fi/kiyxmtao5ns2tnp4nk02t/Nostrand-SemiBold.zip?rlkey=rtpsvngkpbqfql335eauf7fyo&st=10rut2us&dl=1" },
  prod_UeHjo3E11aeJ4G: { name: "Nostrand · SemiBold Oblique", url: "https://www.dropbox.com/scl/fi/167pz9nu7qkmqlxd7tjjn/Nostrand-SemiBoldOblique.zip?rlkey=4wun0181b9ub4frx2wscnuvh2&st=qyev69ra&dl=1" },
  prod_UeHjV2QoaGp7aM: { name: "Nostrand · Bold", url: "https://www.dropbox.com/scl/fi/hy1py0p37dtqvhdzajlo8/Nostrand-Bold.zip?rlkey=fvketovobw2s3n3ijgqvz4crp&st=jyxdltdz&dl=1" },
  prod_UeHjIdjc1yAlc6: { name: "Nostrand · Bold Oblique", url: "https://www.dropbox.com/scl/fi/gx47318tsnp6suzgn7mbn/Nostrand-BoldOblique.zip?rlkey=63q6l1q346r0tiwq9eae06po2&st=3yyu73wc&dl=1" },
  prod_UeHkdkTzmZmUvy: { name: "Nostrand · ExtraBold", url: "https://www.dropbox.com/scl/fi/46qvp851wgiao6f0l5y84/Nostrand-ExtraBold.zip?rlkey=5336m41pt1xn2owm21ymj4e1g&st=fwrss87m&dl=1" },
  prod_UeHkJqOz6t27sS: { name: "Nostrand · ExtraBold Oblique", url: "https://www.dropbox.com/scl/fi/unumh7sleq7vj3ojenu3l/Nostrand-ExtraBoldOblique.zip?rlkey=c145t5lis45wtzu814jv8pcbb&st=xv3sk9qs&dl=1" },
  prod_UeHkPkRHqpiPvM: { name: "Nostrand · Black", url: "https://www.dropbox.com/scl/fi/zsoga4b7esb03apo78duk/Nostrand-Black.zip?rlkey=mgbzpodywhwhuew2d292o6luf&st=5h3y4zej&dl=1" },
  prod_UeHkb6xJlbYx8U: { name: "Nostrand · Black Oblique", url: "https://www.dropbox.com/scl/fi/cd9x92uyjpexb1zsfe4t2/Nostrand-BlackOblique.zip?rlkey=0lfkt8m3wlam9xuvldmzaru3p&st=k11612ka&dl=1" },

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

const BAR_SADY = {
  name: "Bar Sady · Full Family",
  url: "https://www.dropbox.com/scl/fi/igszpqsx118sni6dqpdri/BarSady-FullFamily-Variable.zip?rlkey=u9efa48jfvt3ezlqcyal6t8lx&st=isxuqmrj&dl=1",
};

const DOWNLOADS = { ...PRODUCT_LINKS, barsady: BAR_SADY };

function productKey(name) {
  const normalize = (value) => value.toLowerCase().replace(/ · /g, " ").trim();
  const target = normalize(name);
  return Object.keys(DOWNLOADS).find((id) => normalize(DOWNLOADS[id].name) === target);
}

function downloadKeys(item) {
  const family = item.fontId?.toLowerCase();
  if (family === "barsady") return ["barsady"];

  if (family === "nostrand") {
    if (item.name === "Normal") return ["prod_UeHl16vW1YrM6B"];
    if (item.name === "Oblique") return ["prod_UeHlFumQCKC2NW"];

    const styles = /^\d+ styles: (.+)$/.exec(item.styles || "")?.[1];
    if (styles) {
      const keys = styles.split(", ").map((style) => productKey("Nostrand " + style));
      return keys.every(Boolean) ? keys : [];
    }
    const key = productKey(item.name);
    return key && PRODUCT_LINKS[key]?.name.startsWith("Nostrand · ") ? [key] : [];
  }

  const key = productKey(item.name);
  if (key) return [key];
  if (family === "milkybar") return ["prod_UYyo3NX7WRMdE8"];
  if (family === "kidcut") return ["prod_UYyoaBaln9ZxEI"];
  return [];
}

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

      const delivered = new Set();
      const lineItems = stripe.checkout.sessions.listLineItems(session.id, {
        expand: ["data.price.product"],
        limit: 100,
      });
      for await (const item of lineItems) {
        const product = item.price?.product;
        const productId = typeof product === "string" ? product : product?.id;
        if (PHYSICAL_PRODUCTS.has(productId)) {
          physicalItems.push(product?.name || item.description || "Physical product");
          continue;
        }

        const name = item.description || product?.name || "";
        const keys = product?.metadata?.download_keys?.split(",") ||
          (PRODUCT_LINKS[productId] ? [productId] : [productKey(name)]);
        for (const key of keys) {
          if (Object.hasOwn(DOWNLOADS, key) && !delivered.has(key)) {
            delivered.add(key);
            digitalItems.push(DOWNLOADS[key]);
          }
        }
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
    const keysByItem = cart.map(downloadKeys);
    if (cart.some((item, index) => item.fontId?.toLowerCase() === "nostrand" && keysByItem[index].length === 0)) {
      return res.status(400).json({ error: "Unknown Nostrand selection" });
    }
    const lineItems = cart.map((item, index) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          metadata: { download_keys: keysByItem[index].join(",") },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));
    const freeBarSadyOrder = lineItems.every((item, index) =>
      item.price_data.unit_amount === 0 && keysByItem[index].join(",") === "barsady"
    );

    const session = await stripe.checkout.sessions.create({
      ...(freeBarSadyOrder ? {} : { payment_method_types: ["card", "paypal", "blik"] }),
      line_items: lineItems,
      mode: "payment",
      customer_email: email,
      success_url: successUrl || "https://mbartype.com/buy/cart-page?payment=success",
      cancel_url: cancelUrl || "https://mbartype.com/buy/cart-page",
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


achhhh
