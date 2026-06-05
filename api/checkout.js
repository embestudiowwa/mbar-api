import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const PHYSICAL_PRODUCTS = new Set(["prod_UeHxKirwa5YYwZ"]);

const PRODUCT_LINKS = {
  // ─── NOSTRAND ───────────────────────────────────────────────────────────────
  prod_UYynxMKGt1CPwd: {
    name: "Nostrand · Full Family",
    url: "https://www.dropbox.com/scl/fi/x2489fganghm74qhp2tou/Nostrand-FullFamily.zip?rlkey=fr4x2zobboon15frocyxujtf4&st=ob5hqajx&dl=1",
  },
  prod_UeHl16vW1YrM6B: {
    name: "Nostrand · Normal (9 styles)",
    url: "https://www.dropbox.com/scl/fi/8bn97niwg8yaum7troeyo/Nostrand-Normal.zip?rlkey=qr1rnfpp708b251jmtotr03jz&st=7xjtsrft&dl=1",
  },
  prod_UeHlFumQCKC2NW: {
    name: "Nostrand · Oblique (9 styles)",
    url: "https://www.dropbox.com/scl/fi/i5gd0bb2z35wksur45675/Nostrand-Oblique.zip?rlkey=ettu4o7aciyjl5smzng1ihkgb&st=c70eugis&dl=1",
  },
  prod_UeHgSFGWDutmL4: {
    name: "Nostrand · Thin",
    url: "https://www.dropbox.com/scl/fi/pnyhivflk77c8xa7ljzwh/Nostrand-Thin.zip?rlkey=srlvtu1ievu0fa4sawsmbmeya&st=kpeymhq9&dl=1",
  },
  prod_UeHgPfSzl8VGcp: {
    name: "Nostrand · Thin Oblique",
    url: "https://www.dropbox.com/scl/fi/9d2puyj2ha8j05xn9qyfs/Nostrand-ThinOblique.zip?rlkey=jvbiss312ay6v6mk5w41zn5em&st=jpf47hz4&dl=1",
  },
  prod_UeHgWJ1mgsYY44: {
    name: "Nostrand · ExtraLight",
    url: "https://www.dropbox.com/scl/fi/cmjws0igu84q2dwsgh1ap/Nostrand-ExtraLight.zip?rlkey=5y3f2ah8nr9nfsjuy5tyhdrva&st=bcpmgr1b&dl=1",
  },
  prod_UeHhYPa7QAxxmT: {
    name: "Nostrand · ExtraLight Oblique",
    url: "https://www.dropbox.com/scl/fi/f6mzfdka7q8nzy047tert/Nostrand-ExtraLightOblique.zip?rlkey=he1cgqlc592oaxjjk5udgjhqo&st=bfx891rh&dl=1",
  },
  prod_UeHhs9twBZOYKv: {
    name: "Nostrand · Light",
    url: "https://www.dropbox.com/scl/fi/5u4csygdb1c629gmspwcl/Nostrand-Light.zip?rlkey=obla0s720b0bniv8lgezuhudc&st=ay48qgwo&dl=1",
  },
  prod_UeHhB2Qzf8jqq2: {
    name: "Nostrand · Light Oblique",
    url: "https://www.dropbox.com/scl/fi/257j0uex7os7j0htp06xg/Nostrand-LightOblique.zip?rlkey=na88uq973as1q2lx05llxclxm&st=lqnh1qjn&dl=1",
  },
  prod_UeHhpLZXUVY7G4: {
    name: "Nostrand · Regular",
    url: "https://www.dropbox.com/scl/fi/ckurl40d0wmy81n9atywy/Nostrand-Regular.zip?rlkey=2lohpdofowq7zl31dzhxz6lfw&st=mvhehe4z&dl=1",
  },
  prod_UeHiH27g7Yiiwz: {
    name: "Nostrand · Regular Oblique",
    url: "https://www.dropbox.com/scl/fi/rf8ln5lxmrsdlbkasif3v/Nostrand-RegularOblique.zip?rlkey=x3n7ya8yytneidra6zltsgq43&st=fa0aouw9&dl=1",
  },
  prod_UeHilIjKSTuuaJ: {
    name: "Nostrand · Medium",
    url: "https://www.dropbox.com/scl/fi/3kdagbloiluzl4u9uyc3g/Nostrand-Medium.zip?rlkey=odwlvciqzuygpip2hhgojum40&st=651xe9of&dl=1",
  },
  prod_UeHinzJhhlZMcb: {
    name: "Nostrand · Medium Oblique",
    url: "https://www.dropbox.com/scl/fi/twy1wgykwuedj57dpxqzn/Nostrand-MediumOblique.zip?rlkey=303tyk16ors3g6ow1kfpwt7ti&st=rhlmg2g9&dl=1",
  },
  prod_UeHj4w7NhdU2Rg: {
    name: "Nostrand · SemiBold",
    url: "https://www.dropbox.com/scl/fi/vqp7h5o1klxwla2n06vd0/Nostrand-SemiBold.zip?rlkey=fgyihjtis3mhgoe00esvb95i0&st=z224pjof&dl=1",
  },
  prod_UeHjo3E11aeJ4G: {
    name: "Nostrand · SemiBold Oblique",
    url: "https://www.dropbox.com/scl/fi/k9wit9ennvxdlj4t742ln/Nostrand-SemiBoldOblique.zip?rlkey=rg8b4xth4pzsp65segzual4b5&st=h6yedl0c&dl=1",
  },
  prod_UeHjV2QoaGp7aM: {
    name: "Nostrand · Bold",
    url: "https://www.dropbox.com/scl/fi/a5laikmi29fjefir6dg2d/Nostrand-Bold.zip?rlkey=ptsw2te5iqelezn60actocbmq&st=du1ttit6&dl=1",
  },
  prod_UeHjIdjc1yAlc6: {
    name: "Nostrand · Bold Oblique",
    url: "https://www.dropbox.com/scl/fi/id8ojs35065s1uigo88a9/Nostrand-BoldOblique.zip?rlkey=1juu99d4oa7pcmxmhn3nxvc73&st=s2w1j1j0&dl=1",
  },
  prod_UeHkdkTzmZmUvy: {
    name: "Nostrand · ExtraBold",
    url: "https://www.dropbox.com/scl/fi/zigynajtlf193qpi2ad78/Nostrand-ExtraBold.zip?rlkey=2dmnqd1zwn8fiuscm2e9ll5cq&st=36m93vci&dl=1",
  },
  prod_UeHkJqOz6t27sS: {
    name: "Nostrand · ExtraBold Oblique",
    url: "https://www.dropbox.com/scl/fi/80orvd64ra3l26v06tq0p/Nostrand-ExtraBoldOblique.zip?rlkey=tthgtot78n5r7qctdgxb40of6&st=0dhrauy9&dl=1",
  },
  prod_UeHkPkRHqpiPvM: {
    name: "Nostrand · Black",
    url: "https://www.dropbox.com/scl/fi/57cjh0zl9lej3p466xfcs/Nostrand-Black.zip?rlkey=jjsg0n1eavesjth7g6zz5rt4f&st=9sbq6ulz&dl=1",
  },
  prod_UeHkb6xJlbYx8U: {
    name: "Nostrand · Black Oblique",
    url: "https://www.dropbox.com/scl/fi/i5k40xh71fd92n6a8jr8a/Nostrand-BlackOblique.zip?rlkey=aic06nk17cn97atizy67dtedf&st=cgvj7u6v&dl=1",
  },

  // ─── MILKY BAR ───────────────────────────────────────────────────────────────
  prod_UYyo3NX7WRMdE8: {
    name: "Milky Bar · Full Family",
    url: "https://www.dropbox.com/scl/fi/kwjejkj8eh3atkt2aq7hg/MilkyBar-FullFamily.zip?rlkey=9glhenavq18p5nxmxsqetirqb&st=jwvy3lsj&dl=1",
  },
  prod_UeHbTj0CTFTkq6: {
    name: "Milky Bar · Normal (Soft + Sharp)",
    url: "https://www.dropbox.com/scl/fi/65f17agcuv2xt6o7bplvz/MilkyBar-Normal.zip?rlkey=u5hayhcg9efoxktgjji8z7efp&st=on0y2kc4&dl=1",
  },
  prod_UeHdGzumW1YMv1: {
    name: "Milky Bar · Oblique (Soft Oblique + Sharp Oblique)",
    url: "https://www.dropbox.com/scl/fi/5sc94bwok2tdemklk6xsg/MilkyBar-Oblique.zip?rlkey=5pw1yzpkfz23qxm5euhqukrdh&st=ik22etvu&dl=1",
  },
  prod_UeHd6aAMEpQg9w: {
    name: "Milky Bar · Soft",
    url: "https://www.dropbox.com/scl/fi/a9e4l38jci8kqiuuch7qh/MilkyBar-Soft.zip?rlkey=y4p7aluekixovu1rl20g6lnw9&st=09v7kgo3&dl=1",
  },
  prod_UeHeftJxobTD5W: {
    name: "Milky Bar · Soft Oblique",
    url: "https://www.dropbox.com/scl/fi/u0aabmrftri5u7j9bum33/MilkyBar-SoftOblique.zip?rlkey=k0zpgdce7cagrk36k5np0oqkg&st=e67s2m10&dl=1",
  },
  prod_UeHdW1YbQD9eUd: {
    name: "Milky Bar · Sharp",
    url: "https://www.dropbox.com/scl/fi/u82l27q3vbtlmxeo57muj/MilkyBar-Sharp.zip?rlkey=g7yb44embmxcyfw607411xdo8&st=dn0vkccw&dl=1",
  },
  prod_UeHdGqirSFaMsy: {
    name: "Milky Bar · Sharp Oblique",
    url: "https://www.dropbox.com/scl/fi/kvczzo99ixhariro4588f/MilkyBar-SharpOblique.zip?rlkey=rm3caj0nm7nr1n3gt19bckkup&st=1d40iv59&dl=1",
  },

  // ─── KIDCUT ──────────────────────────────────────────────────────────────────
  prod_UYyoaBaln9ZxEI: {
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

export const config = {
  api: {
    bodyParser: false,
  },
};
