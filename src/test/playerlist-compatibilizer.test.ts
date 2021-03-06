import { compatibilize } from "../playerlist-compatibilizer";

const playerlist = `foo vs bar\nbaz vs Bye #1\nBye #2 vs qux\nBye #3 vs Bye #4`;

describe("Playerlist Compatibilizer", () => {
    it("should not include byes", () => {
        for (let i = 0; i < 4; i++) {
            expect(compatibilize(playerlist)).not.toContain(`Bye #${i}`);
        }
    });
    it("should contain all the players", () => {
        expect(compatibilize(playerlist)).toEqual(["foo", "bar", "baz", "qux"]);
    });
});
