"use client";

import { Disclosure } from '@headlessui/react';
import { ChevronUp } from 'lucide-react';

export default function FAQSection() {
  const faqs = [
    {
      question: 'What is your cancellation policy?',
      answer: 'You can cancel your booking up to 4 hours before pick-up for a full refund. Cancellations within 4 hours are subject to a 50% fee.'
    },
    {
      question: 'Do you guarantee on-time service?',
      answer: 'Our professional drivers monitor flight statuses and traffic in real-time to ensure punctual arrivals and departures. Sometimes the landing time can due to unforeseen conditions, you can count us that we will be awaiting.'
    },
    {
      question: 'What happens if my flight lands early or gets delayed?',
      answer: 'We monitor your flight in real time. If you arrive early, we’ll adjust your pickup time and notify your driver—at no extra cost. If your flight is delayed, your driver will wait up to 120 minutes free of charge, and you’ll receive automatic updates so you can travel stress-free.'
    },
    {
      question: 'How do I request special assistance or child seats?',
      answer: 'You can add special assistance or child seat requests in the “Additional Notes” field during booking, and we’ll ensure the appropriate vehicle and equipment.'
    },
  ];

  return (
    <section id="faq" className="bg-[#1F1F1F] py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#BFA15B]">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Disclosure key={idx} defaultOpen={false}>
              {({ open }) => (
                <div className="bg-[#262626] rounded-lg border border-[#BFA15B]/60">
                  <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-left text-[#BFA15B] font-medium">
                    <span>{faq.question}</span>
                    <ChevronUp className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pb-4 text-[#BFA15B]/90">
                    {faq.answer}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
