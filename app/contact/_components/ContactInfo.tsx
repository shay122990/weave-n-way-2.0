import Image from "next/image";

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Contact Details</h2>

        <p>
          Email:{" "}
          <a
            href="mailto:demo.shay.dev@gmail.com"
            className="text-blue-500 hover:underline"
          >
            hello@weaveandway.com
          </a>
        </p>

        <p>
          Phone:{" "}
          <a href="tel:+971500000000" className="text-blue-500 hover:underline">
            +971 50 000 0000
          </a>
        </p>

        <p>Location: Dubai, United Arab Emirates</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Business Hours</h2>
        <p>Mon - Fri: 9am – 6pm</p>
        <p>Saturday: 10am – 4pm</p>
        <p>Sunday: Closed</p>
      </div>

      <div className="overflow-hidden rounded-xl shadow-md">
        <Image
          src="/contact/map.jpg"
          alt="Map showing Weave & Way location"
          width={600}
          height={400}
          className="h-auto w-full object-cover"
        />
      </div>
    </div>
  );
}
