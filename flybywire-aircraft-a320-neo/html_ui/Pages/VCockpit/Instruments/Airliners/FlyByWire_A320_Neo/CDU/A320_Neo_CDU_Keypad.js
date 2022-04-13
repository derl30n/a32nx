class Keypad {
    constructor(mcdu) {
        this._mcdu = mcdu;
        this._keys = {
            // "DEPARR": () => mcdu.onDepArr(),
            // "FIX": () => mcdu.onFix(),
            // "HOLD": () => mcdu.onHold(),
            // "FMCCOMM": () => mcdu.onFmcComm(),
            "NAVRAD": () => CDUNavRadioPage.ShowPage(mcdu),
            "PREVPAGE": () => mcdu.onPrevPage(),
            "NEXTPAGE": () => mcdu.onNextPage(),
            "SP": () => mcdu.onSp(),
            "DEL": () => mcdu.onDel(),
            "CLR": () => mcdu.onClr(),
            "CLR_Held": () => mcdu.onClrHeld(),
            "DIV": () => mcdu.onDiv(),
            "DOT": () => mcdu.onDot(),
            "PLUSMINUS": (defaultKey = "-") => mcdu.onPlusMinus(defaultKey),
            // "Localizer": () => {},
            "DIR": () => {
                mcdu.eraseTemporaryFlightPlan();
                CDUDirectToPage.ShowPage(mcdu);
            },
            "PROG": () => CDUProgressPage.ShowPage(mcdu),
            "PERF": () => {
                if (mcdu.flightPhaseManager.phase === FmgcFlightPhases.DONE) {
                    mcdu.flightPhaseManager.changePhase(FmgcFlightPhases.PREFLIGHT);
                }
                CDUPerformancePage.ShowPage(mcdu);
            },
            "INIT": () => {
                if (mcdu.flightPhaseManager.phase === FmgcFlightPhases.DONE) {
                    mcdu.flightPhaseManager.changePhase(FmgcFlightPhases.PREFLIGHT);
                }
                CDUInitPage.ShowPage1(mcdu);
            },
            "DATA": () => CDUDataIndexPage.ShowPage1(mcdu),
            "FPLN": () => CDUFlightPlanPage.ShowPage(mcdu),
            "RAD": () => CDUNavRadioPage.ShowPage(mcdu),
            "FUEL": () => mcdu.goToFuelPredPage(),
            "SEC": () => CDUSecFplnMain.ShowPage(mcdu),
            "ATC": () => CDUAtcMenu.ShowPage1(mcdu),
            "MENU": () => CDUMenuPage.ShowPage(mcdu),
            "AIRPORT": () => mcdu.addNewMessage(NXFictionalMessages.notYetImplemented),
            "UP": () => mcdu.onUp(),
            "DOWN": () => mcdu.onDown(),
            "LEFT": () => mcdu.onLeft(),
            "RIGHT": () => mcdu.onRight(),
            "OVFY": () => mcdu.onOvfy()
        };

        for (const letter of FMCMainDisplay._AvailableKeys) {
            this._keys[letter] = () => this._mcdu.scratchpad.addChar(letter);
        }
    }

    onKeyPress(value) {
        if (!value in this._keys) {
            return false;
        }

        //TODO: remove log
        console.log("Processed key event: " + value);

        const cur = this._mcdu.page.Current;
        setTimeout(() => {
            if (this._mcdu.page.Current === cur) {
                this._keys[value]();
            }
        }, this._mcdu.getDelaySwitchPage());
        return true;
    }
}
