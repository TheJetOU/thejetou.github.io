import { getByeWins, getLosers, getUnplayedGames, getWinners, IMatchup, parsePlayerlist } from "../playerlist-manipulator";

const RAW_PLAYERLIST = `[user=1][B]foo[/B][/user] \u202Fvs\u202F [USER=1]bar[/USER]\nbaz vs [b]qux\nquux[/b] vs quuz\ncorge vs grault\ngarply vs Bye 1`;

const MATCHUPS: IMatchup[] = [
    {
        p1: "foo",
        p2: "bar",
        result: "win",
    },
    {
        p1: "baz",
        p2: "qux",
        result: "loss",
    },
    {
        p1: "quux",
        p2: "quuz",
        result: "win",
    },
    {
        p1: "corge",
        p2: "grault",
        result: "unplayed",
    },
    {
        p1: "garply",
        p2: "Bye 1",
        result: "bye",
    },
];

describe("Playerlist Manipulator", () => {
    describe("Parser", () => {
        it("should remove bold BBCode from players", () => {
            const matchups = parsePlayerlist(RAW_PLAYERLIST);
            expect(matchups[0].p1).toEqual("foo");
        });
        it("should remove uncapitalized bold BBCode from players", () => {
            const matchups = parsePlayerlist(RAW_PLAYERLIST);
            expect(matchups[1].p2).toEqual("qux");
        });
        it("should remove user BBCode from players", () => {
            const matchups = parsePlayerlist(RAW_PLAYERLIST);
            expect(matchups[0].p1).toEqual("foo");
        });
        it("should remove uncapitalized user BBCode from players", () => {
            const matchups = parsePlayerlist(RAW_PLAYERLIST);
            expect(matchups[0].p2).toEqual("bar");
        });
        it("should support splitting on U+202F", () => {
            const matchups = parsePlayerlist(RAW_PLAYERLIST);
            expect(matchups[0].p1).toEqual("foo");
            expect(matchups[0].p2).toEqual("bar");
        });
        describe("Wins/Losses", () => {
            it("should handle bold on the same line", () => {
                const matchups = parsePlayerlist(RAW_PLAYERLIST);
                expect(matchups[0].result).toEqual("win");
            });
            it("should handle bold on a new line", () => {
                const matchups = parsePlayerlist(RAW_PLAYERLIST);
                expect(matchups[1].result).toEqual("loss");
                expect(matchups[2].result).toEqual("win");
            });
        });
        it("should handle unplayed games", () => {
            const matchups = parsePlayerlist(RAW_PLAYERLIST);
            expect(matchups[3].result).toEqual("unplayed");
        });
        it("should handle unplayed games", () => {
            const matchups = parsePlayerlist(RAW_PLAYERLIST);
            expect(matchups[3].result).toEqual("unplayed");
        });
        it("should handle byes", () => {
            const matchups = parsePlayerlist(RAW_PLAYERLIST);
            expect(matchups[4].result).toEqual("bye");
        });
    });
    it("should get the correct winners", () => {
        const winners = getWinners(MATCHUPS);
        expect(winners).toEqual(["foo", "qux", "quux"]);
    });
    it("should get the correct losers", () => {
        const losers = getLosers(MATCHUPS);
        expect(losers).toEqual(["bar", "baz", "quuz"]);
    });
    it("should get the correct bye winners", () => {
        const byeWins = getByeWins(MATCHUPS);
        expect(byeWins).toEqual(["garply"]);
    });
    it("should get the correct unplayed games", () => {
        const unplayed = getUnplayedGames(MATCHUPS);
        expect(unplayed).toEqual(["corge vs grault"]);
    });
});
