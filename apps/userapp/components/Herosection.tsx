"use client";
import React from "react";
import {
  ArrowRight,
  PieChart,
  Hand,
  Touchpad,
  TrendingUp,
  Shield,
  Smartphone,
} from 'lucide-react';
import flash from "../assets/flash.png";

import { JetBrains_Mono } from "next/font/google";
import { motion, scale } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

function BenefitItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm shadow-xl transition-all duration-200"
    >
      <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-800/10 p-4 mb-6">
        <Icon className="h-8 w-8 text-indigo-600" />
      </div>
      <h3
        className={`${jetbrainsMono.className} text-xl font-semibold text-gray-900 mb-4`}
      >
        {title}
      </h3>
      <p className={`${jetbrainsMono.className} text-gray-600`}>
        {description}
      </p>
    </motion.div>
  );
}

function HowItWorksStep({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className={`${jetbrainsMono.className} w-12 h-12 rounded-lg bg-indigo-600/50 text-white flex items-center justify-center text-xl font-bold mb-4`}>
        {number}
      </div>
      <h3 className={`${jetbrainsMono.className} text-xl font-semibold text-gray-900 mb-2`}>{title}</h3>
      <p className={`${jetbrainsMono.className} text-gray-600`}>{description}</p>
    </div>
  );
}

function Herosection() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-indigo-200 via-blue-50 to-violet-200 ">
      <div className="text-center p-32">
        <h1
          className={`${jetbrainsMono.className} text-4xl md:text-4xl font-semibold`}
        >
          Your Smart Digital Wallet for Easy Payments
        </h1>
        <h2
          className={`${jetbrainsMono.className} text-4xl md:text-4xl p-5 font-bold text-purple-900`}
        >
          PAYVIA
        </h2>
        <span
          className={`${jetbrainsMono.className} text-medium md:text-medium p-10 text-gray-500`}
        >
          <span className="block leading-normal">
            Experience seamless fund management,
          </span>
          <span className="block leading-normal">
            expense tracking, and secure money transfers
          </span>
          <span className="block leading-normal">
            with PayVia - your all-in-one digital e-wallet solution.
          </span>
        </span>
        {/* div 1 */}
        <motion.div variants={containerVariants} className="p-10 mx-auto w-fit">
          <Link href="/auth">
            <button className={`${jetbrainsMono.className} group flex flex-row-reverse items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-4 text-lg font-medium text-white hover:from-indigo-500 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl`}>
              <ArrowRight />
              Get Started
            </button>
          </Link>
        </motion.div>
        {/* div 2 */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-20 items-center justify-items-center"
        >
          <motion.div
            className={`text-center text-indigo-800 ${jetbrainsMono.className}`}
            whileHover={{ scale: 1.15 }}
          >
            <Touchpad className="bg-indigo-200 rounded-lg p-4 h-16 w-16 mx-auto" />
            Instant Deposits
          </motion.div>
          <motion.div
            className={`text-center text-indigo-800 ${jetbrainsMono.className}`}
            whileHover={{ scale: 1.15 }}
          >
            <Smartphone className="bg-indigo-200 rounded-lg p-4 h-16 w-16 mx-auto" />
            Payments
          </motion.div>
          <motion.div
            className={`text-center text-indigo-800  ${jetbrainsMono.className}`}
            whileHover={{ scale: 1.15 }}
          >
            <PieChart className="bg-indigo-200 rounded-lg p-4 h-16 w-16 mx-auto" />
            Analytics
          </motion.div>
        </motion.div>

        {/* div 3 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-32"
        >
          <h2
            className={`${jetbrainsMono.className} text-3xl font-bold text-gray-900 mb-16`}
          >
            Why PayVia Stands Out
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <BenefitItem
              icon={TrendingUp}
              title="Fast Transactions"
              description="Experience the speed of instant transfers and payments, making your financial life smoother than ever."
            />
            <BenefitItem
              icon={Shield}
              title="Bank-Grade Security"
              description="Rest easy knowing your funds are protected by state-of-the-art encryption and multi-factor authentication."
            />
            <BenefitItem
              icon={PieChart}
              title="Intelligent Financial Insights"
              description="Gain valuable insights into your spending habits with our advanced analytics, helping you make smarter financial decisions."
            />
          </div>
        </motion.div>

        {/* div 4 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-32"
        >
          <h2 className={`${jetbrainsMono.className} text-3xl font-bold text-center text-gray-900 mb-16`}>
            How PayVia Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <HowItWorksStep
              number={1}
              title="Sign Up"
              description="Create your account in minutes with our simple and secure registration process."
            />
            <HowItWorksStep
              number={2}
              title="Add Funds"
              description="Easily transfer money from your bank account to your Payvia wallet."
            />
            <HowItWorksStep
              number={3}
              title="Start Transacting"
              description="Send money, make payments, and track your expenses with ease."
            />
          </div>
        </motion.div>

        {/* div 5 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-32 text-center"
        >
          <Link href="/auth">
            <button className={`${jetbrainsMono.className} group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 px-8 py-4 text-lg font-medium text-white hover:from-indigo-500 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl`}>
              Create Your Account
              <ArrowRight className="ml-2 h-6 w-6 transform transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
      );
}

export default Herosection;