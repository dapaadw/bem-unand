// Quote every cell and neutralize spreadsheet formulas, including leading whitespace.
export function toCsvRow(row) {
  return row
    .map((value) => {
      let text = String(value ?? '');
      if (/^\s*[=+@-]/.test(text) || /^[\t\r\n]/.test(text)) text = "'" + text;
      return '"' + text.replace(/"/g, '""') + '"';
    })
    .join(',');
}

export function toCsv(rows) {
  return '\uFEFF' + rows.map(toCsvRow).join('\r\n');
}
