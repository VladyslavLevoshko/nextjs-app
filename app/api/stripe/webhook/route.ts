// ...existing code...
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature") || "";
  const buf = Buffer.from(await request.arrayBuffer());

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return new Response(`Webhook Error: ${(err as Error).message}`, { status: 400 });
  }

  // Обработать успешные сессии Checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const postId = session.metadata?.postId;
    const buyerEmail = session.customer_email ?? session.customer_details?.email;

    // TODO: здесь обновите базу данных: пометить postId как купленный для пользователя
    // Пример: await db.markPostPurchased(postId, buyerEmail, session.payment_intent);
    console.log("Stripe webhook: checkout.session.completed", { postId, buyerEmail, session_id: session.id });
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
// ...existing code...