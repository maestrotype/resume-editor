// utils/parseExperience.js

export function parseExperience(raw = '') {
    const lines = raw
      .trim()
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  
    const grouped = [];
    let current = [];
  
    lines.forEach(line => {
      const isNewEntry = /[A-Z].+\([^)]+\)/.test(line) || /\s-\s/.test(line);
  
      if (isNewEntry) {
        if (current.length) grouped.push(current);
        current = [line];
      } else {
        current.push(line);
      }
    });
  
    if (current.length) grouped.push(current);
  
    return grouped
      .map((lines) => {
        const filtered = lines.filter(l => l !== '');
        if (filtered.length < 2) return null;
        const [company, period, location, ...desc] = filtered;
        return {
          company,
          period,
          location,
          description: desc.join(' ').replace(/\s+/g, ' ').trim(),
        };
      })
      .filter(Boolean);
  }
  