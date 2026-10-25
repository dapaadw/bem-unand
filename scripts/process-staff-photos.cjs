const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = 'C:/Users/HP/Downloads/FOTO_BEM_FH_UNAND_NOBG';
const TARGET_BASE = path.join(__dirname, '../public/uploads/departemen/staff');
const JSON_OUTPUT = path.join(__dirname, '../src/data/staff-data.json');

// Helper to create URL slug from text
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Convert ALL CAPS or messy capitalization to Proper Title Case
function toTitleCase(str) {
  return str
    .split(' ')
    .filter(Boolean)
    .map((word) => {
      if (word.toUpperCase() === 'BEM' || word.toUpperCase() === 'FH' || word.toUpperCase() === 'UNAND' || word.toUpperCase() === 'PSDM') {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

// Folder to Slug mapping
const FOLDER_TO_SLUG = {
  ADKESMA: 'departemen-advokasi-dan-kesejahteraan-mahasiswa',
  BIRKES: 'biro-kesekretariatan',
  BIRKEU: 'biro-keuangan',
  EKRAF: 'departemen-ekonomi-kreatif',
  HUBEKS: 'departemen-hubungan-eksternal',
  HUBIN: 'departemen-hubungan-internal',
  INTERNAL: 'departemen-hubungan-internal',
  IRJEN: 'inspektorat-jenderal',
  KORDEPT: 'kordept', // dynamic
  MEDKOM: 'kantor-medkominfo',
  POLHUK: 'departemen-politik-dan-hukum',
  PP: 'departemen-pemberdayaan-perempuan',
  PRESIDIUM: 'presidium',
  PSDM: 'departemen-pengembangan-sumber-daya-mahasiswa',
  SORAYA: 'departemen-seni-olahraga-dan-budaya',
  SOSMAS: 'departemen-sosial-masyarakat',
};

// Parse raw filename into name, role, and dept slug
function parseFile(fileName, folderName) {
  let raw = fileName.replace(/_nobg\.png$/i, '').replace(/\.png$/i, '').trim();

  // Remove zero-width spaces / invisible chars
  raw = raw.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();

  let name = '';
  let role = '';

  // Special cases
  if (fileName.includes('Praja Bakti Anugerah Kepala (Lembaga Inspektorat Jenderal)')) {
    name = 'Praja Bakti Anugerah';
    role = 'Kepala Lembaga Inspektorat Jenderal';
  } else if (fileName.includes('Ahmad Bareeq Javier( Kepala Bidang Relasi Eksternal Kampus)')) {
    name = 'Ahmad Bareeq Javier';
    role = 'Kepala Bidang Relasi Eksternal Kampus';
  } else if (fileName.includes('Nilla Azra Ramadhani (2)')) {
    return null; // duplicate file in PP folder, skip
  } else {
    // Standard patterns
    const parenMatch = raw.match(/^([^(]+)\s*\(([^)]+)\)$/);
    if (parenMatch) {
      name = parenMatch[1].trim();
      role = parenMatch[2].trim();
    } else if (raw.includes('_')) {
      const parts = raw.split('_');
      name = parts[0].trim();
      role = parts.slice(1).join(' ').trim();
    } else {
      const keywordMatch = raw.match(/^(.*?)(?:\s{2,}|\s+)(Kepala\b.*|Sekretaris\b.*|Staff\b.*|Koordinator\b.*)$/i);
      if (keywordMatch) {
        name = keywordMatch[1].trim();
        role = keywordMatch[2].trim();
      } else {
        name = raw;
        role = 'Staff';
      }
    }
  }

  // Clean role
  role = role.replace(/^(Kepala\s+)\(/i, '$1').replace(/\)$/, '').trim();
  role = role.replace(/\s+/g, ' ');

  // Clean name
  name = name.replace(/\s+/g, ' ').replace(/\(2\)$/, '').trim();
  if (name === name.toUpperCase()) {
    name = toTitleCase(name);
  }

  // Standardize role names
  if (/wakil adkesma/i.test(role) || /sekretaris departemen wakil/i.test(role)) {
    role = 'Sekretaris Departemen';
  }
  if (/Kepala Departemen adkesma/i.test(role)) {
    role = 'Kepala Departemen';
  }
  if (/Kepala\s+Biro Kesekretariatan/i.test(role)) {
    role = 'Kepala Biro Kesekretariatan';
  }
  if (/staff bidang olahraga/i.test(role)) {
    role = 'Staff Bidang Olahraga';
  }

  // Determine target department slug
  let deptSlug = FOLDER_TO_SLUG[folderName] || folderName.toLowerCase();
  if (folderName === 'KORDEPT') {
    if (/Pelayanan/i.test(role)) {
      deptSlug = 'kordept-pelayanan-pergerakan';
    } else if (/Relasi/i.test(role)) {
      deptSlug = 'kordept-relasi-pengembangan';
    } else if (/Pengabdian/i.test(role)) {
      deptSlug = 'kordept-pengabdian-kreatifitas';
    }
  }

  // Determine group and group order
  let group = 'staff';
  let groupTitle = 'Staff';
  let rank = 4; // 1: Kepala, 2: Sekretaris/Wakil, 3: Kabid, 4: Staff

  const roleLower = role.toLowerCase();
  if (roleLower.startsWith('kepala departemen') || roleLower.startsWith('kepala biro') || roleLower.startsWith('kepala kantor') || roleLower.startsWith('kepala lembaga') || roleLower.startsWith('ketua bem') || roleLower.startsWith('koordinator')) {
    group = 'pimpinan';
    groupTitle = 'Pimpinan';
    rank = 1;
  } else if (roleLower.startsWith('sekretaris') || roleLower.startsWith('wakil ketua')) {
    group = 'pimpinan';
    groupTitle = 'Pimpinan';
    rank = 2;
  } else if (roleLower.startsWith('kepala bidang')) {
    rank = 3;
    // Extract bidang name
    const bidangMatch = role.match(/Kepala Bidang\s+(.*)/i);
    const bidangName = bidangMatch ? bidangMatch[1].trim() : 'Bidang';
    group = 'bidang-' + slugify(bidangName);
    groupTitle = 'Bidang ' + bidangName;
  } else if (roleLower.startsWith('staff')) {
    rank = 4;
    // Extract bidang from staff role
    let bidangName = '';
    const staffBidangMatch = role.match(/Staff Bidang\s+(.*)/i);
    if (staffBidangMatch) {
      bidangName = staffBidangMatch[1].trim();
    } else {
      const staffGeneralMatch = role.match(/Staff\s+(.*)/i);
      if (staffGeneralMatch) {
        const potential = staffGeneralMatch[1].trim();
        // Ignore "Biro ..." or "Departemen ..." generic
        if (!potential.toLowerCase().startsWith('biro') && !potential.toLowerCase().startsWith('departemen')) {
          bidangName = potential;
        }
      }
    }

    if (bidangName) {
      group = 'bidang-' + slugify(bidangName);
      groupTitle = 'Bidang ' + bidangName;
    } else {
      group = 'staff-umum';
      groupTitle = 'Staff';
    }
  }

  // Presidium specific ordering
  if (folderName === 'PRESIDIUM') {
    if (/ketua bem$/i.test(role)) rank = 1;
    else if (/wakil ketua bem/i.test(role)) rank = 2;
    else if (/sekretaris kabinet/i.test(role)) rank = 3;
  }

  return {
    name,
    role,
    deptSlug,
    group,
    groupTitle,
    rank,
    originalFile: fileName,
    folderName,
  };
}

async function main() {
  console.log('--- Processing Staff Photos ---');
  if (!fs.existsSync(TARGET_BASE)) {
    fs.mkdirSync(TARGET_BASE, { recursive: true });
  }

  const staffByDept = {};
  const folders = fs.readdirSync(SOURCE_DIR);

  for (const folder of folders) {
    const folderPath = path.join(SOURCE_DIR, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      if (!file.toLowerCase().endsWith('.png')) continue;

      const parsed = parseFile(file, folder);
      if (!parsed) continue;

      const { name, role, deptSlug, group, groupTitle, rank } = parsed;
      if (!staffByDept[deptSlug]) {
        staffByDept[deptSlug] = [];
      }

      // Target path
      const deptTargetDir = path.join(TARGET_BASE, deptSlug);
      if (!fs.existsSync(deptTargetDir)) {
        fs.mkdirSync(deptTargetDir, { recursive: true });
      }

      const fileSlug = slugify(name) + '.png';
      const targetFilePath = path.join(deptTargetDir, fileSlug);
      const publicUrl = `/uploads/departemen/staff/${deptSlug}/${fileSlug}`;

      // Process with sharp:
      // 1. Trim transparent whitespace around subject
      // 2. Detect face centroid using skin-tone detection in upper 60% of person
      // 3. Frame and center face in the 600x600 circular avatar canvas
      // This ensures the face is centered, head has breathing room, and torso fills the bottom.
      const sourceFilePath = path.join(folderPath, file);
      try {
        const trimmedBuffer = await sharp(sourceFilePath).trim().toBuffer();
        const { data, info } = await sharp(trimmedBuffer).raw().toBuffer({ resolveWithObject: true });

        let totalSkin = 0;
        let sumY = 0;
        let sumX = 0;

        const maxScanY = Math.round(info.height * 0.6);
        for (let y = 0; y < maxScanY; y++) {
          for (let x = 0; x < info.width; x++) {
            const idx = (y * info.width + x) * 4;
            const a = data[idx + 3];
            if (a > 100) {
              const r = data[idx];
              const g = data[idx + 1];
              const b = data[idx + 2];
              if (r > 80 && g > 50 && b > 30 && r > g && g >= b && (r - g) >= 10 && (r - b) >= 15) {
                totalSkin++;
                sumY += y;
                sumX += x;
              }
            }
          }
        }

        const faceCenterY = totalSkin > 500 ? Math.round(sumY / totalSkin) : Math.round(info.height * 0.25);
        const faceCenterX = totalSkin > 500 ? Math.round(sumX / totalSkin) : Math.round(info.width * 0.5);

        // Target: Face center around y = 270 (optical center in circular avatar)
        // Headroom above top of head: ~80px
        const targetCenterY = 270;
        const targetHeadTop = 80;
        let scale = (targetCenterY - targetHeadTop) / Math.max(faceCenterY, 100);

        // Ensure torso reaches or exceeds 600px height so no bottom cutoff is visible
        const minScaleForBottom = (600 - targetHeadTop) / Math.max(info.height - faceCenterY, 100);
        scale = Math.max(scale, minScaleForBottom);

        const scaledWidth = Math.round(info.width * scale);
        const scaledHeight = Math.round(info.height * scale);

        const resizedPerson = await sharp(trimmedBuffer)
          .resize(scaledWidth, scaledHeight)
          .toBuffer();

        const targetLeft = Math.round(300 - (faceCenterX * scale));
        const targetTop = Math.round(targetCenterY - (faceCenterY * scale));

        const srcLeft = Math.max(0, -targetLeft);
        const srcTop = Math.max(0, -targetTop);
        const dstLeft = Math.max(0, targetLeft);
        const dstTop = Math.max(0, targetTop);

        const cropWidth = Math.min(scaledWidth - srcLeft, 600 - dstLeft);
        const cropHeight = Math.min(scaledHeight - srcTop, 600 - dstTop);

        const croppedPerson = await sharp(resizedPerson)
          .extract({
            left: srcLeft,
            top: srcTop,
            width: cropWidth,
            height: cropHeight,
          })
          .toBuffer();

        await sharp({
          create: {
            width: 600,
            height: 600,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          },
        })
        .composite([{
          input: croppedPerson,
          left: dstLeft,
          top: dstTop,
        }])
        .png({ quality: 90, compressionLevel: 8 })
        .toFile(targetFilePath);

        staffByDept[deptSlug].push({
          id: `staff-${deptSlug}-${slugify(name)}`,
          name,
          role,
          photoUrl: publicUrl,
          group,
          groupTitle,
          rank,
        });

        console.log(`[OK] ${deptSlug} -> ${name} (${role})`);
      } catch (err) {
        console.error(`[ERROR] Processing ${sourceFilePath}:`, err.message);
      }
    }
  }

  // Sort staff in each department by rank, group, then name
  for (const slug in staffByDept) {
    staffByDept[slug].sort((a, b) => {
      if (a.rank !== b.rank) return a.rank - b.rank;
      if (a.group !== b.group) return a.group.localeCompare(b.group);
      return a.name.localeCompare(b.name);
    });
  }

  // Save JSON
  fs.writeFileSync(JSON_OUTPUT, JSON.stringify(staffByDept, null, 2), 'utf-8');
  console.log(`\nSuccess! Processed staff data saved to ${JSON_OUTPUT}`);

  let totalStaff = 0;
  for (const slug in staffByDept) {
    console.log(`- ${slug}: ${staffByDept[slug].length} staff`);
    totalStaff += staffByDept[slug].length;
  }
  console.log(`Total staff processed: ${totalStaff}`);
}

main().catch(console.error);
