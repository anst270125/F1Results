export interface Race {
    name: string;
    date: string;
    circuitName: string;
    location: string;
    results: Result[];
}

export interface Result {
    driver: string;
    position: string;
    points: string;
    constructorName: string;
}

