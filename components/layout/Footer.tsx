"use client";
// import { useEffect, useState } from "react";
import Link from "next/link";
import { FaInstagram, FaPinterest } from "react-icons/fa";

const navLinks = [
  { name: "Shop Fabrics", href: "/fabrics" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
];

const socialLinks = [
  { name: "Instagram", href: "#", icon: <FaInstagram size={24} /> },
  { name: "Pinterest", href: "#", icon: <FaPinterest size={24} /> },
];

export default function Footer() {
  // const [categories, setCategories] = useState<string[]>([]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const res = await fetch("/api/fabric-categories");
  //       const data = await res.json();
  //       setCategories(data);
  //     } catch (err) {
  //       console.error("Failed to fetch categories:", err);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  return (
    <footer className="bg-black text-white py-10 px-6 mt-20">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-xl font-bold mb-2">Weave & Way</h2>
          <p className="text-gray-100">
            Sustainable fabrics for conscious creators.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-100">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-green-900 transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Popular Fabrics</h3>
          {/* <ul className="space-y-1 text-gray-100">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/fabrics?category=${encodeURIComponent(category)}`}
                  className="hover:text-green-900 transition"
                >
                  {category.charAt(0).toUpperCase() +
                    category.slice(1).toLowerCase()}
                </Link>
              </li>
            ))}
          </ul> */}
        </div>
        <div className="flex flex-col items-start md:items-end md:pr-20">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <ul className="flex space-x-4 text-xl mt-2">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lime-400 transition"
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Weave & Way. All rights reserved.
      </div>
    </footer>
  );
}
