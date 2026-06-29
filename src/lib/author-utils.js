export function splitCommaDelimited(value) {
  return (value || '').split(',').map(part => part.trim()).filter(Boolean);
}

export function normalizeGitHubHandle(handle) {
  return (handle || '').trim().replace(/^@+/, '').toLowerCase();
}

export function extractPrimaryHandle(handle) {
  return splitCommaDelimited(handle)[0] || '';
}

export function getToolAuthors(data) {
  const handles = splitCommaDelimited(data.author_github).map(normalizeGitHubHandle).filter(Boolean);
  const names = handles.length > 1 ? splitCommaDelimited(data.author) : [(data.author || '').trim()].filter(Boolean);
  const authors = [];

  for (let i = 0; i < handles.length; i++) {
    const github = handles[i];

    authors.push({
      github,
      name: names[i] || github,
    });
  }

  return authors;
}
