"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate environment variables
    if (!serviceID || !templateID || !publicKey) {
      toast.error("Service is not properly configured. Please try again later.");
      setLoading(false);
      return;
    }

    try {
      await emailjs.send(
        serviceID,
        templateID,
        {
          from_name: form.name,
          to_name: "Shardendu Mishra",
          from_email: form.email,
          to_email: "shardendumishra01@gmail.com",
          message: form.message,
        },
        publicKey
      );

      toast.success("Thank you for your message 😃");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("I didn't receive your message 😢");
      console.error("EmailJS Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="c-space my-20 mb-20" id="contact">
      {/* Comment: Added Toaster for react-hot-toast notifications */}
      <Toaster />
      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <div className="contact-container">
          <h3 className="head-text my-10">Let’s talk</h3>
          <p className="text-lg text-white-600 mt-3">
            Whether you’re looking to build a new website, improve your existing platform, or bring a unique project to life, I’m here to help.
          </p>

          <form onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
            <label className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="Ex: Shardendu Mishra"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="Ex: shardendumishra01@gmail.com"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input"
                placeholder="Write your thoughts here..."
              />
            </label>

            <button className="field-btn" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
