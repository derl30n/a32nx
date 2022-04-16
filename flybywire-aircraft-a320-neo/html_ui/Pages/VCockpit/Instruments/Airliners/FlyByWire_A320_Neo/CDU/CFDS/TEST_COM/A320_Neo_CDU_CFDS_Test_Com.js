class CDUCfdsTestCom {
    static ShowPage(mcdu) {
        mcdu.setTemplate([
            ["SYSTEM REPORT / TEST   }"],
            ["", "", "COM"],
            ["<AMU[color]inop", "CIDS 2>[color]inop"],
            [""],
            ["<RMP 1[color]inop", "HF 1>[color]inop"],
            [""],
            ["<RMP 2[color]inop", "HF 2>[color]inop"],
            [""],
            ["<RMP 3[color]inop", "VHF 1>[color]inop"],
            [""],
            ["<CIDS 1[color]inop", "VHF 2>[color]inop"],
            [""],
            ["<RETURN[color]cyan", "VHF 3>[color]inop"]
        ]);

        mcdu.leftInputDelay[5] = () => mcdu.getDelaySwitchPage();
        mcdu.onLeftInput[5] = () => mcduPages.CFDSTestMenuPage1.display(mcdu);

        // PAGE SWITCHING
        mcdu.onPrevPage = () => mcduPages.CFDSTestComPage2.display(mcdu);
        mcdu.onNextPage = () => mcduPages.CFDSTestComPage2.display(mcdu);
    }

    static ShowPage2(mcdu) {
        mcdu.setTemplate([
            ["SYSTEM REPORT / TEST   }"],
            ["", "", "COM"],
            ["<ACARS MU[color]inop"],
            [""],
            ["<SDU[color]inop"],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            ["<RETURN[color]cyan"]
        ]);

        mcdu.leftInputDelay[5] = () => mcdu.getDelaySwitchPage();
        mcdu.onLeftInput[5] = () => mcduPages.CFDSTestMenuPage1.display(mcdu);

        // PAGE SWITCHING
        mcdu.onPrevPage = () => mcduPages.CFDSTestComPage1.display(mcdu);
        mcdu.onNextPage = () => mcduPages.CFDSTestComPage1.display(mcdu);
    }
}
