'use strict';

const FIELD_LABELS = {
  github: 'GitHub username for this author page',
  name: 'Display name',
  headline: 'Short headline',
  bio: 'Bio / intro',
  website_url: 'Website URL (optional)',
  links: 'Other links (optional)',
  notes: 'Notes or highlights (optional)',
  featured_groups: 'Featured tool groups (optional)',
};

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getField(body, label) {
  const text = body || '';
  const startRegex = new RegExp(`^### ${escapeRegExp(label)}\\s*$\\n?`, 'm');
  const startMatch = text.match(startRegex);
  if (!startMatch || startMatch.index === undefined) return '';

  const rest = text.slice(startMatch.index + startMatch[0].length);
  const nextLabels = Object.values(FIELD_LABELS)
    .filter((fieldLabel) => fieldLabel !== label)
    .map(escapeRegExp)
    .concat('Checklist');
  const nextRegex = new RegExp(`^### (?:${nextLabels.join('|')})\\s*$`, 'm');
  const nextMatch = rest.match(nextRegex);
  const value = nextMatch && nextMatch.index !== undefined ? rest.slice(0, nextMatch.index) : rest;

  return value.replace(/^_No response_$/gim, '').trim();
}

function normalizeHandle(value) {
  return String(value || '')
    .split(/\r?\n/)[0]
    .trim()
    .replace(/^@/, '')
    .replace(/^https:\/\/github\.com\//i, '')
    .split(/[/?#]/)[0]
    .toLowerCase();
}

function toolListsAuthor(toolMarkdown, handle) {
  const match = String(toolMarkdown || '').match(/^author_github:\s*["']?([^"'\r\n]+)["']?/m);
  if (!match) return false;
  const requested = normalizeHandle(handle);
  return match[1]
    .split(',')
    .map(normalizeHandle)
    .includes(requested);
}

function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

function parseLinks(raw) {
  const links = [];
  const invalid = [];

  for (const line of String(raw || '').split(/\r?\n/).map((value) => value.trim()).filter(Boolean)) {
    const match = line.match(/^(.+?)\s*[-–]\s*(https:\/\/\S+)$/);
    if (!match || !isHttpsUrl(match[2])) {
      invalid.push(line);
      continue;
    }
    links.push({ label: match[1].trim(), url: match[2].trim() });
  }

  return { links, invalid };
}

function parseNotes(raw) {
  return String(raw || '')
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/^[-*]\s*/, ''))
    .filter(Boolean);
}

function parseSections(raw, existingSlugs = new Set()) {
  const sections = [];
  const invalid = [];
  const unknownSlugs = [];

  for (const line of String(raw || '').split(/\r?\n/).map((value) => value.trim()).filter(Boolean)) {
    const match = line.match(/^(.+?):\s*(.+)$/);
    if (!match) {
      invalid.push(line);
      continue;
    }

    const title = match[1].trim();
    const requestedSlugs = match[2].split(',').map((slug) => slug.trim()).filter(Boolean);
    const toolSlugs = requestedSlugs.filter((slug) => existingSlugs.has(slug));
    unknownSlugs.push(...requestedSlugs.filter((slug) => !existingSlugs.has(slug)));

    if (title && toolSlugs.length) {
      sections.push({
        title,
        description: `${title} tools selected by the author.`,
        toolSlugs,
      });
    }
  }

  return { sections, invalid, unknownSlugs };
}

function parseAuthorClaim(body, existingSlugs = new Set()) {
  const linksResult = parseLinks(getField(body, FIELD_LABELS.links));
  const sectionsResult = parseSections(getField(body, FIELD_LABELS.featured_groups), existingSlugs);

  return {
    github: normalizeHandle(getField(body, FIELD_LABELS.github)),
    name: getField(body, FIELD_LABELS.name),
    headline: getField(body, FIELD_LABELS.headline),
    bio: getField(body, FIELD_LABELS.bio),
    website_url: getField(body, FIELD_LABELS.website_url),
    links: linksResult.links,
    notes: parseNotes(getField(body, FIELD_LABELS.notes)),
    sections: sectionsResult.sections,
    invalidLinks: linksResult.invalid,
    invalidSections: sectionsResult.invalid,
    unknownSlugs: sectionsResult.unknownSlugs,
  };
}

function validateAuthorClaim(claim, hasAcceptedTool) {
  const errors = [];
  if (!claim.github) errors.push('Missing GitHub username.');
  if (!claim.name) errors.push('Missing display name.');
  if (!claim.headline && !claim.bio) errors.push('Add a short headline or bio.');
  if (!hasAcceptedTool) errors.push('The claimed GitHub account has no accepted tools yet.');
  if (claim.website_url && !isHttpsUrl(claim.website_url)) errors.push('Website URL must be a valid https:// URL.');
  if (claim.invalidLinks.length) errors.push(`Invalid link line(s): ${claim.invalidLinks.join('; ')}`);
  if (claim.invalidSections.length) errors.push(`Invalid featured group line(s): ${claim.invalidSections.join('; ')}`);
  if (claim.unknownSlugs.length) errors.push(`Unknown featured tool slug(s): ${claim.unknownSlugs.join(', ')}`);
  return errors;
}

function yamlString(value) {
  return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function renderAuthorMarkdown(claim) {
  const lines = ['---', `github: ${yamlString(claim.github)}`];
  if (claim.name) lines.push(`name: ${yamlString(claim.name)}`);
  if (claim.headline) lines.push(`headline: ${yamlString(claim.headline)}`);
  if (claim.website_url) lines.push(`website_url: ${yamlString(claim.website_url)}`);
  if (claim.links.length) {
    lines.push('links:');
    for (const link of claim.links) {
      lines.push(`  - label: ${yamlString(link.label)}`);
      lines.push(`    url: ${yamlString(link.url)}`);
    }
  }
  if (claim.notes.length) {
    lines.push('notes:');
    for (const note of claim.notes) lines.push(`  - ${yamlString(note)}`);
  }
  if (claim.sections.length) {
    lines.push('sections:');
    for (const section of claim.sections) {
      lines.push(`  - title: ${yamlString(section.title)}`);
      lines.push(`    description: ${yamlString(section.description)}`);
      lines.push('    toolSlugs:');
      for (const slug of section.toolSlugs) lines.push(`      - ${yamlString(slug)}`);
    }
  }
  lines.push('---');
  if (claim.bio) lines.push(claim.bio);
  return `${lines.join('\n')}\n`;
}

module.exports = {
  FIELD_LABELS,
  getField,
  normalizeHandle,
  toolListsAuthor,
  parseAuthorClaim,
  validateAuthorClaim,
  renderAuthorMarkdown,
};
