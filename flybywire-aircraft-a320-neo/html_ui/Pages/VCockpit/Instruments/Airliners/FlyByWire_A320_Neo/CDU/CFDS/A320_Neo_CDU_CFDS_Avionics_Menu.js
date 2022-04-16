class CDUCfdsAvionicsMenu {
    static ShowPage(mcdu) {
        mcdu.setTemplate([
            ["AVIONICS STATUS", "1", "2"],
            [""],
            ["NO GPCU DATA"],
            [""],
            ["ADF 1 (CLASS 3)"],
            [""],
            ["FMGC"],
            [""],
            ["VHF"],
            [""],
            ["AIDS"],
            [""],
            ["<RETURN[color]cyan", "PRINT*[color]inop"]
        ]);

        mcdu.leftInputDelay[5] = () => mcdu.getDelaySwitchPage();
        mcdu.onLeftInput[5] = () => mcduPages.CFDSMainMenuPage1.display(mcdu);

        // PAGE SWITCHING
        mcdu.onPrevPage = () => mcduPages.CFDSAvionicsMenuPage2.display(mcdu);
        mcdu.onNextPage = () => mcduPages.CFDSAvionicsMenuPage2.display(mcdu);
    }

    static ShowPage2(mcdu) {
        mcdu.setTemplate([
            ["AVIONICS STATUS", "2", "2"],
            [""],
            ["NO ILS DATA"],
            [""],
            ["DMC (CLASS 3)"],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            ["<RETURN[color]cyan", "PRINT*[color]inop"]
        ]);

        mcdu.leftInputDelay[5] = () => mcdu.getDelaySwitchPage();
        mcdu.onLeftInput[5] = () => mcduPages.CFDSMainMenuPage1.display(mcdu);

        // PAGE SWITCHING
        mcdu.onPrevPage = () => mcduPages.CFDSAvionicsMenuPage1.display(mcdu);
        mcdu.onNextPage = () => mcduPages.CFDSAvionicsMenuPage1.display(mcdu);
    }
}
