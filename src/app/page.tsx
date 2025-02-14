import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { toast } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Landing Page - ProjectZen",
  description:
    "ProjectZen | Welcome to the Landing Page of ProjectZen. Start managing your tasks today - Made With Love By Shardendu Mishra Using Next.js 15",
};

const LandingPage = () => {
  const handleGetStarted = () => {
    toast.success("Redirecting to Sign Up...");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Manage Your Tasks, Master Your Life</h2>
          <p className="mb-8 text-lg">
            Organize, prioritize, and achieve more with ProjectZen – your personal task management system.
          </p>
          <Link href="/sign-up">
            <button
              onClick={handleGetStarted}
              className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-xl font-semibold mb-2">Task Management</h4>
              <p className="text-gray-600">
                Create, update, and delete tasks easily. Stay organized and efficient.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-xl font-semibold mb-2">Project Organization</h4>
              <p className="text-gray-600">
                Categorize tasks into projects and track progress effortlessly.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-xl font-semibold mb-2">Calendar Integration</h4>
              <p className="text-gray-600">
                Visualize your tasks with an interactive calendar view.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-To-Action (CTA) Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to take control of your tasks?</h3>
          <p className="mb-8 text-lg">
            Join ProjectZen today and streamline your productivity.
          </p>
          <Link href="/sign-up">
            <button
              onClick={handleGetStarted}
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Sign Up Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
