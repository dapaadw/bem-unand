import { isWebOrLocalUrl } from './homeMedia.js';

export function isDepartmentHead(role) {
  return /^(kepala|ketua)(\s|$)/i.test(role?.trim() || '');
}

export function departmentContactUrl(value, type) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password) return false;
    if (type === 'whatsapp') return url.hostname === 'wa.me' && /^\/\d{8,15}\/?$/.test(url.pathname);
    return ['instagram.com', 'www.instagram.com'].includes(url.hostname) && /^\/[\w.]+\/?$/.test(url.pathname);
  } catch { return false; }
}

function optionalText(value) {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string') throw new Error('Isian teks tidak valid.');
  return value.trim() || null;
}
function requiredText(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} wajib diisi.`);
  return value.trim();
}
function photo(value) {
  const result = optionalText(value);
  if (result && !isWebOrLocalUrl(result)) throw new Error('Foto harus menggunakan URL http/https atau path lokal.');
  return result;
}
function payload(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Payload tidak valid.');
}

export function departmentProfile(body, existing = null) {
  try {
    payload(body);
    return { data: {
      name: requiredText(body.name === undefined ? existing?.name : body.name, 'Nama departemen'),
      photoUrl: photo(body.photoUrl === undefined ? existing?.photoUrl : body.photoUrl),
      description: optionalText(body.description === undefined ? existing?.description : body.description),
    } };
  } catch (error) { return { error: error.message }; }
}

export function departmentDetails(body) {
  try {
    payload(body);
    const data = {};
    if (body.staff !== undefined) {
      if (!Array.isArray(body.staff)) throw new Error('Daftar staf tidak valid.');
      data.staff = body.staff.map((staff) => {
        payload(staff);
        return { name: requiredText(staff.name, 'Nama staf'), role: requiredText(staff.role, 'Jabatan staf'), photoUrl: photo(staff.photoUrl), identity: optionalText(staff.identity), achievements: optionalText(staff.achievements) };
      });
    }
    if (body.proker !== undefined) {
      if (!Array.isArray(body.proker)) throw new Error('Daftar program kerja tidak valid.');
      data.proker = body.proker.map((program) => {
        payload(program);
        return { name: requiredText(program.name, 'Nama program kerja'), description: optionalText(program.description) };
      });
    }
    if (body.contact !== undefined) {
      if (body.contact === null) data.contact = null;
      else {
        payload(body.contact);
        const whatsappUrl = optionalText(body.contact.whatsappUrl);
        const instagramUrl = optionalText(body.contact.instagramUrl);
        if (whatsappUrl && !departmentContactUrl(whatsappUrl, 'whatsapp')) throw new Error('Gunakan link WhatsApp HTTPS wa.me dengan nomor internasional.');
        if (instagramUrl && !departmentContactUrl(instagramUrl, 'instagram')) throw new Error('Gunakan link profil Instagram HTTPS yang valid.');
        data.contact = whatsappUrl || instagramUrl ? { whatsappUrl, instagramUrl } : null;
      }
    }
    if (!Object.keys(data).length) throw new Error('Tidak ada detail yang dikirim.');
    return { data };
  } catch (error) { return { error: error.message }; }
}
