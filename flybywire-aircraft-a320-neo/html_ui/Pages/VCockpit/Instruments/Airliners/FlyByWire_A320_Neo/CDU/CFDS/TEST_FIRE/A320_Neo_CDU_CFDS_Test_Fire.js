class CDUCfdsTestFire {
    static ShowPage(mcdu) {
        mcdu.setTemplate([
            ["SYSTEM REPORT / TEST"],
            ["", "", "FIRE PROT"],
            ["<FDU 1[color]inop"],
            [""],
            ["<FDU 2[color]inop"],
            [""],
            ["<FDU APU[color]inop"],
            [""],
            ["<SDCU[color]inop"],
            [""],
            [""],
            [""],
            ["<RETURN[color]cyan"]
        ]);

        mcdu.leftInputDelay[5] = () => mcdu.getDelaySwitchPage();
        mcdu.onLeftInput[5] = () => mcduPages.CFDSTestMenuPage1.display(mcdu);
    }
}
