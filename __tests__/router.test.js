/**
 * @jest-environment jsdom
 */


import { expect, test, describe } from "@jest/globals"
import { pushToHistory } from "../scripts/router.js"

let stateTestNum = 6;

describe("pushToHistory State", () => {
    test("Home State", () => {
        pushToHistory("home", 0);
        expect(history.state.page).toBe(undefined);
    });

    test("Settings State", () => {
        pushToHistory("settings", 0);
        expect(history.state.page).toBe("settings");
    });

    test("Entry State", () => {
        pushToHistory("entry", 100);
        expect(history.state.page).toBe("entry100");
    });

    test("Home->Entry->Settings", () => {
        pushToHistory("entry", 1);
        expect(pushToHistory("settings", 0).state.page).toBe("settings"); 
    })
});

describe("pushToHistory Length Tests", () => {
    test("Nothing", () => {
        //base 1 + 3 prior pushes
        expect(history.length).toBe(stateTestNum);
    })

    test("1 push", () => {
        //base 1 + 4 prior pushes
        pushToHistory("entry", 1);
        expect(history.length).toBe(1 + stateTestNum);
    })

    test("10 push", () => {
        //base 1 + 5 prior pushes
        for (let i = 0; i< 10; i++){
            pushToHistory("entry", 1);
        }

        expect(history.length).toBe(1 + stateTestNum + 10);
    })
});
