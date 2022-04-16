class CDUCfdsTestMenu {
    static ShowPage(mcdu) {
        mcdu.setTemplate([
            ["SYSTEM REPORT / TEST   }"],
            [""],
            ["<AIRCOND", "F/CTL>"],
            [""],
            ["<AFS[color]inop", "FUEL>[color]inop"],
            [""],
            ["<COM", "ICE&RAIN>"],
            [""],
            ["<ELEC", "INST>"],
            [""],
            ["<FIRE PROT", "L/G>"],
            [""],
            ["<RETURN[color]cyan", "NAV>"]
        ]);

        mcdu.leftInputDelay[0] = () => mcdu.getDelaySwitchPage();
        mcdu.leftInputDelay[2] = () => mcdu.getDelaySwitchPage();
        mcdu.leftInputDelay[3] = () => mcdu.getDelaySwitchPage();
        mcdu.leftInputDelay[4] = () => mcdu.getDelaySwitchPage();
        mcdu.leftInputDelay[5] = () => mcdu.getDelaySwitchPage();
        mcdu.rightInputDelay[0] = () => mcdu.getDelaySwitchPage();
        mcdu.rightInputDelay[2] = () => mcdu.getDelaySwitchPage();
        mcdu.rightInputDelay[3] = () => mcdu.getDelaySwitchPage();
        mcdu.rightInputDelay[4] = () => mcdu.getDelaySwitchPage();
        mcdu.rightInputDelay[5] = () => mcdu.getDelaySwitchPage();

        mcdu.onLeftInput[0] = () => mcduPages.CFDSTestAircond.display(mcdu);
        mcdu.onLeftInput[2] = () => mcduPages.CFDSTestComPage1.display(mcdu);
        mcdu.onLeftInput[3] = () => mcduPages.CFDSTestElec.display(mcdu);
        mcdu.onLeftInput[4] = () => mcduPages.CFDSTestFire.display(mcdu);
        mcdu.onLeftInput[5] = () => mcduPages.CFDSMainMenuPage1.display(mcdu);
        mcdu.onRightInput[0] = () => mcduPages.CFDSTestFctl.display(mcdu);
        mcdu.onRightInput[2] = () => mcduPages.CFDSTestIce.display(mcdu);
        mcdu.onRightInput[3] = () => mcduPages.CFDSTestInst.display(mcdu);
        mcdu.onRightInput[4] = () => mcduPages.CFDSTestLG.display(mcdu);
        mcdu.onRightInput[5] = () => mcduPages.CFDSTestNavPage1.display(mcdu);

        // PAGE SWITCHING
        mcdu.onPrevPage = () => mcduPages.CFDSTestMenuPage2.display(mcdu);
        mcdu.onNextPage = () => mcduPages.CFDSTestMenuPage2.display(mcdu);
    }

    static ShowPage2(mcdu) {
        mcdu.setTemplate([
            ["SYSTEM REPORT / TEST   }"],
            [""],
            ["<PNEU", "ENG>"],
            [""],
            ["<APU[color]inop", "TOILET>[color]inop"],
            [""],
            ["<INFO SYS[color]inop", "INERTING>[color]inop"],
            [""],
            [""],
            [""],
            [""],
            [""],
            ["<RETURN[color]cyan"]
        ]);

        mcdu.leftInputDelay[0] = () => mcdu.getDelaySwitchPage();
        mcdu.leftInputDelay[5] = () => mcdu.getDelaySwitchPage();
        mcdu.rightInputDelay[0] = () => mcdu.getDelaySwitchPage();
        mcdu.onLeftInput[0] = () => mcduPages.CFDSTestPneu.display(mcdu);
        mcdu.onLeftInput[5] = () => mcduPages.CFDSMainMenuPage1.display(mcdu);
        mcdu.onRightInput[0] = () => mcduPages.CFDSTestEng.display(mcdu);

        // PAGE SWITCHING
        mcdu.onPrevPage = () => mcduPages.CFDSTestMenuPage1.display(mcdu);
        mcdu.onNextPage = () => mcduPages.CFDSTestMenuPage1.display(mcdu);
    }
}
