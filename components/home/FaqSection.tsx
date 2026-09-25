'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  HelpCircle, 
  Sparkles, 
  MessageCircle, 
  PhoneCall, 
  Globe2, 
  Check, 
  Sprout
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FaqItem {
  id: number;
  questionEn: string;
  questionHi: string;
  answerEn: {
    text?: string;
    points?: string[];
    footer?: string;
  };
  answerHi: {
    text?: string;
    points?: string[];
  };
}

/**
 * FaqSection component renders an interactive, bilingual (English & Hindi) Frequently Asked Questions accordion.
 */
export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1); // Open 1st question by default
  const [languageMode, setLanguageMode] = useState<'both' | 'en' | 'hi'>('both');

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const faqs: FaqItem[] = [
    {
      id: 1,
      questionEn: '🌱 How do I take care of my plants?',
      questionHi: '🌱 मैं अपने पौधों की देखभाल कैसे करूँ?',
      answerEn: {
        text: 'Healthy plants start with proper care. Here are a few simple tips that work for most indoor and outdoor plants:',
        points: [
          'Water your plant only when the soil feels dry. Avoid watering on a fixed schedule.',
          'Water thoroughly until excess water drains from the bottom of the pot, ensuring the roots receive enough moisture.',
          'Indoor plants generally need watering 1–2 times per week, depending on sunlight, temperature, and humidity.',
          'Feed your plants with Vermicompost once every month to keep them healthy and improve soil quality.',
          'For flowering plants, you can apply Power Grow, DAP, or NPK fertilizer every 15 days in the recommended quantity to encourage healthy growth and blooming.'
        ],
        footer: 'Different plants have different care requirements. If you\'re unsure, you can search the plant on our website, click on it, and view detailed care instructions.'
      },
      answerHi: {
        text: 'स्वस्थ पौधों के लिए सही देखभाल बहुत ज़रूरी है:',
        points: [
          'पौधे को तभी पानी दें जब मिट्टी सूखी महसूस हो। पानी देने का कोई तय फिक्स शेड्यूल न रखें।',
          'पानी हमेशा अच्छी तरह दें ताकि वह गमले के नीचे से ड्रेन हो जाए और जड़ों को पूरी नमी मिले।',
          'इनडोर पौधों को सामान्यतः सप्ताह में 1–2 बार पानी देना पर्याप्त होता है, लेकिन यह धूप और मौसम पर निर्भर करता है।',
          'पौधों को स्वस्थ रखने के लिए हर महीने एक बार वर्मी कम्पोस्ट (केंचुआ खाद) डालें।',
          'फूल वाले पौधों में हर 15 दिन में Power Grow, DAP या NPK उचित मात्रा में डाल सकते हैं।'
        ]
      }
    },
    {
      id: 2,
      questionEn: '🪴 What types of plants do you offer?',
      questionHi: '🪴 आपके पास किस प्रकार के पौधे उपलब्ध हैं?',
      answerEn: {
        text: 'We offer a wide range of indoor plants, outdoor plants, flowering plants, air-purifying plants, bonsai, succulents, fruit plants, seasonal plants, and decorative plants.'
      },
      answerHi: {
        text: 'हमारे पास इनडोर, आउटडोर, फूल वाले, एयर प्यूरिफाइंग, बोनसाई, सक्यूलेंट, फल वाले, मौसमी और सजावटी पौधों की विस्तृत रेंज उपलब्ध है।'
      }
    },
    {
      id: 3,
      questionEn: '🚚 Do you provide home delivery?',
      questionHi: '🚚 क्या आप होम डिलीवरी प्रदान करते हैं?',
      answerEn: {
        text: 'Yes. We provide home delivery for plants, pots, and gardening supplies in Pune areas. Contact us to check delivery availability in your location.'
      },
      answerHi: {
        text: 'हाँ। हम पुणे के चुनिंदा क्षेत्रों में पौधों, गमलों और गार्डनिंग सामग्री की होम डिलीवरी उपलब्ध कराते हैं। अपने क्षेत्र की जानकारी के लिए हमसे संपर्क करें।'
      }
    },
    {
      id: 4,
      questionEn: '🌳 Do you provide complete garden setup services?',
      questionHi: '🌳 क्या आप संपूर्ण गार्डन सेटअप सेवाएं प्रदान करते हैं?',
      answerEn: {
        text: 'Yes. We provide complete garden setup services for balconies, terraces, homes, offices, villas, and housing societies. Our service includes plant selection, decorative pots, stands, soil, fertilizers, and professional arrangement.'
      },
      answerHi: {
        text: 'हाँ। हम बालकनी, टैरेस, घर, ऑफिस, विला और सोसायटी के लिए संपूर्ण गार्डन सेटअप सेवा प्रदान करते हैं, जिसमें पौधे, गमले, स्टैंड, मिट्टी, खाद और प्रोफेशनल अरेंजमेंट शामिल है।'
      }
    },
    {
      id: 5,
      questionEn: '🌿 Do you provide regular garden maintenance?',
      questionHi: '🌿 क्या आप नियमित गार्डन मेंटेनेंस सेवा प्रदान करते हैं?',
      answerEn: {
        text: 'Yes. We offer regular garden maintenance services for homes, housing societies, offices, and commercial properties. Our maintenance includes pruning, fertilizing, cleaning, plant health checks, and seasonal care.'
      },
      answerHi: {
        text: 'हाँ। हम घरों, सोसायटी, ऑफिस और कमर्शियल प्रॉपर्टी के लिए नियमित गार्डन मेंटेनेंस सेवा प्रदान करते हैं, जिसमें कटाई-छंटाई, खाद, सफाई, पौधों की देखभाल और मौसमी रखरखाव शामिल है।'
      }
    },
    {
      id: 6,
      questionEn: '🌞 Can you help me choose the right plants?',
      questionHi: '🌞 क्या आप मुझे सही पौधे चुनने में मदद कर सकते हैं?',
      answerEn: {
        text: 'Absolutely. Based on your space, sunlight, budget, and maintenance preference, our experts will recommend the best plants for your home or office.'
      },
      answerHi: {
        text: 'बिल्कुल। आपकी जगह, धूप, बजट और देखभाल की आवश्यकता के अनुसार हमारी टीम आपके लिए सबसे उपयुक्त पौधों की सलाह देती है।'
      }
    },
    {
      id: 7,
      questionEn: '🪵 Do you sell pots, planters, and plant stands?',
      questionHi: '🪵 क्या आप गमले, प्लांटर्स और प्लांट स्टैंड बेचते हैं?',
      answerEn: {
        text: 'Yes. We offer ceramic pots, plastic pots, fiber planters, decorative planters, hanging pots, metal stands, wooden stands, and other gardening accessories.'
      },
      answerHi: {
        text: 'हाँ। हमारे पास सिरेमिक, प्लास्टिक, फाइबर, हैंगिंग पॉट्स, सजावटी प्लांटर्स, मेटल स्टैंड, वुडन स्टैंड और अन्य गार्डनिंग एक्सेसरीज़ उपलब्ध हैं।'
      }
    },
    {
      id: 8,
      questionEn: '🌼 Can I place a bulk order?',
      questionHi: '🌼 क्या मैं बल्क (बड़ी मात्रा में) ऑर्डर दे सकता हूँ?',
      answerEn: {
        text: 'Yes. We accept bulk orders for residential projects, corporate offices, hotels, schools, restaurants, events, and landscaping projects. Contact us for custom pricing.'
      },
      answerHi: {
        text: 'हाँ। हम रेजिडेंशियल प्रोजेक्ट, कॉर्पोरेट ऑफिस, होटल, स्कूल, रेस्टोरेंट, इवेंट और लैंडस्केपिंग प्रोजेक्ट के लिए बल्क ऑर्डर स्वीकार करते हैं। विशेष कीमत के लिए हमसे संपर्क करें।'
      }
    },
    {
      id: 9,
      questionEn: '📞 How can I contact your team?',
      questionHi: '📞 मैं आपकी टीम से कैसे संपर्क कर सकता हूँ?',
      answerEn: {
        text: 'You can contact us through phone, WhatsApp, email, or the contact form on our website. Our team will be happy to assist you with plant selection, garden setup, and maintenance services.'
      },
      answerHi: {
        text: 'आप फोन, व्हाट्सएप, ईमेल या हमारी वेबसाइट के संपर्क फ़ॉर्म के माध्यम से हमसे संपर्क कर सकते हैं। हमारी टीम पौधों के चयन, गार्डन सेटअप और मेंटेनेंस से संबंधित हर सहायता के लिए उपलब्ध है।'
      }
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-background-cream relative overflow-hidden border-t border-surface-default">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm font-semibold uppercase tracking-wider"
          >
            <HelpCircle className="w-4 h-4 text-emerald-600" /> Got Questions? We Have Answers
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-slate-600 text-sm sm:text-base leading-relaxed"
          >
            Find quick answers regarding plant care, garden setup, home delivery, and nursery services.
          </motion.p>
        </div>

        {/* Language Control Bar */}
        <div className="flex items-center justify-center bg-white p-3 sm:p-4 rounded-3xl border border-emerald-100 shadow-soft">
          {/* Language Switcher Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-full overflow-x-auto">
            <button
              onClick={() => setLanguageMode('both')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                languageMode === 'both'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇺🇸 English + 🇮🇳 हिंदी
            </button>
            <button
              onClick={() => setLanguageMode('en')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                languageMode === 'en'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English Only
            </button>
            <button
              onClick={() => setLanguageMode('hi')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                languageMode === 'hi'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिंदी में
            </button>
          </div>
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden shadow-soft ${
                    isOpen
                      ? 'border-primary ring-2 ring-primary/20 shadow-soft-lg'
                      : 'border-emerald-100/90 hover:border-emerald-300'
                  }`}
                >
                  {/* Question Header Button */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none select-none"
                  >
                    <div className="space-y-1">
                      {(languageMode === 'both' || languageMode === 'en') && (
                        <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 leading-snug">
                          {faq.questionEn}
                        </h3>
                      )}
                      {(languageMode === 'both' || languageMode === 'hi') && (
                        <p className={`font-body text-sm font-semibold text-emerald-800 ${languageMode === 'both' ? 'pt-0.5' : ''}`}>
                          {faq.questionHi}
                        </p>
                      )}
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-primary text-white rotate-180' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100 space-y-5 text-sm sm:text-base text-slate-700 font-body">
                          
                          {/* English Answer */}
                          {(languageMode === 'both' || languageMode === 'en') && (
                            <div className="space-y-3 bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100/80">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                <span>🇺🇸 English</span>
                              </div>
                              {faq.answerEn.text && (
                                <p className="leading-relaxed">{faq.answerEn.text}</p>
                              )}
                              {faq.answerEn.points && (
                                <ul className="space-y-2 pl-1">
                                  {faq.answerEn.points.map((pt, index) => (
                                    <li key={index} className="flex items-start gap-2.5 leading-relaxed text-sm">
                                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                                        ✓
                                      </span>
                                      <span>{pt}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {faq.answerEn.footer && (
                                <div className="p-3 rounded-xl bg-white border border-emerald-200/70 text-xs sm:text-sm text-emerald-900 font-medium flex items-center gap-2">
                                  <Sprout className="w-4 h-4 text-emerald-600 shrink-0" />
                                  <span>{faq.answerEn.footer}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Hindi Answer */}
                          {(languageMode === 'both' || languageMode === 'hi') && (
                            <div className="space-y-3 bg-amber-50/30 p-4 rounded-2xl border border-amber-100/80">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                <span>🇮🇳 हिंदी</span>
                              </div>
                              {faq.answerHi.text && (
                                <p className="leading-relaxed font-medium text-slate-800">{faq.answerHi.text}</p>
                              )}
                              {faq.answerHi.points && (
                                <ul className="space-y-2 pl-1">
                                  {faq.answerHi.points.map((pt, index) => (
                                    <li key={index} className="flex items-start gap-2.5 leading-relaxed text-sm">
                                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                                        ✓
                                      </span>
                                      <span>{pt}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
        </div>

        {/* Bottom CTA Card: Still Have Questions? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-primary via-emerald-900 to-secondary p-7 sm:p-9 text-white shadow-soft-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center md:text-left relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
              <Sparkles className="w-3.5 h-3.5" /> 💚 Still Have Questions?
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold">
              Our Gardening Experts Are Here To Help!
            </h3>
            <p className="font-body text-emerald-100 text-xs sm:text-sm leading-relaxed">
              Contact us today for personalized plant recommendations, garden setup, or maintenance assistance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto relative z-10 shrink-0">
            <a
              href="https://wa.me/918007634856?text=Hello%20Shivansh%20Rose%20Nursery,%20I%20have%20a%20question%20about%20plants!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="md"
                variant="secondary"
                className="w-full sm:w-auto shadow-md"
                icon={<MessageCircle className="w-4 h-4 text-emerald-800" />}
              >
                WhatsApp Consultation
              </Button>
            </a>
            <a href="tel:+918007634856" className="w-full sm:w-auto">
              <Button
                size="md"
                variant="outline"
                className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10"
                icon={<PhoneCall className="w-4 h-4 text-emerald-300" />}
              >
                Call Us Now
              </Button>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
