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
  let stars: number | null = null;
  let latestRelease = null;
  let contributors: GitHubRepoData['contributors'] = [];
  let languages: GitHubRepoData['languages'] = [];

  try {
    const [repoRes, releaseRes, contribRes, langRes] = await Promise.allSettled([
      fetch(`https://api.github.com/repos/${repo}`),
      fetch(`https://api.github.com/repos/${repo}/releases/latest`),
      fetch(`https://api.github.com/repos/${repo}/contributors`),
      fetch(`https://api.github.com/repos/${repo}/languages`),
    ]);

    if (repoRes.status === 'fulfilled' && repoRes.value.ok) {
      const data = await repoRes.value.json();
      stars = data.stargazers_count ?? null;
    }

    if (releaseRes.status === 'fulfilled' && releaseRes.value.ok) {
      const data = await releaseRes.value.json();
      latestRelease = {
        tag: data.tag_name || '',
        name: data.name || data.tag_name || '',
        url: data.html_url || `https://github.com/${repo}/releases`,
      };
    }

    if (contribRes.status === 'fulfilled' && contribRes.value.ok) {
      const data = await contribRes.value.json();
      if (Array.isArray(data)) {
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
      stars: null,
      latestRelease: null,
      contributors: [],
      languages: [],
      isLoading: false,
      error: err?.message || 'Failed to fetch',
    };
  }
}
