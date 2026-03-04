"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Mail, Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
]

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="h-px w-full bg-accent/40" />

      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10"
        aria-label="Main navigation"
      >
        <Link href="/" className="group flex flex-col leading-none select-none">
          <span className="font-serif text-2xl font-semibold tracking-tight text-foreground transition-opacity group-hover:opacity-75">
            P<span className="text-accent">k</span>asticP
          </span>
          <span className="mt-0.5 text-[10px] font-sans font-light uppercase tracking-[0.25em] text-muted-foreground transition-opacity group-hover:opacity-75">
            Plastic Surgery
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative font-sans text-sm font-light uppercase tracking-[0.15em] text-foreground/70 transition-colors hover:text-foreground
                  after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="https://www.instagram.com/nikolaipecheriaga/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram — @nikolaipecheriaga"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/60 transition-all duration-200 hover:border-accent hover:text-accent hover:scale-105"
          >
            <InstagramIcon className="h-[17px] w-[17px]" />
          </Link>

          <Link
            href="mailto:info@plasticp.com"
            aria-label="Send an email"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/60 transition-all duration-200 hover:border-accent hover:text-accent hover:scale-105"
          >
            <Mail className="h-[17px] w-[17px]" />
          </Link>

          <Link
            href="#contact"
            className="ml-2 inline-flex items-center gap-2 rounded-sm border border-foreground bg-foreground px-5 py-2 font-sans text-xs font-medium uppercase tracking-[0.15em] text-primary-foreground transition-all duration-200 hover:bg-transparent hover:text-foreground"
          >
            Book a consultation
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href="https://www.instagram.com/nikolaipecheriaga/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-8 w-8 items-center justify-center text-foreground/60 hover:text-accent transition-colors"
          >
            <InstagramIcon className="h-5 w-5" />
          </Link>
          <Link
            href="mailto:info@plasticp.com"
            aria-label="Email"
            className="flex h-8 w-8 items-center justify-center text-foreground/60 hover:text-accent transition-colors"
          >
            <Mail className="h-5 w-5" />
          </Link>
          <button
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center text-foreground transition-opacity hover:opacity-60"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-background/98 backdrop-blur-md`}
      >
        <ul className="flex flex-col divide-y divide-border px-6 pb-4" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3.5 font-sans text-sm font-light uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-4 pb-2">
            <Link
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center rounded-sm border border-foreground bg-foreground px-5 py-2.5 font-sans text-xs font-medium uppercase tracking-[0.15em] text-primary-foreground transition-all hover:bg-transparent hover:text-foreground"
            >
              Book a consultation
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

