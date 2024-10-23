import Redditicon from "@/public/assets/icons8-reddit.svg";
import TelegramIcon from "@/public/assets/icons8-telegram.svg";
import Discordicon from "@/public/assets/icons8-discord.svg";
import Xicon from "@/public/assets/icons8-x.svg";
import Link from "next/link";
import Logo from "@/public/assets/logo.jpeg";

import Image from "next/image";
function Footer() {
  const footericons = [
    { name: "discord", href: "https://discord.com/", icon: Discordicon },
    { name: "telegramicon", href: "https://telegram.com/", icon: TelegramIcon },
    { name: "redditicon", href: "https://reddit.com/", icon: Redditicon },
    { name: "xicon", href: "https://x.com/", icon: Xicon },
  ];
  return (
    <div className="bg-black py-4">
      <div className="flex items-center">
        <h2 className="font-bold text-lg text-white px-4">Join Us Now</h2>
        {footericons.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              href={item.href}
              key={item.name}
              className="flex justify-center items-center h-16 w-16 rounded-full bg-white mx-4" // Increased circle size
            >
              <Icon className="h-12 w-12 object-contain text-black" />{" "}
              {/* Adjusted icon size */}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Footer;