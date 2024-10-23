"use client";
import Link from "next/link";
import redditicon from "@/assets/icons8-reddit.svg";
import telegramicon from "@/assets/icons8-telegram.svg";
import discordicon from "@/assets/icons8-discord.svg";
import xicon from "@/assets/icons8-x.svg";
import Image from "next/image";

function Footer() {
  const footericons = [
    { name: "discord", href: "https://discord.com/", icon: discordicon },
    { name: "telegramicon", href: "https://telegram.com/", icon: telegramicon },
    { name: "redditicon", href: "https://reddit.com/", icon: redditicon },
    { name: "xicon", href: "https://x.com/", icon: xicon },
  ];
  return (
    <div>
      <Link href="/dashboard">
        <Image src={icon} alt=""></Image>
      </Link>
    </div>
  );
}

export default Footer;

