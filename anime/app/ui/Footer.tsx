import redditicon from "@/public/assets/icons8-reddit.svg";
import TelegramIcon from "@/public/assets/icons8-telegram.svg";
import discordicon from "@/public/assets/icons8-discord.svg";
import xicon from "@/public/assets/icons8-x.svg";
import Image from "next/image";
function Footer() {
  const footericons = [
    { name: "discord", href: "https://discord.com/", icon: discordicon },
    { name: "telegramicon", href: "https://telegram.com/", icon: TelegramIcon },
    { name: "redditicon", href: "https://reddit.com/", icon: redditicon },
    { name: "xicon", href: "https://x.com/", icon: xicon },
  ];
  return (
    <div>
      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <TelegramIcon className="w-6 h-6 text-blue-500 hover:text-blue-600" />
      </button>
    </div>
  );
}

export default Footer;

