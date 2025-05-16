const units = [
  '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen'
];

const tens = [
  '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

const scales = ['', 'thousand', 'million', 'billion', 'trillion'];

export function numberToWords(num: number): string {
  if (num === 0) return 'zero';
  if (num < 0) return 'minus ' + numberToWords(Math.abs(num));
  
  let words = '';
  
  for (let i = 0; num > 0; i++) {
    if (num % 1000 !== 0) {
      words = convertLessThanOneThousand(num % 1000) + ' ' + scales[i] + ' ' + words;
    }
    num = Math.floor(num / 1000);
  }
  
  return words.trim().replace(/\s+/g, ' ');
}

function convertLessThanOneThousand(num: number): string {
  if (num === 0) return '';
  
  let result = '';
  
  if (num >= 100) {
    result += units[Math.floor(num / 100)] + ' hundred ';
    num %= 100;
  }
  
  if (num >= 20) {
    result += tens[Math.floor(num / 10)] + ' ';
    num %= 10;
  }
  
  if (num > 0) {
    result += units[num] + ' ';
  }
  
  return result.trim();
}
