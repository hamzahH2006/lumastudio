import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Copy, Check, Calendar, MessageSquare, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { SiteSettings } from '../types';
import { useLocale } from '../i18n/LocaleContext';

interface ContactSectionProps {
  settings: SiteSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const { t } = useLocale();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectScope: t('scope.windows'),
    message: '',
    timeline: t('timeline.immediate')
  });

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(settings.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 850);
  };

  const projectScopes = [t('scope.windows'), t('scope.mobile'), t('scope.fullstack'), t('scope.performance')];
  const timelines = [t('timeline.immediate'), t('timeline.months'), t('timeline.quarter')];

  return (
    <section id="contact" className="py-24 relative z-10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-left mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-[#9c9c9d]">
            <span className="w-2 h-2 rounded-full bg-[#ff6b4a] animate-pulse" />
            <span>{t('contact.direct')}</span>
          </div>

          <h2 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
            {t('contact.title')}<span className="warm-gradient-accent">{t('contact.titleAccent')}</span>
          </h2>

          <p className="text-[#9c9c9d] max-w-2xl text-sm sm:text-base leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Direct Access & SLA Card */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className="relative rounded-2xl bg-[#07080a]/90 backdrop-blur-xl border border-white/[0.08] p-6 sm:p-8 space-y-6 overflow-hidden text-left"
              style={{
                boxShadow: '0 20px 50px -10px rgba(0,0,0,0.8), 0 0 30px -5px rgba(255, 47, 58, 0.08)'
              }}
            >
              {/* Subtle top highlight */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#ff6b4a] font-semibold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('contact.direct')}</span>
                </div>
                <h3 className="font-sans font-bold text-xl sm:text-2xl text-white mt-1">
                  {t('contact.directTitle')}
                </h3>
                <p className="text-[#9c9c9d] text-sm mt-2 leading-relaxed">
                  {t('contact.directBody')}
                </p>
              </div>

              {/* Email Card with Copy Trigger */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.16] transition-all flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-[#ff2f3a]/10 border border-[#ff6b4a]/30 flex items-center justify-center text-[#ff6b4a] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] text-[#848487]">{t('contact.primaryEmail')}</div>
                    <div className="text-xs sm:text-sm text-white font-medium truncate">
                      {settings.email}
                    </div>
                  </div>
                </div>

                <button
                  id="contact-copy-email-btn"
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-[#c8c8cb] hover:text-white text-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer shadow-sm"
                  title={t('contact.copy')}
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#ffb347]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t('contact.copied') : t('contact.copy')}</span>
                </button>
              </div>

              {/* SLA Badges */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3 text-[#c8c8cb]">
                  <Clock className="w-4 h-4 text-[#ff6b4a] shrink-0" />
                  <span>{t('contact.replyLatency')} <strong className="text-white">&lt; 12 Hours</strong></span>
                </div>
                <div className="flex items-center gap-3 text-[#c8c8cb]">
                  <ShieldCheck className="w-4 h-4 text-[#ffb347] shrink-0" />
                  <span>{t('contact.nda')}</span>
                </div>
                <div className="flex items-center gap-3 text-[#c8c8cb]">
                  <Calendar className="w-4 h-4 text-[#ff6b4a] shrink-0" />
                  <span>{t('contact.booking')}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#848487]">
                <span>{t('contact.timezone')}</span>
                <span>• {t('contact.remote')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation & Booking Form */}
          <div className="lg:col-span-7">
            <div
              className="relative rounded-2xl bg-[#07080a]/90 backdrop-blur-xl border border-white/[0.08] p-6 sm:p-8 space-y-6 overflow-hidden text-left"
              style={{
                boxShadow: '0 24px 60px -12px rgba(255, 47, 58, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.05)'
              }}
            >
              {/* Subtle top highlight */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#ff2f3a]/15 border border-[#ff6b4a]/30 flex items-center justify-center mx-auto text-[#ffb347]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-sans">{t('contact.submittedTitle')}</h3>
                  <p className="text-[#9c9c9d] text-sm max-w-md mx-auto leading-relaxed">
                    {t('contact.submittedBody', { name: formData.name, email: formData.email })}
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          projectScope: t('scope.windows'),
                          message: '',
                          timeline: t('timeline.immediate'),
                        });
                      }}
                      className="px-6 py-2.5 rounded-xl bg-white text-[#07080a] font-sans font-semibold text-xs cursor-pointer hover:bg-white/90 transition-all shadow-md"
                    >
                      {t('contact.sendAnother')}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Form Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                    <span className="text-white font-sans font-medium text-sm flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#ff6b4a]" />
                      <span>{t('contact.formTitle')}</span>
                    </span>
                    <span className="text-[10.5px] text-[#ffb347] tracking-wider uppercase">
                      {settings.studioName}
                    </span>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#9c9c9d]">{t('contact.nameLabel')}</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t('contact.namePlaceholder')}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.14] text-white placeholder-[#656567] font-sans text-sm focus:outline-none focus:border-[#ff6b4a] focus:ring-1 focus:ring-[#ff6b4a]/30 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-[#9c9c9d]">{t('contact.emailLabel')}</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t('contact.emailPlaceholder')}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.14] text-white placeholder-[#656567] font-sans text-sm focus:outline-none focus:border-[#ff6b4a] focus:ring-1 focus:ring-[#ff6b4a]/30 transition-all"
                      />
                    </div>
                  </div>

                  {/* Project Scope Pill Buttons */}
                  <div className="space-y-2">
                    <label className="text-xs text-[#9c9c9d]">{t('contact.scopeLabel')}</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {projectScopes.map((scope) => {
                        const isSelected = formData.projectScope === scope;
                        return (
                          <button
                            type="button"
                            key={scope}
                            onClick={() => setFormData({ ...formData, projectScope: scope })}
                            className={`px-3.5 py-2.5 rounded-xl font-sans text-xs text-left transition-all flex items-center justify-between cursor-pointer border ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#ff2f3a]/15 via-[#ff6b4a]/10 to-transparent border-[#ff6b4a]/50 text-white font-medium shadow-[0_0_15px_rgba(255,47,58,0.12)]'
                                : 'bg-white/[0.02] border-white/[0.06] text-[#9c9c9d] hover:text-white hover:bg-white/[0.04]'
                            }`}
                          >
                            <span>{scope}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#ffb347]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Timeline Pill Buttons */}
                  <div className="space-y-2">
                    <label className="text-xs text-[#9c9c9d]">{t('contact.timelineLabel')}</label>
                    <div className="flex flex-wrap gap-2">
                      {timelines.map((timeline) => {
                        const isSelected = formData.timeline === timeline;
                        return (
                          <button
                            type="button"
                            key={timeline}
                            onClick={() => setFormData({ ...formData, timeline: timeline })}
                            className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-[#ff6b4a]/15 border-[#ff6b4a]/40 text-white font-medium'
                                : 'bg-white/[0.02] border-white/[0.06] text-[#9c9c9d] hover:text-white'
                            }`}
                          >
                            {timeline}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project Details Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#9c9c9d]">{t('contact.messageLabel')}</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t('contact.messagePlaceholder')}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.14] text-white placeholder-[#656567] font-sans text-sm focus:outline-none focus:border-[#ff6b4a] focus:ring-1 focus:ring-[#ff6b4a]/30 transition-all resize-none leading-relaxed"
                    />
                  </div>

                  {/* Form Submission Action */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-[11px] text-[#848487]">
                      {t('contact.dispatchNote')}
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-b from-[#e6e6e6] to-[#cfcfcf] hover:from-white hover:to-[#e0e0e0] text-[#1c1c1e] font-sans font-semibold text-xs tracking-tight flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(255,255,255,0.12)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.2)] transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-[#1c1c1e] border-t-transparent rounded-full animate-spin" />
                          <span>{t('contact.submittingText')}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('contact.submitText')}</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};