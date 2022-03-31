import useSWRImmutable from "swr/immutable";

const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export interface TypeUseQuestionData {
  error: {
    message?: string;
    code?: string;
    details?: string | null;
    hint?: string;
  };
  amount?: number;
  mode?: "surah" | "juz";
  select?: number[];
  results?: {
    id: number;
    questionText: string;
    questionVerseId: number;
    options: { value: 1 | 0; option: string }[];
  }[];
}

export function useQuestionData(link: string) {
  const resp = useSWRImmutable(link, fetcher);

  const data: TypeUseQuestionData = resp.data;
  const error = resp.error;

  return {
    data,
    error,
  };
}

export interface TypeLastHistoryData {
  id: string;
  point: number;
  countTrue: number;
  countFalse: number;
  timeSecond: number;
  createdAt: string;
}

export function useLastHistory(link: string) {
  const resp = useSWRImmutable(link, fetcher);

  const data = resp.data;
  const error = resp.error;

  return {
    data,
    error,
  };
}

export interface TypeHistoryTodayData {
  sumTimeSecond: number;
  countTrain: number;
  sumPoint: number;
}

export function useHistoryToday(link: string) {
  const resp = useSWRImmutable(link, fetcher);

  const data = resp.data;
  const error = resp.error;

  return {
    data,
    error,
  };
}

export interface TypeSumHistory {
  data: {
    countTrain: number;
    sumPoint: number;
    sumTrue: number;
    sumFalse: number;
    sumTimeSecond: number;
  };
}

export interface TypePartHistory {
  data: {
    userId: string;
    id: number;
    point: number;
    countTrue: number;
    countFalse: number;
    timeSecond: number;
    createdAt: string;
  }[];
  isLastPage: boolean;
}

export function useSumHistory(link: string) {
  const resp = useSWRImmutable(link, fetcher);

  const data: TypeSumHistory = resp.data;
  const error = resp.error;

  return {
    data,
    error,
  };
}
