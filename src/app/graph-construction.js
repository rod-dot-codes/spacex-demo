import * as R from "ramda";

const createGraph = (cy, data, predefinedEdges) => {
    cy.batch(function () {
        let graph = {
            elements: {
                nodes: [],
                edges: []
            }
        };

        // Now create a node for each launch ordered by date starting at the minDate node
        data.forEach(function (customNode) {
            let newNode = customNode.createNode();
            graph.elements.nodes.push(newNode);
            // Create an edge from either the minDate node or the previous node to the current node
            // Create an if statement that checks the number of nodes and only creates an edge if there is more than one node
            if (graph.elements.nodes.length > 1) {
                let edge = {
                    group: "edges",
                    data: {
                        name: " ",
                        source:
                            graph.elements.nodes[graph.elements.nodes.length - 2].data
                                .id,
                        target:
                            graph.elements.nodes[graph.elements.nodes.length - 1].data
                                .id,
                        days_since_first_launch_for_source: Math.abs(
                            Math.round(
                                (new Date(graph.elements.nodes[0].data.date) -
                                    new Date(
                                        graph.elements.nodes[
                                            graph.elements.nodes.length - 2
                                        ].data.date
                                    )) /
                                (1000 * 60 * 60 * 24)
                            )
                        ),
                        days_since_first_launch_for_target: Math.abs(
                            Math.round(
                                (new Date(graph.elements.nodes[0].data.date) -
                                    new Date(
                                        graph.elements.nodes[
                                            graph.elements.nodes.length - 1
                                        ].data.date
                                    )) /
                                (1000 * 60 * 60 * 24)
                            )
                        )
                    }
                };
                graph.elements.edges.push(edge);
            }
        });

        const applyYearScaling = (pos, max) => {
            let scaleAtIntervals = ((pos / (max / 3)) * 3 + 1) ** 1.3;

            return scaleAtIntervals;
        };

        predefinedEdges.forEach(function (_edge) {
            graph.elements.edges.push(_edge);
        });
        cy.add([...graph.elements.nodes, ...graph.elements.edges]);
        let allEdges = cy.edges();
        let lengthAllEdges = allEdges.length;
        allEdges.forEach(function (edge, position) {
            if (edge.data("type") !== "reuse") {
                let source = edge.source();
                source.position(
                    "y",
                    edge.data("days_since_first_launch_for_source") *
                    applyYearScaling(position, lengthAllEdges)
                );
                source.position("x", 100);
                let target = edge.target();
                target.position(
                    "y",
                    edge.data("days_since_first_launch_for_target") *
                    applyYearScaling(position + 1, lengthAllEdges)
                );
                target.position("x", 100);
            }
        });

        cy.fit(R.take(2, cy.nodes()));

        var updateBounds = function (x, y) {
            cy.pan({
                x: cy.extent().w / 2,
                y: y
            });

            let extent = cy.extent();
            let launchPosition = -1;
            let allNodes = cy.nodes();
            allNodes.forEach(function (tempNode) {
                let loopLaunch = tempNode.data("launch");
                let currentPosition = tempNode.position();
                if (!loopLaunch) {
                    return tempNode;
                }
                launchPosition += 1;
                loopLaunch.updateNodePosition(currentPosition);
                if (loopLaunch.insideBoundingBox(extent)) {
                    tempNode.popper({
                        content: function () {
                            return loopLaunch.updateOrCreatePopper();
                        },
                        popper: {
                            placement:
                                parseInt(launchPosition) % 2 == 0
                                    ? "right-start"
                                    : "left-start",
                            strategy: "fixed"
                        }
                    });

                    return tempNode;
                } else {
                    loopLaunch.deletePopperIfExists();
                }
            });
        };
        const MIN_HEIGHT = 150;
        let lastKnownScrollPosition = MIN_HEIGHT;

        document.onwheel = function (e) {
            lastKnownScrollPosition -= e.deltaY;
            if (lastKnownScrollPosition >= MIN_HEIGHT) {
                lastKnownScrollPosition = MIN_HEIGHT;
            }

            updateBounds(0, lastKnownScrollPosition);
        };

        updateBounds(0, MIN_HEIGHT);
        updateBounds(0, MIN_HEIGHT + 1);
        try {
            let loader = document.getElementById("div-loader");
            loader.innerHTML = "";
            loader.remove();
            loader = null;
        }
        catch (e) {
            console.log(e);
            
        }
     });
};

export default createGraph;