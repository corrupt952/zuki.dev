# Design identity

zuki.dev is one person's address on the web: who K@zuki. is, what they have done, what they offer, and where to reach them. Astro, Tailwind, and GitHub Pages are the parts; other sites are built from the same ones. The commitments below are what identify it. Every visual decision on the site follows from one of them, and a change that contradicts one is a change to this document first.

Read them as constraints on what the site may look like, not as a description of what it looks like today.

## A card, not a magazine

The site says one thing per page and says it once. Home is the card: a face, a name, one line. It carries no summary of the other pages, because the header already names them, and no contact or social links, because the footer already holds them and is in view on Home without scrolling.

Every other page is one subject laid out top to bottom. Nothing on a page previews, teases, or duplicates another page. A list item that has more to say opens in place, under its own row, rather than on a page of its own or in a dialog: a page for one item repeats the list's chrome around three sentences, and a dialog is a second surface on a page that has one.

Ruled out: destination rows or section summaries on Home; a hero paragraph; a sidebar; "featured" anything.

## Ink on a dark ground

The page is one dark ground, close to black, and everything on it is ink in a few strengths: foreground for what is read, muted for what is scanned, faint for what is only noticed. Hierarchy comes from size, weight, and ink strength, and from space between things. No element is raised: no box, no shadow, no gradient, no second background tone behind a block of content.

A line is drawn only where the eye would otherwise lose a row, such as between rows of a table, and it is a single faint line, never a frame.

Ruled out: cards with borders; bordered tables as decoration; boxes around form fields beyond a bottom line; ornamental monospace eyebrow labels; colored backgrounds behind sections.

## One accent, spent on meaning

The site has one accent color. It marks a state that means something — the affiliation that is current, the page that is open — and nothing else. Chrome, links at rest, and buttons at rest are ink. A link is known by its position and its hover, not by its color.

Ruled out: accent-colored links; accent-filled buttons as the default; a second accent; tag pills in color.

## A mark is a mark

Where a thing already has a mark the reader knows — GitHub, X, mail, Ko-fi — the mark is shown and no word is written beside it or instead of it. Where a thing has no such mark, a word is used and no icon is invented for it.

Ruled out: replacing the social icons with their names; an icon next to every navigation word; icon fonts for bullets.

## Chrome is quiet and complete

The header is the way around: the name, the pages, and the other language. The name is K@zuki., the one the site uses everywhere else; the domain is already in the address bar and is not repeated. The footer is the way out: contact, elsewhere, support. Both sit on the same ground as the content, separated by space rather than by a line, and neither floats over the content. Nothing is fixed to the viewport.

Ruled out: floating action buttons; a sticky header; a language selector as a form control; a mobile hamburger when the items fit on one line.

## Content stays, presentation changes

The words live in the locale files and do not change when the design does. A redesign changes how the same content is laid, sized, and spaced. Adding words to make a layout work is a content decision and is made separately.

Ruled out: writing new copy to fill a design; hiding existing content to fit one.

## Nothing moves unasked

At rest the page is still. A transition is short and happens only in response to hover or focus. Interaction that HTML and CSS can express is not written in JavaScript: a row that opens is a `details` element, and a folded archive is one too. The one script on the site opens the row a link pointed at, which HTML cannot do.

Ruled out: scroll-triggered animation; fades on load; parallax; a JavaScript language switcher.

## Both languages are one site

Every page exists in English and Japanese. Switching language keeps the page. The layout is designed for the longer of the two texts, so neither language gets a worse page.

Ruled out: a page that exists in one language only; a layout that wraps badly in Japanese.

## Tried and dropped

Recorded so the same idea is not built twice.

- Home with three destination rows (About, Work, Portfolio, each with a one-line note) below the name. Dropped on 2026-09-05: it duplicated the header and added copy that existed nowhere else.
- Social links as words on Home and in the footer instead of icons. Dropped the same day: a mark that already exists is not replaced by a word.
- Social marks on Home below the name, as the previous site had them. Dropped the same day: the footer shows the same marks on the same screen, so Home said it twice.
- A search field, category buttons, a count, and a clear button above the portfolio list. Dropped on 2026-09-05: eleven live items do not need tools; grouping by category and folding the archive says the same with none.
- A page per portfolio item, and a dialog in its place. Dropped the same day: see the card commitment.
- A Google Form on the Work page beside the mail address. Dropped on 2026-09-05: two ways to say the same thing, and the form was the one outbound POST on a site that otherwise only links.
- Copying Dirigo's shell — a raised content sheet on a darker desk with an 8 px gutter. Dropped the same day: Dirigo's model exists because one window holds many surfaces and one of them is live; a page with one subject has nothing to raise, so the sheet would be a frame, which is decoration.
