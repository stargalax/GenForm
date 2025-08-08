"use server";

import { getForms } from "@/actions/getForms";
import { getUserSubscription } from "@/actions/userSubscription";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PricingPage from "@/components/PricingPage";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const HomePage = async () => {
  try {
    // Fetch the current logged-in user
    const user = await currentUser();

    // If no user is found, redirect to sign-in page
    if (!user) {
      redirect("/sign-in");
    }

    // Fetch forms created by the user
    const forms = await getForms();
    const totalNumberOfFormCreated = forms?.data?.length || 0;

    // Check if the user has an active subscription
    const isSubscribed = await getUserSubscription(user.id);

    // Return the homepage with data
    return (
      <div className="min-h-screen">
        {/* Hero Section with Background Pattern */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-32 w-80 h-80 rounded-full bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-3xl animate-pulse delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-3xl animate-pulse delay-1000"></div>
          </div>

          {/* Floating Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 text-blue-400/40 animate-bounce delay-300">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="absolute top-32 right-20 text-purple-400/40 animate-bounce delay-700">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
            <div className="absolute bottom-40 left-20 text-green-400/40 animate-bounce delay-500">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 grid items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20">
            <HeroSection
              totalForms={totalNumberOfFormCreated}
              isSubscribed={isSubscribed.isSubscribed}
            />
            
            {/* Feature Highlights - Why Choose GenForm.AI? */}
            <div className="w-full max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Why Choose GenForm.AI?</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Experience the future of form creation with our AI-powered platform</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Lightning Fast</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Create forms in seconds with AI</p>
                </div>
                
                <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">User Friendly</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Intuitive design for everyone</p>
                </div>
                
                <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Secure</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Enterprise-grade security</p>
                </div>
                
                <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 2v12a2 2 0 002 2h8a2 2 0 002-2V6M9 10h6M9 14h6" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Customizable</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Tailor forms to your needs</p>
                </div>
              </div>
            </div>

            <PricingPage userId={user.id} />
            <Footer />
          </div>
        </div>
      </div>
    );
  } catch (error: unknown) {
    // Handle error properly with type guard for the error object
    if (error instanceof Error) {
      console.error("Error in HomePage:", error.message);
    } else {
      console.error("An unknown error occurred");
    }

    // Show a fallback message when an error occurs
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">
          An error occurred. Please try again later.
        </p>
      </div>
    );
  }
};

export default HomePage;
