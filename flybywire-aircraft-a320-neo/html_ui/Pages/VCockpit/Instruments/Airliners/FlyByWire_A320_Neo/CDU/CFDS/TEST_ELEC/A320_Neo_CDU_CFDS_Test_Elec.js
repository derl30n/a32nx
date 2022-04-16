class CDUCfdsTestElec {
    static ShowPage(mcdu) {
        mcdu.setTemplate([
            ["SYSTEM REPORT / TEST"],
            ["", "", "ELEC"],
            ["<AC GEN[color]inop", "TR 1>[color]inop"],
            [""],
            ["<GCU EMER[color]inop", "TR 2>[color]inop"],
            [""],
            ["<BCL 1[color]inop", "TR 3>[color]inop"],
            [""],
            ["<BCL 2[color]inop"],
            [""],
            [""],
            [""],
            ["<RETURN[color]cyan"]
        ]);

        mcdu.leftInputDelay[5] = () => mcdu.getDelaySwitchPage();
        mcdu.onLeftInput[5] = () => mcduPages.CFDSTestMenuPage1.display(mcdu);
    }
}
