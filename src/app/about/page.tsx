/* eslint-disable @next/next/no-img-element */
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us - ProjectZen",
  description:
    "Learn more about ProjectZen, our mission, vision, and the team behind this innovative personal task management system.",
};

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ProjectZen About Section */}
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

      {/* About the Developer Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8">About the Developer</h3>
          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            <div className="flex-shrink-0 mb-6 md:mb-0">
              <img
                src="https://avatars.githubusercontent.com/u/175409658?v=4"
                alt="Shardendu Mishra"
                className="w-48 h-48 rounded-full object-cover mx-auto"
              />
            </div>
            <div className="text-gray-700 max-w-2xl">
              <h4 className="text-2xl font-bold mb-4">
                Shardendu Mishra – Full-Stack Developer &amp; Tech Enthusiast
              </h4>
              <p className="mb-4">
                Shardendu Mishra is a <strong>Computer Science Engineering student at IIIT Dharwad</strong> with a strong passion for technology, innovation, and problem-solving. As a <strong>full-stack developer</strong>, he specializes in <strong>GoLang, JavaScript, TypeScript, and C++</strong>, building robust and scalable applications.
              </p>
              <p className="mb-4">
                His expertise includes <strong>frontend development</strong> with <strong>React, Next.js, Zustand, Tailwind, and Astro</strong>, as well as <strong>backend development</strong> using <strong>GoLang (Gin, Fiber) and JavaScript/TypeScript (Express, Next.js)</strong>. With a solid foundation in <strong>Data Structures and Algorithms (DSA) using C++</strong>, he excels in solving complex technical challenges.
              </p>
              <ul className="list-disc ml-5">
                <li>
                  <strong>GitHub Profile</strong>:{" "}
                  <a
                    href="https://github.com/MishraShardendu22"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    MishraShardendu22
                  </a>
                </li>
                <li>
                  <strong>Vice President of Velocity</strong> (IIIT Dharwad&#39;s Dev Club) – Organizing hackathons, workshops, and mentoring fellow developers.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
