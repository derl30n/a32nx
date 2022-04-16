class CDUCfdsTestNav {
    static ShowPage(mcdu) {
        mcdu.setTemplate([
            ["SYSTEM REPORT / TEST   }"],
            ["", "", "NAV"],
            ["<ADR 1[color]inop", "IR 3>[color]inop"],
            [""],
            ["<IR 1[color]inop", "RA 1>[color]inop"],
            [""],
            ["<ADR 2[color]inop", "RA 2>[color]inop"],
            [""],
            ["<IR 2[color]inop", "DME 1>[color]inop"],
            [""],
            ["<ADR 3[color]inop", "DME 2>[color]inop"],
            [""],
            ["<RETURN[color]cyan", "MMR 1>[color]inop"]
        ]);

        mcdu.leftInputDelay[5] = () => mcdu.getDelaySwitchPage();
        mcdu.onLeftInput[5] = () => mcduPages.CFDSTestMenuPage1.display(mcdu);

        // PAGE SWITCHING
        mcdu.onPrevPage = () => mcduPages.CFDSTestNavPage3.display(mcdu);
        mcdu.onNextPage = () => mcduPages.CFDSTestNavPage2.display(mcdu);
    }

    static ShowPage2(mcdu) {
        mcdu.setTemplate([
            ["SYSTEM REPORT / TEST   }"],
            ["", "", "NAV"],
            ["<MMR 2[color]inop", "ADF 1>[color]inop"],
            [""],
            ["<VOR 1[color]inop", "ADF 2>[color]inop"],
            [""],
            ["<VOR 2[color]inop", "ATC 1>[color]inop"],
            [""],
            ["<RADAR 1[color]inop", "ATC 2>[color]inop"],
            [""],
            [""],
            [""],
            ["<RETURN[color]cyan"]
        ]);

        mcdu.leftInputDelay[5] = () => mcdu.getDelaySwitchPage();
        mcdu.onLeftInput[5] = () => mcduPages.CFDSTestMenuPage1.display(mcdu);

        // PAGE SWITCHING
        mcdu.onPrevPage = () => mcduPages.CFDSTestNavPage1.display(mcdu);
        mcdu.onNextPage = () => mcduPages.CFDSTestNavPage3.display(mcdu);
    }

    static ShowPage3(mcdu) {
        mcdu.setTemplate([
            ["SYSTEM REPORT / TEST  }"],
            ["", "", "NAV"],
            ["<HUD[color]inop", "ISIS>[color]inop"],
            [""],
            ["<GPWC[color]inop", "OANS>[color]inop"],
            [""],
            [""],
            [""],
            [""],
            [""],
            ["<TCAS[color]inop"],
            [""],
            ["<RETURN[color]cyan"]
        ]);

        mcdu.leftInputDelay[5] = () => mcdu.getDelaySwitchPage();
        mcdu.onLeftInput[5] = () => mcduPages.CFDSTestMenuPage1.display(mcdu);

        // PAGE SWITCHING
        mcdu.onPrevPage = () => mcduPages.CFDSTestNavPage2.display(mcdu);
        mcdu.onNextPage = () => mcduPages.CFDSTestNavPage1.display(mcdu);
    }
}
