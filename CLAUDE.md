PROJECT
betterleasehold.co.uk — static guidance site about the Right to Manage
for leaseholders in England and Wales. Owner has light programming
background, little web development experience. Prefers brief answers.
STACK
Astro 7.3.1, static output, directory URL format. Node 22. No database,
no server-side code, no framework beyond Astro. Self-hosted fonts via
@fontsource (IBM Plex Sans + Literata Variable). @astrojs/sitemap.
Windows machine, VS Code, cmd terminal.
REPO
github.com/flasher9/betterleasehold (private). Local folder is
~/Documents/BetterLeashold (spelling as-is). Single branch: main.
CONTENT MODEL
Guides are Markdown in src/content/guides/. Front matter is validated by
src/content.config.ts using zod: title, summary (max 200), step, order,
lawStatedAt (date), optional reviewedBy, sources (min 1, each with title,
url, licence of ogl-v3|legislation|other, optional note), draft.
THE BUILD FAILS if sources or lawStatedAt are missing — this is an
intentional editorial guard, do not weaken it.
licence ogl-v3 or legislation triggers automatic OGL attribution via
src/components/SourceList.astro.
PAGES
Four guides: eligibility, rtm-company, the-process, handover.
src/pages/index.astro (homepage), legislation.astro (law tracker),
right-to-manage/index.astro (pillar), right-to-manage/[...slug].astro
(renders guides), [page].astro (five policy placeholders: about, privacy,
terms, accessibility, contact — should be split into separate files when
real content is written).
Key components: ProcessRail (statutory timeline), EligibilityChecker
(six-question client-side screen, no data leaves the browser),
SiteHeader, SiteFooter, SourceList.
Design tokens at the top of src/styles/global.css. Palette is cool paper
and registry green; oxblood (--flag) is reserved exclusively for
statutory deadlines and risk.
HOSTING
Krystal shared cPanel. IMPORTANT: betterleasehold.co.uk is NOT the
primary domain. Another live website occupies public_html. Never target
public_html. Deploy only to betterleasehold.co.uk's own document root.
DEPLOYMENT
GitHub Actions: .github/workflows/deploy.yml. npm ci, npm run build,
then SamKirkland/FTP-Deploy-Action@v4.4.0 over FTPS, security strict,
local-dir ./dist/, using a restricted cPanel FTP account.
Secrets: FTP_SERVER (server hostname, not the domain), FTP_USERNAME,
FTP_PASSWORD.
public/.htaccess sets HSTS, a strict CSP (all 'self'), X-Frame-Options,
X-Content-Type-Options, Permissions-Policy, caching, 404 and -Indexes.
Any third-party script added later must be added to the CSP explicitly.
KNOWN ISSUE (may still be open)
cPanel created the FTP account with a home directory called deploy/,
so server-dir: ./ uploaded the site to /home/user/deploy/ instead of the
document root. Fix by recreating the FTP account with Directory set to
the real document root, or by setting server-dir to a relative path out
of the account home. Delete .ftp-deploy-sync-state.json from the wrong
folder afterwards.
LEGAL CONSTRAINTS
LEASE content is reusable under OGL v3 with attribution, no implied
endorsement, no misrepresentation — but NOT third-party material on
their pages, and NOT their logos. legislation.gov.uk is OGL. The RICS
Service Charge Residential Management Code is RICS copyright: cite and
link only, never reproduce or closely paraphrase.
Guides are drafts, not solicitor-reviewed. Do not present them as
verified. Site is not legal advice.
LAW AS AT SEPT 2026
LAFRA 2024 ss.49-52 in force 3 March 2025: non-residential limit for RTM
raised 25% to 50%; costs rules changed so each side normally bears its
own; RTM model articles amended. Draft Commonhold and Leasehold Reform
Bill published 27 Jan 2026, HCLG Committee reported 27 May 2026, King's
Speech 13 May 2026 confirmed introduction in the 2026-27 session. Law
Commission RTM recommendations are not in that Bill.
ROADMAP
Phase 1 guidance site (current). Phase 2 forum — buy Discourse, on a
VPS, subject to Online Safety Act duties. Phase 3 block management
toolkit on a VPS, holds personal data, UK GDPR applies. Phase 4
referrals directory. Krystal do not support production Node on cPanel,
so phases 2-3 go on a VPS at forum. and app. subdomains.
HOW TO HELP
Owner edits Markdown locally, checks with npm run dev, then
git add . / git commit -m / git push, which triggers the deploy.
When suggesting file changes, give the full path and the exact
replacement. Assume the local copy may have drifted from any version
you have seen; ask for current contents rather than assuming.
