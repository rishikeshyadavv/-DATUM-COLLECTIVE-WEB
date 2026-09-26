export interface GitHubRepoData {
  stars: number | null;
  latestRelease: {
    tag: string;
    name: string;
    url: string;
  } | null;
  contributors: {
    login: string;
    avatar_url: string;
    html_url: string;
    contributions: number;
  }[];
  languages: {
    name: string;
    percentage: number;
  }[];
  isLoading: boolean;
  error: string | null;
}

const CACHE_KEY = 'datum_github_data_cache';
const CACHE_TTL = 3600 * 1000; // 1 hour

// High quality static fallbacks for GitHub rate limits or offline states
const DEFAULT_FALLBACK: GitHubRepoData = {
  stars: 18,
  latestRelease: {
    tag: 'v0.1.12',
    name: 'RIFT Initial Core Release',
    url: 'https://github.com/Datum-Collective/RIFT-coding-agent/releases',
  },
  contributors: [
    {
      login: 'shiv207',
      avatar_url: 'https://avatars.githubusercontent.com/u/118673372?v=4',
      html_url: 'https://github.com/shiv207',
      contributions: 15,
    },
    {
      login: 'danvraz',
      avatar_url: 'https://avatars.githubusercontent.com/u/227579758?v=4',
      html_url: 'https://github.com/danvraz',
      contributions: 8,
    },
  ],
  languages: [
    { name: 'TypeScript', percentage: 76 },
    { name: 'Rust', percentage: 18 },
    { name: 'Shell', percentage: 6 },
  ],
  isLoading: false,
  error: null,
};

export async function fetchGitHubData(): Promise<GitHubRepoData> {
  // Check localStorage cache first
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_TTL) {
        return { ...parsed.data, isLoading: false, error: null };
      }
    }
  } catch (e) {
    // Ignore cache error
  }

  const repo = 'Datum-Collective/RIFT-coding-agent';
  let stars: number | null = DEFAULT_FALLBACK.stars;
  let latestRelease = DEFAULT_FALLBACK.latestRelease;
  let contributors: GitHubRepoData['contributors'] = DEFAULT_FALLBACK.contributors;
  let languages: GitHubRepoData['languages'] = DEFAULT_FALLBACK.languages;

  try {
    const [repoRes, releaseRes, contribRes, langRes] = await Promise.allSettled([
      fetch(`https://api.github.com/repos/${repo}`),
      fetch(`https://api.github.com/repos/${repo}/releases/latest`),
      fetch(`https://api.github.com/repos/${repo}/contributors`),
      fetch(`https://api.github.com/repos/${repo}/languages`),
    ]);

    if (repoRes.status === 'fulfilled' && repoRes.value.ok) {
      const data = await repoRes.value.json();
      if (typeof data.stargazers_count === 'number') {
        stars = data.stargazers_count;
      }
    }

    if (releaseRes.status === 'fulfilled' && releaseRes.value.ok) {
      const data = await releaseRes.value.json();
      if (data.tag_name) {
        latestRelease = {
          tag: data.tag_name || 'v0.1.12',
          name: data.name || data.tag_name || 'Latest Release',
          url: data.html_url || `https://github.com/${repo}/releases`,
        };
      }
    }

    if (contribRes.status === 'fulfilled' && contribRes.value.ok) {
      const data = await contribRes.value.json();
      if (Array.isArray(data) && data.length > 0) {
        contributors = data.map((c: any) => ({
          login: c.login,
          avatar_url: c.avatar_url,
          html_url: c.html_url,
          contributions: c.contributions,
        }));
      }
    }

    if (langRes.status === 'fulfilled' && langRes.value.ok) {
      const data = await langRes.value.json();
      const totalBytes = Object.values<number>(data).reduce((acc, bytes) => acc + bytes, 0);
      if (totalBytes > 0) {
        languages = Object.entries(data)
          .map(([name, bytes]) => ({
            name,
            percentage: Math.round(((bytes as number) / totalBytes) * 100),
          }))
          .filter((l) => l.percentage > 0)
          .slice(0, 5);
      }
    }

    const payload = {
      stars,
      latestRelease,
      contributors,
      languages,
    };

    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          timestamp: Date.now(),
          data: payload,
        })
      );
    } catch {
      // LocalStorage write error ignored
    }

    return {
      ...payload,
      isLoading: false,
      error: null,
    };
  } catch (err: any) {
    return {
      ...DEFAULT_FALLBACK,
      isLoading: false,
      error: err?.message || null,
    };
  }
}
