export interface SeasonDataDTO {
    MRData: {
        SeasonTable: {
            Seasons: { season: string }[];
        }
    }
}

export interface SeasonDTO {
    MRData: {
        RaceTable: {
            Races: {
                Circuit: {
                    Location: {
                        locality: string;
                        country: string;
                    },
                    circuitName: string;
                };
                Results: {
                    number: string;
                    position: string;
                    points: string;
                    Constructor: {
                        name: string;
                    };
                    Driver: {
                        familyName: string;
                        givenName: string;
                    }
                }[];
                date: string;
                raceName: string;
            }[];
        }
    }
}

export interface StandingsDTO {
    MRData: {
        StandingsTable: {
            StandingsLists: {
                DriverStandings: {
                    position: string;
                    points: string;
                    Driver: {
                        familyName: string;
                        givenName: string;
                    },
                    Constructors: {
                        name: string;
                    }[]
                }[]
            }[];
        }
    }
}

export interface DriversDTO{
    MRData:{
        DriverTable:{
            Drivers:{
                familyName: string;
                givenName: string;
            }[]
        }
    }
}