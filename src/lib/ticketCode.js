import { prisma } from './prisma';
import { randomInt } from 'node:crypto';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I to avoid confusion

function randomSegment(length) {
  let out = '';
  for (let i = 0; i < length; i++) {
    out += ALPHABET[randomInt(ALPHABET.length)];
  }
  return out;
}

// Generates a unique ASP-XXXX style code, retrying on the rare collision.
export async function generateTicketCode() {
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = `ASP-${randomSegment(12)}`;
    const existing = await prisma.aspirasi.findUnique({ where: { ticketCode: code } });
    if (!existing) return code;
  }
  throw new Error('Gagal membuat ticket code unik, coba lagi.');
}
