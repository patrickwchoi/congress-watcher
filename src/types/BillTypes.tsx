export interface BillInfo {
  bill_id: string;
  bill_type: string;
  number: string;
  bill_uri: string;
  title: string;
  sponsor_title: string;
  sponsor_id: string;
  sponsor_name: string;
  sponsor_state: string;
  sponsor_party: string;
  sponsor_uri: string;
  gpo_pdf_uri: string;
  congressdotgov_url: string;
  govtrack_url: string;
  introduced_date: string;
  active: boolean;
  house_passage: string | null;
  senate_passage: string | null;
  enacted: string | null;
  vetoed: string | null;
  cosponsors: number;
  committees: string;
  committee_codes: string[];
  subcommittee_codes: string[];
  primary_subject: string;
  summary: string;
  summary_short: string;
  latest_major_action_date: string;
  latest_major_action: string;
}
interface SpecificBillInfo {
  bill_id: string;
  bill_slug: string;
  congress: string;
  bill: string;
  bill_type: string;
  number: string;
  bill_uri: string;
  title: string;
  short_title: string;
  sponsor_title: string;
  sponsor: string;
  sponsor_id: string;
  sponsor_uri: string;
  sponsor_party: string;
  sponsor_state: string;
  gpo_pdf_uri: string | null;
  congressdotgov_url: string;
  govtrack_url: string;
  introduced_date: string;
  active: boolean;
  last_vote: string | null;
  house_passage: string;
  senate_passage: string | null;
  enacted: string | null;
  vetoed: string | null;
  cosponsors: number;
  cosponsors_by_party: {
    [key: string]: number;
  };
  withdrawn_cosponsors: number;
  primary_subject: string;
  committees: string;
  committee_codes: string[];
  subcommittee_codes: string[];
  latest_major_action_date: string;
  latest_major_action: string;
  house_passage_vote: string;
  senate_passage_vote: string | null;
  summary: string;
  summary_short: string;
  versions: {
    status: string;
    title: string;
    url: string;
    congressdotgov_url: string;
  }[];
  actions: {
    id: number;
    chamber: string;
    action_type: string;
    datetime: string;
    description: string;
  }[];
  votes: any[];
}

export interface AmendmentInfo {
  amendment_number: string;
  slug: string;
  sponsor_title: string;
  sponsor: string;
  sponsor_id: string;
  sponsor_uri: string;
  sponsor_party: string;
  sponsor_state: string;
  introduced_date: string;
  title: string;
  congressdotgov_url: string;
  latest_major_action_date: string;
  latest_major_action: string;
}
export interface RelatedBillInfo{
  //first gives the related bill's info, then a list of the related bills
  congress: string;
  bill_id: string;
  bill_slug: string;
  bill_type: string;
  number: string;
  bill_uri: string;
  url_number: string;
  title: string;
  sponsor_title: string;
  sponsor_id: string;
  sponsor_name: string;
  sponsor_state: string;
  sponsor_party: string;
  sponsor_uri: string;
  introduced_date: string;
  number_of_cosponsors: number;
  committees: string;
  latest_major_action_date: string;
  latest_major_action: string;
  house_passage_vote: string | null;
  senate_passage_vote: string | null;
  related_bills: BillInfo[]; //not exactly BillInfo, but mostly the same
}
export interface CosponsorsInfo {
  cosponsor_id: string;
  name: string;
  cosponsor_title: string;
  cosponsor_state: string;
  cosponsor_party: string;
  cosponsor_uri: string;
  date: string;
}
export interface BillResult {
  num_results: number;
  offset: number;
  bills: BillInfo[];
}
export interface AmendmentResult {
  congress: string;
  bill_id: string;
  num_results: number;
  offset: number;
  amendments: AmendmentInfo[];
}
export interface CosponsorsResult {
  congress: string;
  bill: string;
  url_number: string;
  title: string;
  sponsor_title: string;
  sponsor_id: string;
  sponsor_name: string;
  sponsor_state: string;
  sponsor_party: string;
  sponsor_uri: string;
  introduced_date: string;
  number_of_cosponsors: number;
  committees: string;
  latest_major_action_date: string;
  latest_major_action: string;
  house_passage_vote: string | null;
  senate_passage_vote: string | null;
  cosponsors_by_party: {
    party: {
      id: string;
      cosponsors: string;
    }
  }[];
  cosponsors: CosponsorsInfo[];
}

export interface SearchBillData {
  //whats returned from api call
  results: BillResult[];
}

export interface AmendmentsData {
  //whats returned from api call
  results: AmendmentResult[];
}

export interface RelatedBillData {
  num_results: number;
  offset: number;
  results: RelatedBillInfo;
}
export interface SpecificBillData {
  results: SpecificBillInfo[];
}
export interface CosponsorsData {
  results: CosponsorsResult[];
}

export interface BillProps {
  bill: BillInfo;
}
export interface SpecificBillProps {
  bill: SpecificBillInfo;
}
export interface CosponsorsProps{
  cosponsors: CosponsorsInfo[];
}