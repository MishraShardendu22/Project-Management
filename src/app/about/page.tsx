import React from 'react';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "About Us - ProjectZen",
  description:
    "Learn more about ProjectZen, our mission, vision, and the team behind this innovative personal task management system.",
};

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">About ProjectZen</h2>
          <p className="text-lg text-gray-700">
            At ProjectZen, we empower individuals to manage their tasks and projects effortlessly.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8">Our Mission</h3>
          <p className="text-gray-700 text-center max-w-2xl mx-auto">
            Our mission is to simplify task management and boost productivity by providing an intuitive and seamless platform that adapts to your unique workflow.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8">Our Story</h3>
          <p className="text-gray-700 text-center max-w-2xl mx-auto">
            Born from a passion for organization and innovation, ProjectZen was created by a team of dedicated individuals aiming to transform the way you handle daily tasks. Our journey is fueled by continuous improvement and user-centric design.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
