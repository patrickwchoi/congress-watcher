export interface BillInfo {
  bill_id: string;
  // other properties...
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
  latest_major_action: string;
}

export interface BillResult {
  num_results: number;
  offset: number;
  bills: BillInfo[];
}

export interface BillData {
  results: BillResult[];
}

export interface BillProps {
  bill: BillInfo;
}

export interface SpecificBillData {
  results: BillInfo[];
}
