export interface FAQItem {
  question: string;
  keywords: string[];
  answer: string;
  category: 'pricing' | 'exams' | 'account' | 'features' | 'general';
}

export const faq: FAQItem[] = [
  // Pricing & Plans
  {
    question: "What are your pricing plans?",
    keywords: ["pricing", "cost", "price", "plans", "subscription", "payment"],
    answer: "We offer a Lifetime Access plan for $299 (one-time payment) that includes unlimited practice questions, mock tests, performance analytics, and all supported exams. This gives you lifetime access with no recurring fees.",
    category: "pricing"
  },
  {
    question: "Is there a free trial?",
    keywords: ["free", "trial", "demo", "test"],
    answer: "Yes! You can start with our free tier which includes limited practice questions and basic features to get familiar with the platform.",
    category: "pricing"
  },
  {
    question: "What payment methods do you accept?",
    keywords: ["payment", "credit card", "paypal", "billing"],
    answer: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal for secure payments.",
    category: "pricing"
  },

  // Exams Supported
  {
    question: "What exams do you support?",
    keywords: ["exams", "tests", "sat", "ucat", "step", "gmat", "supported"],
    answer: "We currently support SAT, UCAT, STEP, GMAT, and several other standardized tests. Each exam includes thousands of practice questions, mock tests, and detailed analytics.",
    category: "exams"
  },
  {
    question: "How many practice questions are available?",
    keywords: ["questions", "practice", "how many", "number"],
    answer: "Our platform includes thousands of practice questions across all supported exams, with new questions added regularly. Each question comes with detailed explanations and performance tracking.",
    category: "exams"
  },
  {
    question: "Are the questions similar to real exam questions?",
    keywords: ["real", "actual", "similar", "authentic", "quality"],
    answer: "Yes! Our questions are designed to closely match the format, difficulty, and style of actual exam questions. They're created by experts familiar with each exam format.",
    category: "exams"
  },

  // Account Issues
  {
    question: "I can't log in to my account",
    keywords: ["login", "password", "access", "account", "sign in"],
    answer: "Try resetting your password using the 'Forgot Password' link on the login page. If you continue having issues, please contact our support team at support@examprep.com.",
    category: "account"
  },
  {
    question: "How do I update my exam date?",
    keywords: ["exam date", "update", "change", "modify"],
    answer: "You can update your exam date in your Profile settings. Go to Profile > Exam Information and select your new target date. This will help us personalize your study plan.",
    category: "account"
  },
  {
    question: "How do I reset my password?",
    keywords: ["reset", "password", "forgot"],
    answer: "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. Check your spam folder if you don't see the email within a few minutes.",
    category: "account"
  },

  // Features
  {
    question: "What features are included in the dashboard?",
    keywords: ["dashboard", "features", "analytics", "tracking"],
    answer: "Your dashboard includes performance analytics, progress tracking, personalized study recommendations, mock test results, weak area identification, and study streak tracking.",
    category: "features"
  },
  {
    question: "How do mock tests work?",
    keywords: ["mock", "test", "simulation", "practice test"],
    answer: "Mock tests simulate real exam conditions with timed sections, authentic question formats, and detailed score reports. You'll get immediate feedback and performance analysis after completion.",
    category: "features"
  },
  {
    question: "Can I track my progress over time?",
    keywords: ["progress", "tracking", "improvement", "analytics"],
    answer: "Yes! Our analytics dashboard shows your performance trends, accuracy rates, time management, and improvement areas over time with detailed charts and insights.",
    category: "features"
  },

  // General
  {
    question: "How do I get started?",
    keywords: ["start", "begin", "onboarding", "first time"],
    answer: "After creating your account, select your target exam, set your exam date, and complete the diagnostic test. This helps us create a personalized study plan for you.",
    category: "general"
  },
  {
    question: "Is my data secure and private?",
    keywords: ["security", "privacy", "data", "safe"],
    answer: "Absolutely! We use industry-standard encryption and security measures to protect your data. We never share your personal information with third parties without your consent.",
    category: "general"
  },
  {
    question: "Can I use this on mobile devices?",
    keywords: ["mobile", "phone", "tablet", "responsive"],
    answer: "Yes! Our platform is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktop computers.",
    category: "general"
  }
];

export const findAnswer = (userQuestion: string): FAQItem | null => {
  const question = userQuestion.toLowerCase();
  
  // Find exact matches first
  const exactMatch = faq.find(item => 
    item.keywords.some(keyword => question.includes(keyword.toLowerCase()))
  );
  
  if (exactMatch) return exactMatch;
  
  // If no exact match, try partial matches
  const partialMatch = faq.find(item =>
    item.keywords.some(keyword => {
      const words = keyword.toLowerCase().split(' ');
      return words.some(word => question.includes(word));
    })
  );
  
  return partialMatch || null;
};