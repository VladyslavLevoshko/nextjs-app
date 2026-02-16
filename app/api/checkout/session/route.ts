// ...existing code...
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postId, title, amount, buyerEmail } = body;

    if (!postId || !amount) {
      return new Response(JSON.stringify({ error: "postId and amount required" }), { status: 400 });
    }

    const serverSession = await getServerSession(authOptions);
    if (!serverSession) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const currentUserID = String(((serverSession.user as any)?.id) ?? "");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: process.env.STRIPE_CURRENCY ?? "usd",
            product_data: { name: title ?? `Post ${postId}` },
            unit_amount: Math.round(Number(amount) * 100),
          },
          quantity: 1,
        },
      ],
      metadata: { postId: String(postId), userId: currentUserID },
      customer_email: buyerEmail,
      success_url: `${process.env.NEXTAUTH_URL}/posts/${postId}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/posts/${postId}/cancel`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
  }
}
// ...existing code...