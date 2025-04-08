import type { Showing } from "~/types/showing";

export type Schedule = {
  id: number;
  name: string;
  public: boolean;
  owner: number;
  showings: Showing[];
  past_showings: Showing[];
};
