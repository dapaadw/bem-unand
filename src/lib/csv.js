// Quote every cell and neutralize spreadsheet formulas, including leading whitespace.
export function toCsv(rows) {
  return '\uFEFF' + rows.map((row) => row.map((value) => {
    let text = String(value ?? '');
    if (/^\s*[=+@-]/.test(text) || /^[\t\r\n]/.test(text)) text = "'" + text;
    return '"' + text.replace(/"/g, '""') + '"';
  }).join(',')).join('\r\n');
}
