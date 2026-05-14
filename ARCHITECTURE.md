# Lumen Agora Architecture

This repository currently contains a zero-dependency prototype so the product shape can be tested immediately. The intended production direction is a modular web application that can later move to Next.js, PostgreSQL, Prisma, and a proper authentication layer.

## Product Modules

- **Discover Feed**: research cards, search, tags, field filters, bookmarking, likes.
- **Paper Graph**: DOI, arXiv, publisher links, code links, data links, and metadata imported from public scholarly sources.
- **Research Posts**: author guides, research notes, reproduction logs, and open questions.
- **Discussion**: comments, author replies, verified-only filters, reporting, and moderation.
- **Identity**: platform account, verified academic identity, community handle, and posting persona switcher.
- **Profiles**: student, researcher, lab, institution, and organization pages.
- **Opportunities**: RA, PhD, Postdoc, internship, visiting student, collaboration, and open-source research opportunities.
- **Messaging**: interest-based private conversations for collaboration and new research ideas.
- **Governance**: trust levels, moderation queues, audit logs, transparency reports, and community rules.

## Suggested Production Stack

- **Frontend and backend**: Next.js with TypeScript.
- **Database**: PostgreSQL.
- **ORM**: Prisma.
- **Authentication**: email login first, then ORCID, GitHub, Google, and academic or organization email verification.
- **Search**: PostgreSQL full-text search for MVP; Meilisearch or OpenSearch later.
- **Storage**: object storage for avatars and card images; no unauthorized paper PDF hosting.
- **Deployment**: Docker Compose for self-hosting; Vercel/Fly.io/Render for early hosted deployments.

## Initial Data Model

- `User`: private platform account and login identity.
- `Persona`: public posting identity, such as a verified real profile or community username.
- `IdentityVerification`: academic email, organization email, ORCID, GitHub, or other verification records.
- `Profile`: student, researcher, advisor, lab admin, or independent researcher profile.
- `Organization`: university, lab, company research group, institute, or nonprofit.
- `Paper`: normalized scholarly metadata and official source links.
- `ResearchCard`: lightweight feed unit for an original guide, note, question, or reproduction log.
- `Comment`: discussion attached to a card or paper.
- `Opportunity`: RA, PhD, Postdoc, internship, visiting student, collaboration, or project opening.
- `Conversation`: private thread initiated from shared research interest.
- `Report` and `ModerationAction`: abuse handling, governance, and accountability.

## MVP Milestones

1. Static prototype with discovery feed, details, profiles, opportunities, and messaging.
2. Real app scaffold with routing, components, and mock API.
3. PostgreSQL schema and migrations.
4. Email authentication and community handle.
5. DOI/arXiv metadata import.
6. Research card creation and detail pages.
7. Comments, bookmarks, likes, and verified-only filters.
8. Profiles, opportunities, and private collaboration messages.
