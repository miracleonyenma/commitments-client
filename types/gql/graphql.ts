/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type ApiKey = {
  __typename?: 'ApiKey';
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<User>;
};

export type AuthData = {
  __typename?: 'AuthData';
  accessToken?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Commitment = {
  __typename?: 'Commitment';
  author: CommitmentAuthor;
  changes: CommitmentChanges;
  channels: Array<Scalars['String']['output']>;
  commitId: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  impact: Scalars['String']['output'];
  metadata: CommitmentMetadata;
  priority: Scalars['String']['output'];
  repository: CommitmentRepository;
  timestamp: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type CommitmentAuthor = {
  __typename?: 'CommitmentAuthor';
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CommitmentChange = {
  __typename?: 'CommitmentChange';
  fileName: Scalars['String']['output'];
  patch?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

export type CommitmentChanges = {
  __typename?: 'CommitmentChanges';
  files: Array<CommitmentChange>;
  stats?: Maybe<CommitmentStats>;
};

export type CommitmentFilter = {
  priority?: InputMaybe<Scalars['String']['input']>;
  repository?: InputMaybe<Scalars['String']['input']>;
};

export type CommitmentInput = {
  channels?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  impact?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CommitmentMetadata = {
  __typename?: 'CommitmentMetadata';
  branch: Scalars['String']['output'];
  compareUrl: Scalars['String']['output'];
};

export type CommitmentRepository = {
  __typename?: 'CommitmentRepository';
  fullName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type CommitmentStats = {
  __typename?: 'CommitmentStats';
  additions: Scalars['Int']['output'];
  deletions: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type CommitmentsData = {
  __typename?: 'CommitmentsData';
  data?: Maybe<Array<Commitment>>;
  meta?: Maybe<Meta>;
};

export type CreateMemberInput = {
  role: Scalars['String']['input'];
  teamId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  repository?: InputMaybe<RepositoryInput>;
  teamId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateTeamInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type Feed = {
  __typename?: 'Feed';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  metadata: FeedMetadata;
  project: Project;
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type FeedData = {
  __typename?: 'FeedData';
  data?: Maybe<Array<Feed>>;
  meta?: Maybe<Meta>;
};

export type FeedFilter = {
  type?: InputMaybe<Scalars['String']['input']>;
};

export type FeedMetadata = {
  __typename?: 'FeedMetadata';
  branch?: Maybe<Scalars['String']['output']>;
  commitments?: Maybe<Array<Commitment>>;
  compareUrl?: Maybe<Scalars['String']['output']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Member = {
  __typename?: 'Member';
  id: Scalars['ID']['output'];
  joinedAt?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  team: Team;
  user: User;
};

export type MemberData = {
  __typename?: 'MemberData';
  data?: Maybe<Member>;
  meta?: Maybe<Meta>;
};

export type Meta = {
  __typename?: 'Meta';
  limit?: Maybe<Scalars['Int']['output']>;
  page?: Maybe<Scalars['Int']['output']>;
  pages?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  createRole?: Maybe<Role>;
  deleteProject: Scalars['Boolean']['output'];
  deleteRole?: Maybe<Role>;
  deleteUser?: Maybe<User>;
  generateApiKey?: Maybe<ApiKey>;
  googleAuth?: Maybe<AuthData>;
  login?: Maybe<AuthData>;
  refreshToken: RefreshPayload;
  register?: Maybe<RegisterData>;
  requestPasswordReset?: Maybe<Scalars['Boolean']['output']>;
  resetPassword?: Maybe<Scalars['Boolean']['output']>;
  revokeApiKey?: Maybe<ApiKey>;
  sendOTP?: Maybe<Scalars['String']['output']>;
  updateCommitment: Commitment;
  updateProject: Project;
  updateUser?: Maybe<User>;
  verifyOTP?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateRoleArgs = {
  name: Scalars['String']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationGoogleAuthArgs = {
  code: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRequestPasswordResetArgs = {
  email: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationRevokeApiKeyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSendOtpArgs = {
  input: SendOtpInput;
};


export type MutationUpdateCommitmentArgs = {
  commitId: Scalars['String']['input'];
  input: CommitmentInput;
};


export type MutationUpdateProjectArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProjectInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationVerifyOtpArgs = {
  input: VerifyOtpInput;
};

export type Otp = {
  __typename?: 'OTP';
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  otp?: Maybe<Scalars['String']['output']>;
};

export type Pagination = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type PasswordResetToken = {
  __typename?: 'PasswordResetToken';
  expires: Scalars['String']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  token: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type Project = {
  __typename?: 'Project';
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  repository?: Maybe<Repository>;
  slug: Scalars['String']['output'];
  team?: Maybe<Team>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  visibility?: Maybe<Scalars['String']['output']>;
};

export type ProjectData = {
  __typename?: 'ProjectData';
  data?: Maybe<Array<Maybe<Project>>>;
  meta?: Maybe<Meta>;
};

export type ProjectFilter = {
  teamId?: InputMaybe<Scalars['ID']['input']>;
  teamSlug?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  apiKey?: Maybe<ApiKey>;
  apiKeys?: Maybe<Array<Maybe<ApiKey>>>;
  commitment?: Maybe<Commitment>;
  commitments: CommitmentsData;
  feed: FeedData;
  me?: Maybe<User>;
  otp?: Maybe<Otp>;
  otps?: Maybe<Array<Maybe<Otp>>>;
  project?: Maybe<Project>;
  projectBySlug?: Maybe<Project>;
  projects?: Maybe<ProjectData>;
  roles?: Maybe<Array<Maybe<Role>>>;
  user?: Maybe<User>;
  users?: Maybe<UserData>;
};


export type QueryApiKeyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCommitmentArgs = {
  commitId: Scalars['String']['input'];
};


export type QueryCommitmentsArgs = {
  filter?: InputMaybe<CommitmentFilter>;
  pagination?: InputMaybe<Pagination>;
};


export type QueryFeedArgs = {
  filter?: InputMaybe<FeedFilter>;
  pagination?: InputMaybe<Pagination>;
  projectId: Scalars['ID']['input'];
};


export type QueryOtpArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProjectArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProjectBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryProjectsArgs = {
  filter?: InputMaybe<ProjectFilter>;
  pagination?: InputMaybe<Pagination>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  pagination?: InputMaybe<Pagination>;
};

export type RefreshPayload = {
  __typename?: 'RefreshPayload';
  accessToken: Scalars['String']['output'];
};

export type RegisterData = {
  __typename?: 'RegisterData';
  user?: Maybe<User>;
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Repository = {
  __typename?: 'Repository';
  fullName: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type RepositoryInput = {
  fullName: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type SendOtpInput = {
  email: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type Team = {
  __typename?: 'Team';
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  members?: Maybe<Array<Member>>;
  name: Scalars['String']['output'];
  projects?: Maybe<Array<Project>>;
  slug: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type TeamData = {
  __typename?: 'TeamData';
  data?: Maybe<Team>;
  meta?: Maybe<Meta>;
};

export type UpdateMemberInput = {
  role?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  repository?: InputMaybe<RepositoryInput>;
};

export type UpdateTeamInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  emailVerified?: Maybe<Scalars['Boolean']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<Maybe<Role>>>;
  team?: Maybe<Team>;
  teams?: Maybe<Array<Maybe<Team>>>;
};

export type UserData = {
  __typename?: 'UserData';
  data?: Maybe<Array<Maybe<User>>>;
  meta?: Maybe<Meta>;
};

export type VerifyOtpInput = {
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};
