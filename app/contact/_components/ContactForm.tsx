"use client";

import { useState } from "react";
import FormField from "./FormField";

type FormStatus = "idle" | "loading" | "success" | "error";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<FormStatus>("idle");

  const isLoading = status === "loading";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      console.error("Email sending error:", error);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  const getButtonText = () => {
    if (status === "loading") return "Sending...";
    if (status === "success") return "Message Sent!";
    if (status === "error") return "Failed to Send";
    return "Send Message";
  };

  const getButtonClasses = () => {
    if (status === "success") return "bg-green-600";
    if (status === "error") return "bg-red-600";
    return "bg-black hover:bg-purple-900";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Name"
        id="name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <FormField
        label="Email"
        id="email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />

      <FormField
        label="Message"
        id="message"
        name="message"
        value={form.message}
        rows={5}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={isLoading || status === "success"}
        className={`w-full rounded-lg py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-70 ${getButtonClasses()}`}
      >
        {getButtonText()}
      </button>
    </form>
  );
}
