import nodemailer from 'nodemailer';

// Email notification for new Aspirasi submissions (PRD 5.2, Should Have).
// WhatsApp notification is intentionally NOT implemented here: a real WhatsApp
// Business API integration needs a paid/verified provider (Meta Cloud API,
// Twilio, etc.) — that's a funding/vendor decision for BEM to make, not
// something to silently bolt on with an unofficial library. See migration plan §5.
export async function sendAspirasiNotification(aspirasi) {
  if (process.env.ASPIRASI_NOTIFICATION_MODE === 'mock') {
    console.log('[mailer] Mock: notifikasi diproses tanpa mengirim email.');
    return;
  }
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ASPIRASI_NOTIFY_EMAIL } = process.env;

  if (!SMTP_HOST || !ASPIRASI_NOTIFY_EMAIL) {
    console.log('[mailer] SMTP belum dikonfigurasi, notifikasi aspirasi dilewati (data tetap tersimpan di DB).');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  await transporter.sendMail({
    from: SMTP_USER || 'no-reply@bemfhunand.local',
    to: ASPIRASI_NOTIFY_EMAIL,
    subject: `Aspirasi baru [${aspirasi.ticketCode}]: ${aspirasi.pihakDituju}`,
    text: [
      `Ticket: ${aspirasi.ticketCode}`,
      `Pengirim: ${aspirasi.isAnonymous ? 'Anonim' : (aspirasi.nama || '-')}`,
      `NIM: ${aspirasi.isAnonymous ? '-' : (aspirasi.nim || '-')}`,
      `Pihak dituju: ${aspirasi.pihakDituju}`,
      `Jenis pengajuan: ${aspirasi.jenisPengajuan}`,
      `Keluh kesah: ${aspirasi.keluhKesah || '-'}`,
      `Deskripsi: ${aspirasi.deskripsi}`,
      `Harapan: ${aspirasi.harapan || '-'}`,
      `Dikirim: ${aspirasi.createdAt.toLocaleString('id-ID')}`,
    ].join('\n'),
  });
}
