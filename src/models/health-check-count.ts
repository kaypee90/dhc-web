export type HealthCheckCount = {
    label: string
    value: number
    count: number
}

export interface HealthCheckSummary {
    label: string;
    value: number;
    status: string;
    count: number;
  }
