import React, { useState } from 'react';
import { ArrowLeft, LockKeyhole, ShieldCheck } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import { login } from './auth';
import { LumaStudioLogo } from '../components/LumaStudioLogo';

interface AdminLoginProps {
  onSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const { t } = useLocale();
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pass)) {
      setError(false);
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-surface text-body selection:bg-crimson/30 selection:text-amber font-sans flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="p-8 sm:p-10 rounded-3xl bg-surface/90 backdrop-blur-xl border border-line card-shadow space-y-7 text-left">
          <div className="flex items-center justify-between">
            <LumaStudioLogo
              logoSrc="/assets/lumastudio-logo.png"
              size={30}
              className="w-8 h-8"
              showWordmark={true}
              wordmarkClassName="font-sans font-bold text-lg tracking-tight text-ink"
            />
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fill border border-line text-[10px] font-semibold text-amber">
              <ShieldCheck className="w-3.5 h-3.5" />
              {t('admin.loginTitle')}
            </span>
          </div>

          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-1.5">
              <h1 className="font-sans font-bold text-2xl text-ink">{t('admin.loginTitle')}</h1>
              <p className="text-sm text-muted leading-relaxed">{t('admin.loginSubtitle')}</p>
            </div>

            <div className="relative">
              <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-faint" />
              <input
                type="password"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                  setError(false);
                }}
                placeholder={t('admin.loginPlaceholder')}
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-fill border border-line hover:border-line-strong text-ink placeholder-field font-sans text-sm focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral/30 transition-all"
              />
            </div>

            {error && (
              <div className="px-3 py-2 rounded-xl bg-crimson/10 border border-crimson/30 text-amber text-[11px]">
                {t('admin.loginError')}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-b from-keycap to-keycap-dim hover:to-keycap-hover text-keycap-ink font-sans font-semibold text-xs tracking-tight transition-all active:scale-[0.99] cursor-pointer"
            >
              {t('admin.loginAction')}
            </button>

            <p className="text-[10px] text-faint leading-relaxed">{t('admin.loginHelp')}</p>
          </form>
        </div>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.location.pathname = '/';
          }}
          className="mt-6 inline-flex items-center gap-1.5 text-xs text-faint hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t('admin.backToSite')}
        </a>
      </div>
    </div>
  );
};