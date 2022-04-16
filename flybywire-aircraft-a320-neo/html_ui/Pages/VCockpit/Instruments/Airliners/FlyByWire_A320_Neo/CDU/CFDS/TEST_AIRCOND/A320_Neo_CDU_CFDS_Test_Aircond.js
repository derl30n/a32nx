class CDUCfdsTestAircond {
    static ShowPage(mcdu) {
        mcdu.setTemplate([
            ["SYSTEM REPORT / TEST"],
            ["", "", "AIR COND"],
            ["<CPC 1[color]inop"],
            [""],
            ["<CPC 2[color]inop"],
            [""],
            ["<TEMP CTL[color]inop"],
            [""],
            ["<AEVC[color]inop"],
            [""],
            ["<AFT CHC[color]inop"],
            [""],
            ["<RETURN[color]cyan"]
        ]);

        mcdu.leftInputDelay[5] = () => mcdu.getDelaySwitchPage();
        mcdu.onLeftInput[5] = () => mcduPages.CFDSTestMenuPage1.display(mcdu);
    }
}
