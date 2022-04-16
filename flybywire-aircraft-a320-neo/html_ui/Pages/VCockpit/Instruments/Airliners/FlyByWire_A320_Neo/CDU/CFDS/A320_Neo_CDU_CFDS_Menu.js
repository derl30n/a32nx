class CDUCfdsMainMenu {
    static ShowPage(mcdu) {
        mcdu.activeSystem = 'CFDS';
        mcdu.setTemplate([
            ["CFDS", "1", "2"],
            [""],
            ["<LAST LEG REPORT[color]inop"],
            [""],
            ["<LAST LEG ECAM REPORT[color]inop"],
            [""],
            ["<PREVIOUS LEGS REPORT[color]inop"],
            [""],
            ["<AVIONICS STATUS"],
            [""],
            ["<SYSTEM REPORT / TEST"],
            ["", "", "POST"],
            ["*SEND[color]cyan", "PRINT*[color]inop", "FLT REP"]
        ]);

        mcdu.leftInputDelay[3] = () => mcdu.getDelaySwitchPage();
        mcdu.onLeftInput[3] = () => mcduPages.CFDSAvionicsMenuPage1.display(mcdu);

        mcdu.leftInputDelay[4] = () => mcdu.getDelaySwitchPage();
        mcdu.onLeftInput[4] = () => mcduPages.CFDSTestMenuPage1.display(mcdu);

        // PAGE SWITCHING
        mcdu.onPrevPage = () => mcduPages.CFDSMainMenuPage2.display(mcdu);
        mcdu.onNextPage = () => mcduPages.CFDSMainMenuPage2.display(mcdu);

    }

    static ShowPage2(mcdu) {
        mcdu.setTemplate([
            ["CFDS", "2", "2"],
            [""],
            ["<GMT/DATE INIT[color]inop"],
            [""],
            [""],
            [""],
            [""],
            [""],
            ["<PFR FILTER PROGRAM[color]inop"],
            [""],
            ["<PASSWORD CHANGE[color]inop"],
            [""],
            [""]
        ]);

        // PAGE SWITCHING
        mcdu.onPrevPage = () => mcduPages.CFDSMainMenuPage1.display(mcdu);
        mcdu.onNextPage = () => mcduPages.CFDSMainMenuPage1.display(mcdu);
    }
}
