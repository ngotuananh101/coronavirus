export interface Chart{
    name: string;
    series: ChartSeries[];
}

export class ChartSeries{
    name!: string;
    value!: number;
}