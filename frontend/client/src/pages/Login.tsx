import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { AlertIcon, CheckCircleIcon, NGXLogo, FMDQLogo, CSCSLogo, SECLogo } from '../components/icons/Icons';

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('adaeze.okonkwo@valualliance.com.ng');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation('/dashboard');
  };

  return (
    <div className="flex h-screen bg-gray-50 w-full font-sans">
      {/* Left Panel */}
      <div className="w-[40%] bg-navy-900 flex flex-col justify-between p-12 text-white">
        <div>
          <div className="mb-8">
            <img src="/logo.png" alt="ValuAlliance" className="h-12 brightness-0 invert mb-4" />
          </div>
          <p className="text-gold-400 text-sm tracking-wide uppercase">Enterprise Asset Management Platform</p>
          <div className="h-1 w-10 bg-gold-500 mt-6 mb-12 rounded-full"></div>

          <div className="space-y-6">
            {[
              "Regulatory-Grade Compliance & Audit Trails",
              "Real-Time Portfolio Valuation & NAV",
              "SEC-Compliant Reporting & Regulatory Returns"
            ].map((feature, i) => (
              <div key={i} className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-gold-500 mr-3 shrink-0 mt-0.5" />
                <p className="text-gray-200 text-sm leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex space-x-3 mb-6">
            <NGXLogo />
            <FMDQLogo />
            <CSCSLogo />
            <SECLogo />
          </div>
          <p className="text-xs text-gray-500">Powered by Qucoon Limited</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center items-center p-12 relative">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-2">Sign In</h2>
            <p className="text-sm text-gray-500">ValuAlliance Asset Management Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-xs text-gold-600 hover:underline">Forgot password?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all tracking-wider"
                required
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="remember" className="h-4 w-4 text-gold-500 focus:ring-gold-500 border-gray-300 rounded" />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                Remember this device
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-navy-900 hover:bg-navy-800 text-white font-medium rounded-md shadow hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-900"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 flex items-start p-3 bg-warning-bg rounded border border-warning/20">
            <AlertIcon className="w-4 h-4 text-warning mr-2 shrink-0 mt-0.5" />
            <p className="text-xs text-warning-700 font-medium">Multi-factor authentication required on first sign-in.</p>
          </div>
        </div>

        <div className="absolute bottom-8 text-center text-xs text-gray-400">
          <p>© 2026 ValuAlliance Asset Management Limited. All rights reserved.</p>
          <p>Regulated by the Securities & Exchange Commission Nigeria.</p>
        </div>
      </div>
    </div>
  );
}
