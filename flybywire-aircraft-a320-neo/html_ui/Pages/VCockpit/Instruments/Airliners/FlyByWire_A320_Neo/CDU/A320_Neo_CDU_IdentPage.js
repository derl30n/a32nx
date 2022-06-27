const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function findNewMonthIndex(index) {
    if (index === 0) {
        return 11;
    } else {
        return index - 1;
    }
}

function lessThan10(num) {
    if (num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function calculateActiveDate(date) {
    if (date.length === 13) {
        const startMonth = date.slice(0, 3);
        const startDay = date.slice(3, 5);

        const endMonth = date.slice(5, 8);
        const endDay = date.slice(8, 10);

        return `${startDay}${startMonth}-${endDay}${endMonth}`;
    } else {
        return date;
    }
}

function calculateSecDate(date) {
    if (date.length === 13) {
        const primStartMonth = date.slice(0, 3);
        const primStartDay = date.slice(3, 5);

        const primStartMonthIndex = months.findIndex((item) => item === primStartMonth);

        if (primStartMonthIndex === -1) {
            return "ERR";
        }

        let newEndMonth = primStartMonth;
        let newEndDay = primStartDay - 1;

        let newStartDay = newEndDay - 27;
        let newStartMonth = primStartMonth;

        if (newEndDay === 0) {
            newEndMonth = months[findNewMonthIndex(primStartMonthIndex)];
            newEndDay = monthLength[findNewMonthIndex(primStartMonthIndex)];
        }

        if (newStartDay <= 0) {
            newStartMonth = months[findNewMonthIndex(primStartMonthIndex)];
            newStartDay = monthLength[findNewMonthIndex(primStartMonthIndex)] + newStartDay;
        }

        return `${lessThan10(newStartDay)}${newStartMonth}-${lessThan10(newEndDay)}${newEndMonth}`;
    } else {
        return "ERR";
    }

}

class CDUIdentPage {
    static ShowPage(mcdu, confirmDeleteAll = false) {
        const date = mcdu.getNavDataDateRange();
        const stored = mcdu.dataManager.numberOfStoredElements();
        mcdu.clearDisplay();
        mcdu.page.Current = mcdu.page.IdentPage;
        mcdu.activeSystem = 'FMGC';
        const deleteAll = new Column(23, "DELETE ALL}", Column.cyan, Column.right);
        if (confirmDeleteAll) {
            deleteAll.update("CONFIRM DEL*", Column.amber);
        }

        mcdu.setTemplate(FormatTemplate([
            [
                new Column(8, "A320-200") //This aircraft code is correct and does not include the engine type.
            ],
            [
                new Column(1, "ENG")
            ],
            [
                new Column(0, "LEAP-1A26", Column.green)
            ],
            [
                new Column(1, "ACTIVE NAV DATA BASE")
            ],
            [
                new Column(1, calculateActiveDate(date), Column.cyan),
                new Column(23, "AIRAC", Column.green, Column.right)
            ],
            [
                new Column(1, "SECOND NAV DATA BASE")
            ],
            [
                new Column(0, "{"),
                new Column(1, calculateSecDate(date), Column.inop, Column.small)
            ],
            [
                new Column(14, "STORED")
            ],
            [
                new Column(20, "RWYS", Column.small),
                new Column(18, stored.runways.toFixed(0).padStart(2, '0'), Column.green),
                new Column(14, "RTES", Column.small),
                new Column(12, stored.routes.toFixed(0).padStart(2, '0'), Column.green)
            ],
            [
                new Column(0, "CHG CODE"),
                new Column(20, "NAVS"),
                new Column(18, stored.navaids.toFixed(0).padStart(2, '0'), Column.green, Column.big),
                new Column(14, "WPTS"),
                new Column(12, stored.waypoints.toFixed(0).padStart(2, '0'), Column.green, Column.big)
            ],
            [
                new Column(0, "[  ]", Column.inop, Column.small),
                deleteAll
            ],
            [
                new Column(0, "IDLE/PERF"),
                new Column(16, "SOFTWARE")
            ],
            [
                new Column(0, "+0.0/+0.0", Column.green),
                new Column(11, "STATUS/XLOAD>", Column.inop)
            ]
        ]));

        // DELETE ALL
        mcdu.onRightInput[4] = () => {
            if (confirmDeleteAll) {
                if (!mcdu.dataManager.deleteAllStoredWaypoints()) {
                    mcdu.setScratchpadMessage(NXSystemMessages.fplnElementRetained);
                }
            }
            CDUIdentPage.ShowPage(mcdu, !confirmDeleteAll);
        };
    }
}
