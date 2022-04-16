class CDUCfdsTestFctl {
    static ShowPage(mcdu) {
        mcdu.setTemplate([
            ["SYSTEM REPORT / TEST"],
            ["", "", "F/CTL"],
            ["<EFCS1[color]inop"],
            [""],
            ["<EFCS2[color]inop"],
            [""],
            ["<SFCC1[color]inop"],
            [""],
            ["<SFCC2[color]inop"],
            [""],
            [""],
            [""],
            ["<RETURN[color]cyan"]
        ]);

        mcdu.leftInputDelay[5] = () => mcdu.getDelaySwitchPage();
        mcdu.onLeftInput[5] = () => mcduPages.CFDSTestMenuPage1.display(mcdu);
    }
}
