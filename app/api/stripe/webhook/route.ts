// ...existing code...
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
      const postIdStr = session.metadata?.postId;
      const userIdStr = session.metadata?.userId;
      const userId = Number(userIdStr);
      console.log("user id from metadata:", userId);
      const buyerEmail = session.customer_email ?? session.customer_details?.email;

      if (!postIdStr) {
        console.warn("Webhook: missing postId in session metadata", { sessionId: session.id });
        return new Response(JSON.stringify({ received: true }), { status: 200 });
      }
      if (!buyerEmail) {
        console.warn("Webhook: missing buyer email", { sessionId: session.id, postId: postIdStr });
        return new Response(JSON.stringify({ received: true }), { status: 200 });
      }

      const postId = Number(postIdStr);
      if (Number.isNaN(postId)) {
        console.warn("Webhook: invalid postId", postIdStr);
        return new Response(JSON.stringify({ received: true }), { status: 200 });
      }

      // Найти или создать пользователя
      let user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        const defaultName = buyerEmail.split("@")[0];
        user = await prisma.user.create({
          data: {
            email: buyerEmail,
            name: defaultName,
          },
        });
        console.log("Created user for buyer:", user.id, buyerEmail);
      }

      // Обновить пост: передать право владения (authorId) новому пользователю
      const post = await prisma.post.findUnique({ where: { id: postId } });
      if (!post) {
        console.warn("Webhook: post not found", postId);
        return new Response(JSON.stringify({ received: true }), { status: 200 });
      }
      await prisma.post.update({
        where: { id: postId },
        data: { authorId: userId },
      });

      console.log(`Post ${postId} transferred to user ${userId} (${buyerEmail})`);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error("Error handling stripe webhook:", err);
    return new Response(`Handler error: ${(err as Error).message}`, { status: 500 });
  } finally {
    // опционально: при долгоживущих процессах закрываем prisma
    // await prisma.$disconnect();
  }
}
// ...existing code...