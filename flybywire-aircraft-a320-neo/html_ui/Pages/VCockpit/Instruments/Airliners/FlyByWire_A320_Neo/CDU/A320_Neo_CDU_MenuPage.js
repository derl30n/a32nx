class CDUMenuPage {
    static ShowPage(mcdu) {
        mcdu.clearDisplay();
        mcdu.page.Current = mcdu.page.MenuPage;
        const activeSystem = mcdu.activeSystem;
        let selectedFMGC = false;
        let selectedATSU = false;
        let selectedAIDS = false;
        let selectedCFDS = false;
        //const selectedMaint = false;

        const updateView = () => {
            const getText = (name, isSelected, extra = "", isLeft = true) => isSelected ? (isLeft ? name + " (SEL)" : "(SEL) " + name) : name + extra;
            const getColor = (system, isSelected) => system === activeSystem ? "green" : isSelected ? "cyan" : "white";

            mcdu.setTemplate(formatTemplate([
                [new Column(7, "MCDU MENU")],
                [new Column(22, "SELECT", true)],
                [
                    new Column(0, getText("<FMGC", selectedFMGC, " (REQ)"), false, false, getColor("FMGC", selectedFMGC)),
                    new Column(23, "NAV B/UP>", true)
                ],
                [""],
                [new Column(0, getText("<ATSU", selectedATSU), false, false, getColor("ATSU", selectedATSU))],
                [""],
                [new Column(0, getText("<AIDS", selectedAIDS), false, false, getColor("AIDS", selectedAIDS))],
                [""],
                [new Column(0, getText("<CFDS", selectedCFDS), false, false, getColor("CFDS", selectedCFDS))],
                [""],
                [""],
                //[new Column(0, getText("MCDU MAINT>", selectedMaint, "", false), true, false, getColor("MAINT", selectedMaint))],
                [""],
                [""]
            ]));
        };

        updateView();

        mcdu.setScratchpadMessage(NXSystemMessages.selectDesiredSystem);

        mcdu.onLeftInput[0] = () => {
            mcdu.setScratchpadMessage(NXSystemMessages.waitForSystemResponse);
            selectedFMGC = true;
            updateView();
            setTimeout(() => {
                mcdu.removeScratchpadMessage(NXSystemMessages.waitForSystemResponse.text);
                CDUIdentPage.ShowPage(mcdu);
            }, Math.floor(Math.random() * 400) + 200);
        };

        mcdu.onLeftInput[1] = () => {
            mcdu.setScratchpadMessage(NXSystemMessages.waitForSystemResponse);
            selectedATSU = true;
            updateView();
            setTimeout(() => {
                mcdu.removeScratchpadMessage(NXSystemMessages.waitForSystemResponse.text);
                CDUAtsuMenu.ShowPage(mcdu);
            }, Math.floor(Math.random() * 400) + 200);
        };

        mcdu.onLeftInput[2] = () => {
            mcdu.setScratchpadMessage(NXSystemMessages.waitForSystemResponse);
            selectedAIDS = true;
            updateView();
            setTimeout(() => {
                mcdu.removeScratchpadMessage(NXSystemMessages.waitForSystemResponse.text);
                CDU_AIDS_MainMenu.ShowPage(mcdu);
            }, Math.floor(Math.random() * 400) + 400);
        };

        mcdu.onLeftInput[3] = () => {
            mcdu.setScratchpadMessage(NXSystemMessages.waitForSystemResponse);
            selectedCFDS = true;
            updateView();
            setTimeout(() => {
                mcdu.removeScratchpadMessage(NXSystemMessages.waitForSystemResponse.text);
                CDUCfdsMainMenu.ShowPage(mcdu);
            }, Math.floor(Math.random() * 400) + 400);
        };
    }
}
