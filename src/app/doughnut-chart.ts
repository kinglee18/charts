export interface DoughnutChart {
    title: string;
    element1: Element;
    element2: Element;
    euroCurrency?: boolean;
}

interface Element {
    ammount: number;
    name: string;
    color: string;
}
