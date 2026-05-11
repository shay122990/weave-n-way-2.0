import ContactInfo from "./_components/ContactInfo";
import ContactForm from "./_components/ContactForm";

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-white px-4 py-12 text-gray-800">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold">Get in Touch</h1>
        <p className="mx-auto max-w-xl text-gray-600">
          We’d love to hear from you — whether it’s about a project, a
          partnership, or a fabric you’ve fallen in love with.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}
