'use client'

import Link from 'next/link'
import { Mail, LogIn } from 'lucide-react'

type Props = {
  variant?: 'desktop' | 'mobile' | 'footer'
  showAuthText?: boolean
}

export default function Socials({ variant = 'desktop', showAuthText }: Props) {
  const classes = {
    desktop:
      'flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/60 transition-all duration-200 hover:border-accent hover:text-accent hover:scale-105',
    mobile:
      'flex h-8 w-8 items-center justify-center text-foreground/60 hover:text-accent transition-colors',
    footer: 'text-gray-500 hover:text-gray-900',
  }

  const itemClass = classes[variant]

  return (
    <div
      className={
        variant === 'footer'
          ? 'flex items-center gap-3'
          : 'flex items-center gap-3'
      }
    >
      <Link
        href="https://www.instagram.com/nikolaipecheriaga/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={itemClass}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={variant === 'mobile' ? 'h-5 w-5' : 'h-4.25 w-4.25'}
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle
            cx="17.5"
            cy="6.5"
            r="0.8"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      </Link>

      <Link
        href="mailto:info@plasticp.com"
        aria-label="Email"
        className={itemClass}
      >
        <Mail className={variant === 'mobile' ? 'h-5 w-5' : 'h-4.25 w-4.25'} />
      </Link>

      <Link
        href="/auth/login"
        aria-label="Авторизація"
        className={
          variant === 'footer'
            ? 'ml-1 text-xs uppercase tracking-[0.12em] text-gray-500 hover:text-gray-900 flex items-center gap-2'
            : itemClass
        }
      >
        <LogIn className={variant === 'mobile' ? 'h-5 w-5' : 'h-4.25 w-4.25'} />
        {variant === 'footer' && showAuthText ? <span>Авторизація</span> : null}
      </Link>
    </div>
  )
}
