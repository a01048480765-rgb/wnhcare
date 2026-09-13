/**
 * Utility to generate and download vCard (.vcf) for digital business card
 */
export function downloadVCard(options: {
  name: string;
  org: string;
  title: string;
  phone: string;
  email: string;
  note: string;
}) {
  const vCardLines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${options.name};;;;`,
    `FN:${options.name} (${options.org})`,
    `ORG:${options.org}`,
    `TITLE:${options.title}`,
    `TEL;TYPE=CELL,VOICE:${options.phone}`,
    `EMAIL;TYPE=INTERNET,WORK:${options.email}`,
    `NOTE:${options.note.replace(/\n/g, '\\n')}`,
    'END:VCARD',
  ];

  const vCardContent = vCardLines.join('\r\n');
  const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${options.org}_${options.name}_명함.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
