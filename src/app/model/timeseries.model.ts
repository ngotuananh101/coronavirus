export interface Timeseries {
    countryregion: string;
    lastupdate: string;
    location: string[];
    countrycode: string[];
    timeseries: TimeseriesSeries[];
}

export class TimeseriesSeries {
    date!: string;
    value!: any;
}