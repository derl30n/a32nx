class CDU_CFDS_Test_Inst_EIS_Menu {
    static ShowPage(mcdu, eisIndex) {
        SimVar.SetSimVarValue(`L:A32NX_DMC_DISPLAYTEST:${eisIndex}`, "Enum", 1);
        const title = "EIS ( DMC " + eisIndex + " )";
        mcdu.setTemplate([
            [title],
            [""],
            ["<LAST LEG REPORT[color]inop"],
            [""],
            ["<PREVIOUS LEGS REPORT[color]inop"],
            [""],
            ["<LRU IDENTIFICATION[color]inop"],
            [""],
            ["<ENGINES[color]inop", "TEST>"],
            [""],
            ["<DUMP BITE MEMORY[color]inop"],
            [""],
            ["<RETURN[color]cyan"]
        ]);

        mcdu.onUnload = () => SimVar.SetSimVarValue(`L:A32NX_DMC_DISPLAYTEST:${eisIndex}`, "Enum", 0);

        mcdu.leftInputDelay[5] = () => mcdu.getDelaySwitchPage();
        mcdu.rightInputDelay[3] = () => mcdu.getDelaySwitchPage();

        mcdu.onLeftInput[5] = () => mcduPages.CFDSTestInst.display(mcdu);
        mcdu.onRightInput[3] = () => mcduPages.CFDSTestInstEISTests.display(mcdu, eisIndex);
    }
}
