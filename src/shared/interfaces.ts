export interface IRepository {
    name: string;
    html_url: string;
    stargazers_count: number;
    owner: {
      login: string;
    };
}

export interface IBranch {
    name: string;
};

export interface IUserRepository {
    repo: string;
    username: string | undefined;
}

export interface IRepoList {
    repositories: IRepository[] | undefined;
    starredRepositories: IRepository[] | undefined;
    username: string | undefined;
}

export interface User {
    login: string;
    avatar_url: string;
}

export interface IError {
  data: string
}