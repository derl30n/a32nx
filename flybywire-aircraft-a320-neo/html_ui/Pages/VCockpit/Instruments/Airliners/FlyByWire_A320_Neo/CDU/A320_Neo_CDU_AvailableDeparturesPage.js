class CDUAvailableDeparturesPage {
    static ShowPage(mcdu, airport, pageCurrent = 0, sidSelection = false) {
        const airportInfo = airport.infos;
        if (airportInfo instanceof AirportInfo) {
            mcdu.clearDisplay();
            mcdu.page.Current = mcdu.page.AvailableDeparturesPage;
            let selectedRunwayCell = "---";
            let selectedRunwayCellColor = Column.white;
            /** @type {OneWayRunway} */
            const selectedRunway = mcdu.flightPlanManager.getOriginRunway();
            if (selectedRunway) {
                selectedRunwayCell = Avionics.Utils.formatRunway(selectedRunway.designation);
                selectedRunwayCellColor = mcdu.flightPlanManager.getCurrentFlightPlanIndex() === 1 ? Column.yellow : Column.green;
            }
            let selectedSidCell = "------";
            let selectedSidCellColor = Column.white;
            let selectedTransCell = "------";
            let selectedTransCellColor = Column.white;
            let departureEnRouteTransition;
            const selectedDeparture = airportInfo.departures[mcdu.flightPlanManager.getDepartureProcIndex()];
            if (selectedDeparture) {
                selectedSidCell = selectedDeparture.name;
                selectedSidCellColor = mcdu.flightPlanManager.getCurrentFlightPlanIndex() === 1 ? Column.yellow : Column.green;
                const departureEnRouteTransitionIndex = mcdu.flightPlanManager.getDepartureEnRouteTransitionIndex();
                if (departureEnRouteTransitionIndex > -1) {
                    departureEnRouteTransition = selectedDeparture.enRouteTransitions[departureEnRouteTransitionIndex];
                    if (departureEnRouteTransition) {
                        selectedTransCell = departureEnRouteTransition.name;
                    } else {
                        selectedTransCell = "NONE";
                    }
                    selectedTransCellColor = mcdu.flightPlanManager.getCurrentFlightPlanIndex() === 1 ? Column.yellow : Column.green;
                }
            }
            let doInsertRunwayOnly = false;
            let insertRow = [new Column(0, "<RETURN")];
            mcdu.onLeftInput[5] = () => {
                CDUFlightPlanPage.ShowPage(mcdu);
            };
            const runways = airportInfo.oneWayRunways;
            const rows = [[""], [""], [""], [""], [""], [""], [""], [""]];
            if (!sidSelection) {
                for (let i = 0; i < 4; i++) {
                    const index = i + pageCurrent;
                    const runway = runways[index];
                    if (runway) {
                        rows[2 * i] = [
                            new Column(0, "{" + runway.designation, Column.cyan),
                            new Column(13, runway.length.toFixed(0), Column.right, Column.cyan),
                            new Column(14, "M", Column.small, Column.cyan)
                        ];
                        rows[2 * i + 1] = [new Column(3, Utils.leadingZeros(Math.round((runway.direction)), 3), Column.cyan)];
                        mcdu.onLeftInput[i + 1] = async () => {
                            mcdu.setOriginRunwayIndex(index, () => {
                                CDUAvailableDeparturesPage.ShowPage(mcdu, airport, 0, true);
                            });
                        };
                    }
                }
            } else {
                doInsertRunwayOnly = true;
                insertRow = [new Column(0, "{ERASE", Column.amber), new Column(23, "INSERT*", Column.amber, Column.right)];
                mcdu.onRightInput[5] = () => {
                    mcdu.insertTemporaryFlightPlan(() => {
                        mcdu.updateConstraints();
                        mcdu.onToRwyChanged();
                        CDUPerformancePage.UpdateThrRedAccFromOrigin(mcdu, true, true);
                        CDUPerformancePage.UpdateEngOutAccFromOrigin(mcdu);
                        CDUFlightPlanPage.ShowPage(mcdu, 0);
                    });
                };
                let rowIndex = -pageCurrent + 1;
                let index = 0;
                rows[0] = [new Column(0, "{NONE", Column.cyan)];
                mcdu.onLeftInput[rowIndex + 1] = () => {
                    mcdu.setDepartureIndex(-1, () => {
                        CDUAvailableDeparturesPage.ShowPage(mcdu, airport);
                    });
                };
                while (rowIndex < 4 && index < airportInfo.departures.length) {
                    const sid = airportInfo.departures[index];
                    const scopout = index;
                    let transitionIndex = 0;
                    index++;
                    if (sid) {
                        let sidMatchesSelectedRunway = false;
                        if (!selectedRunway) {
                            sidMatchesSelectedRunway = true;
                        } else {
                            for (let j = 0; j < sid.runwayTransitions.length; j++) {
                                if (sid.runwayTransitions[j].runwayNumber === selectedRunway.number && sid.runwayTransitions[j].runwayDesignation === selectedRunway.designator) {
                                    sidMatchesSelectedRunway = true;
                                    transitionIndex = j;
                                    break;
                                }
                            }
                        }
                        if (sidMatchesSelectedRunway) {
                            if (rowIndex >= 1) {
                                rows[2 * rowIndex] = [new Column(0, "{" + sid.name, Column.cyan)];
                                mcdu.onLeftInput[rowIndex + 1] = () => {
                                    mcdu.setRunwayIndex(transitionIndex, (success) => {
                                        mcdu.setDepartureIndex(scopout, () => {
                                            CDUAvailableDeparturesPage.ShowPage(mcdu, airport, 0, true);
                                        });
                                    });
                                };
                            }
                            rowIndex++;
                        }
                    }
                }
                if (selectedDeparture) {
                    for (let i = 0; i < 4; i++) {
                        const enRouteTransitionIndex = i + pageCurrent;
                        const enRouteTransition = selectedDeparture.enRouteTransitions[enRouteTransitionIndex];
                        if (enRouteTransition) {
                            rows[2 * i] += [new Column(23, enRouteTransition.name + "}", Column.right, Column.cyan)];
                            mcdu.onRightInput[i + 1] = () => {
                                mcdu.flightPlanManager.setDepartureEnRouteTransitionIndex(enRouteTransitionIndex, () => {
                                    CDUAvailableDeparturesPage.ShowPage(mcdu, airport, 0, true);
                                }).catch(console.error);
                            };
                        }
                    }
                }
            }
            let up = false;
            let down = false;
            let maxPage = 0;
            if (sidSelection) {
                if (selectedRunway) {
                    for (const departure of airportInfo.departures) {
                        for (const transition of departure.runwayTransitions) {
                            if (transition.runwayNumber === selectedRunway.number && transition.runwayDesignation === selectedRunway.designator) {
                                maxPage++;
                                break;
                            }
                        }
                    }
                    maxPage -= 3;
                } else {
                    maxPage = airportInfo.departures.length - 3;
                }
                if (selectedDeparture) {
                    maxPage = Math.max(maxPage, selectedDeparture.enRouteTransitions.length - 4);
                }
            } else {
                maxPage = airportInfo.oneWayRunways.length - 4;
            }
            if (pageCurrent < maxPage) {
                mcdu.onUp = () => {
                    pageCurrent += (sidSelection) ? 3 : 4;
                    if (pageCurrent < 0) {
                        pageCurrent = 0;
                    }
                    CDUAvailableDeparturesPage.ShowPage(mcdu, airport, pageCurrent, sidSelection);
                };
                up = true;
            }
            if (pageCurrent > 0) {
                mcdu.onDown = () => {
                    pageCurrent -= (sidSelection) ? 3 : 4;
                    if (pageCurrent < 0) {
                        pageCurrent = 0;
                    }
                    CDUAvailableDeparturesPage.ShowPage(mcdu, airport, pageCurrent, sidSelection);
                };
                down = true;
            }
            mcdu.setArrows(up, down, true, true);
            mcdu.setTemplate(FormatTemplate([
                // ["DEPARTURES {small}FROM{end} {green}" + airport.ident + "{end}"],
                [
                    new Column(1, "DEPARTURES"),
                    new Column(12, "FROM", Column.small),
                    new Column(17, airport.ident, Column.green)
                ],
                //["{sp}RWY", "TRANS{sp}", "{sp}SID"],
                [
                    new Column(1, "RWY"),
                    new Column(10, "SID"),
                    new Column(18, "TRANS")
                ],
                //[selectedRunwayCell + "[color]" + selectedRunwayCellColor, selectedTransCell + "[color]" + selectedTransCellColor, selectedSidCell + "[color]" + selectedSidCellColor],
                [
                    new Column(0, selectedRunwayCell, selectedRunwayCellColor),
                    new Column(8, selectedSidCell, selectedSidCellColor),
                    new Column(18, selectedTransCell, selectedTransCellColor)
                ],
                //sidSelection ? ["SIDS", "TRANS", "AVAILABLE"] : ["", "", "AVAILABLE RUNWAYS"],
                sidSelection ? [new Column(0, "SIDS"), new Column(7, "AVAILABLE"), new Column(19, "TRANS")] : [new Column(3, "AVAILABLE RUNWAYS")],
                rows[0],
                rows[1],
                rows[2],
                rows[3],
                rows[4],
                rows[5],
                rows[6],
                rows[7],
                insertRow
            ]));
            mcdu.onPrevPage = () => {
                CDUAvailableDeparturesPage.ShowPage(mcdu, airport, 0, !sidSelection);
            };
            mcdu.onNextPage = mcdu.onPrevPage;
        }
    }
}
