
export function parseDeleteImageErrorMessage(message: string): string {
  const i = message.indexOf("conflict:");
  return message.substring(i + 9, message.length - 3);
}