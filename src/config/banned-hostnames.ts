export const bannedHostnames = [
  `facebook.com`,
  `google.com`,
  `youtube.com`,
  `instagram.com`,
  `pinterest.com`,
];

export function isUrlBanned(hostname: string) {
  for (let i = 0; i < bannedHostnames.length; i++) {
    const result = hostname
      .trim()
      .toLowerCase()
      .includes(bannedHostnames[i].toLowerCase());

    if (result) return true;
  }

  return false;
}
