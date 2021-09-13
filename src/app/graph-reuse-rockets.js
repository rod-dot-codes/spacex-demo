import * as R from "ramda";

const linkReuse = (cores) => {
    const newEdges = [];
    // If there are multiple missions, we need to create a new edge for each connection
    // between missions
    cores.forEach((_core) => {
        let choices =
            "#003f5c,#2f4b7c,#665191,#a05195,#d45087,#f95d6a,#ff7c43,#ffa600".split(
                ","
            );
        let lengthRanges = R.range(2.5, 15, 0.5);
        if (_core.missions.length > 1) {
            let prevLaunch = null;

            _core.missions.forEach((mission) => {
                if (prevLaunch != null) {
                    let _color =
                        choices[Math.floor(Math.random() * choices.length)];
                    newEdges.push({
                        classes:
                            newEdges.length % 2 == 0
                                ? "unbundled-bezier textful left background"
                                : "reverse-unbundled-bezier textful right background",
                        style: {
                            "line-color": _color,
                            "line-style":
                                Math.random() * 1 >= 0.5 ? "dashed" : "dotted",
                            "line-dash-pattern":
                                lengthRanges[
                                Math.floor(Math.random() * lengthRanges.length)
                                ]
                        },
                        data: {
                            id: `${_core.id}-${prevLaunch.name}-${mission.name}`,
                            source: `${prevLaunch.name}`,
                            target: `${mission.name}`,
                            name: `The core from ${prevLaunch.name} was reused on ${mission.name}`,
                            type: "reuse"
                        }
                    });
                }
                prevLaunch = mission;
            });
        }
    });
    return newEdges;
};

export default linkReuse;