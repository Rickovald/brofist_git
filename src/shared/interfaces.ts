export interface Repository {
    name: string;
    html_url: string;
    stargazers_count: number;
    owner: {
      login: string;
    };
}