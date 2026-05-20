import { sendBookingRequestEmail } from '@/lib/server/email-nodemailer';

export async function POST(req) {
  try {
    const body = await req.json();

    const result = await sendBookingRequestEmail(body);

    if (result.success) {
      return Response.json({ success: true });
    } else {
      return Response.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Erreur API:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}