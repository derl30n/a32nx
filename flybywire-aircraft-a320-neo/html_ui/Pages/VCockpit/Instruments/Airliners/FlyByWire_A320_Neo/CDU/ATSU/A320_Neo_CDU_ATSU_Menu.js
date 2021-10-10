class CDUAtsuMenu {
    static ShowPage(mcdu) {
        mcdu.activeSystem = 'ATSU';
        mcdu.clearDisplay();
        const display = [
            ["ATSU DATALINK"],
            [""],
            ["<ATC MENU"],
            [""],
            ["", "AOC MENU>"],
            [""],
            [""],
            [""],
            [""],
            ["", "DATALINK\xa0"],
            ["", "STATUS>"],
            [""],
            ["", "COMM MENU>"]
        ];
        mcdu.setTemplate(display);

        mcdu.leftInputDelay[0] = () => {
            return mcdu.getDelaySwitchPage();
        };
        mcdu.onLeftInput[0] = () => {
            CDUAtcMenu.ShowPage1(mcdu);
        };

        mcdu.rightInputDelay[1] = () => {
            return mcdu.getDelaySwitchPage();
        };
        mcdu.onRightInput[1] = () => {
            CDUAocMenu.ShowPage(mcdu);
        };

        mcdu.rightInputDelay[4] = () => {
            return mcdu.getDelaySwitchPage();
        };
        mcdu.onRightInput[4] = () => {
            CDUDatalinkStatus.ShowPage(mcdu);
        };

        mcdu.rightInputDelay[5] = () => {
            return mcdu.getDelaySwitchPage();
        };
        mcdu.onRightInput[5] = () => {
            CDUCommMenu.ShowPage(mcdu);
        };
    }
}
