class CDUCfdsTestInst {
    static ShowPage(mcdu) {
        mcdu.setTemplate([
            ["SYSTEM REPORT / TEST"],
            ["", "", "INST"],
            ["<ECAM 1", "CFDIU>"],
            [""],
            ["<ECAM 2", "EIS 1>"],
            [""],
            ["<DFDRS", "EIS 2>"],
            [""],
            ["", "EIS 3>"],
            [""],
            [""],
            [""],
            ["<RETURN[color]cyan"]
        ]);

        mcdu.leftInputDelay[0] = () => mcdu.getDelaySwitchPage();
        mcdu.leftInputDelay[1] = () => mcdu.getDelaySwitchPage();
        mcdu.leftInputDelay[2] = () => mcdu.getDelaySwitchPage();
        mcdu.leftInputDelay[5] = () => mcdu.getDelaySwitchPage();
        mcdu.rightInputDelay[0] = () => mcdu.getDelaySwitchPage();
        mcdu.rightInputDelay[1] = () => mcdu.getDelaySwitchPage();
        mcdu.rightInputDelay[2] = () => mcdu.getDelaySwitchPage();
        mcdu.rightInputDelay[3] = () => mcdu.getDelaySwitchPage();

        mcdu.onLeftInput[0] = () => mcduPages.CFDSTestInstECAMMenu.display(mcdu, 1);
        mcdu.onLeftInput[1] = () => mcduPages.CFDSTestInstECAMMenu.display(mcdu, 2);
        mcdu.onLeftInput[2] = () => mcduPages.CFDSTestInstDFDRSMenu.display(mcdu);
        mcdu.onLeftInput[5] = () => mcduPages.CFDSTestMenuPage1.display(mcdu);
        mcdu.onRightInput[0] = () => mcduPages.CFDSTestInstCFDIUMenu.display(mcdu);
        mcdu.onRightInput[1] = () => mcduPages.CFDSTestInstEISMenu.display(mcdu, 1);
        mcdu.onRightInput[2] = () => mcduPages.CFDSTestInstEISMenu.display(mcdu, 2);
        mcdu.onRightInput[3] = () => mcduPages.CFDSTestInstEISMenu.display(mcdu, 3);
    }
}
