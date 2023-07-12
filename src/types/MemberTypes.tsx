export interface SpecificMemberInfo {
  id: string;
  member_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: null | string;
  date_of_birth: string;
  gender: string;
  url: string;
  times_topics_url: string;
  times_tag: string;
  govtrack_id: string;
  cspan_id: string;
  votesmart_id: string;
  icpsr_id: string;
  twitter_account: string;
  facebook_account: string;
  youtube_account: null | string;
  crp_id: string;
  google_entity_id: string;
  rss_url: null | string;
  in_office: boolean;
  current_party: string;
  most_recent_vote: string;
  last_updated: string;
  roles: Role[];
}

interface Role {
  congress: string;
  chamber: string;
  title: string;
  short_title: string;
  state: string;
  party: string;
  leadership_role: null | string;
  fec_candidate_id: string;
  seniority: string;
  district: string;
  at_large: boolean;
  ocd_id: string;
  start_date: string;
  end_date: string;
  office: string;
  phone: string;
  fax: null | string;
  contact_form: null | string;
  cook_pvi: null | string;
  dw_nominate: number;
  ideal_point: null | number;
  next_election: string;
  total_votes: number;
  missed_votes: number;
  total_present: number;
  senate_class: string;
  state_rank: string;
  lis_id: string;
  bills_sponsored: number;
  bills_cosponsored: number;
  missed_votes_pct: number;
  votes_with_party_pct: number;
  votes_against_party_pct: number;
  committees: Committee[];
  subcommittees: Subcommittee[];
}

interface Committee {
  name: string;
  code: string;
  api_uri: string;
  side: string;
  title: string;
  rank_in_party: number;
  begin_date: string;
  end_date: string;
}

interface Subcommittee extends Committee {
  parent_committee_id: string;
}

export interface SpecificMemberData {
  status: string;
  copyright: string;
  results: SpecificMemberInfo[]
}
export interface SpecificMemberProps {
  MemberData: SpecificMemberData;
}
