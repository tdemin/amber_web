import { sortByAttrs } from "./sort";

type Record = {
    id: number;
    name: string;
};

const testData: Record[] = [
    { id: 1, name: "Beth" },
    { id: 2, name: "Anna" },
    { id: 3, name: "Roy" },
    { id: 4, name: "Amy" },
];
const sortedByName: Record[] = [
    { id: 2, name: "Anna" },
    { id: 4, name: "Amy" },
    { id: 1, name: "Beth" },
    { id: 3, name: "Roy" },
];
const sortedByID: Record[] = [
    { id: 1, name: "Beth" },
    { id: 2, name: "Anna" },
    { id: 3, name: "Roy" },
    { id: 4, name: "Amy" },
];
const testDataWithMultipleProps: Record[] = [
    { id: 2, name: "Beth" },
    { id: 1, name: "Beth" },
    { id: 3, name: "Roy" },
    { id: 3, name: "Amy" },
];
const sortedByMultipleProps: Record[] = [
    { id: 1, name: "Beth" },
    { id: 2, name: "Beth" },
    { id: 3, name: "Amy" },
    { id: 3, name: "Roy" },
];

describe("sort helpers on strict types", () => {
    it("generates an empty array in response to an empty array", () => {
        expect(sortByAttrs([])).toEqual([]);
    });
    it("sorts an array by a single property", () => {
        expect(sortByAttrs(testData, "name")).toEqual(sortedByName);
        expect(sortByAttrs(testData, "id")).toEqual(sortedByID);
    });
    it("sorts an array by multiple props", () => {
        expect(sortByAttrs(testDataWithMultipleProps, "name", "id")).toEqual(
            sortedByMultipleProps
        );
    });
});
