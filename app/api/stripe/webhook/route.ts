import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature") || "";
  const buf = Buffer.from(await request.arrayBuffer());
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Stripe signature verification failed:", (err as Error).message);
    return new Response(`Webhook Error: ${(err as Error).message}`, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const postId = Number(session.metadata?.postId);
      const userIdStr = session.metadata?.userId;
      const userId = Number(userIdStr);
      const buyerEmail = session.customer_email ?? session.customer_details?.email;
      const post = await prisma.post.findUnique({ where: { id: postId } });

      if (!postId) {
        console.warn("Webhook: missing postId in session metadata", { sessionId: session.id });
        return new Response(JSON.stringify({ received: true }), { status: 200 });
      }
      if (!buyerEmail) {
        console.warn("Webhook: missing buyer email", { sessionId: session.id, postId: postId });
        return new Response(JSON.stringify({ received: true }), { status: 200 });
      }
      if (Number.isNaN(postId)) {
        console.warn("Webhook: invalid postId", postId);
        return new Response(JSON.stringify({ received: true }), { status: 200 });
      }
      if (!post) {
        console.warn("Webhook: post not found", postId);
        return new Response(JSON.stringify({ received: true }), { status: 200 });
      }
      await prisma.post.update({
        where: { id: postId },
        data: { authorId: userId },
      });
    }
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    return new Response(`Handler error: ${(err as Error).message}`, { status: 500 });
  };
};
