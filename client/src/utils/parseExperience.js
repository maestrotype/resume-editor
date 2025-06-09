export function parseExperience(raw = '') {
    const lines = raw
      .trim()
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  
    const isHeader = /^[A-Z][^\n]+\([^)]+\)$/.test.bind(/^[A-Z][^\n]+\([^)]+\)$/);
  
    const blocks = lines.reduce((acc, line) => {
      if (isHeader(line)) {
        if (acc.length === 0) {
          acc.push([line]);
        } else {
          acc.push([line]);
        }
      } else {
        if (acc.length === 0) {
          acc.push([line]);
        } else {
          acc[acc.length - 1].push(line);
        }
      }
      return acc;
    }, []);
  
    return blocks.map((lines) => {
      const filtered = lines.filter(l => l !== '');
      if (filtered.length < 4) return null;
  
      const [company, period, location, ...desc] = filtered;
      return {
        company,
        period,
        location,
        desc
      };
    }).filter(Boolean);
  }
  