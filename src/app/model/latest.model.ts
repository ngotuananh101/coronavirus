export interface Latest {
    provincestate: string;
    countryregion: string;
    lastupdate: string | "";
    location: Location;
    countrycode: Countrycode;
    confirmed: number;
    deaths: number;
    recovered: number;
}

class Location{
    lat!: number;
    lng!: number;
}
class Countrycode{
    iso2!: string;
    iso3!: string;
}