class CDUCfdsTestIce {
    static ShowPage(mcdu) {
        mcdu.setTemplate([
            ["SYSTEM REPORT / TEST"],
            ["", "", "ICE + RAIN"],
            ["<WHC 1[color]inop"],
            [""],
            ["<WHC 2[color]inop"],
            [""],
            ["<PHC 1[color]inop", "WING ANTI ICE>[color]inop"],
            ["", "(THRU ECS)[color]inop"],
            ["<PHC 2[color]inop"],
            [""],
            ["<PHC 3[color]inop"],
            [""],
            ["<RETURN[color]cyan"]
        ]);

        mcdu.leftInputDelay[5] = () => mcdu.getDelaySwitchPage();
        mcdu.onLeftInput[5] = () => mcduPages.CFDSTestMenuPage1.display(mcdu);
    }
}
