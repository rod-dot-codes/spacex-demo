export default [
    {
      selector: "node",
      style: {
        label: "data(name)"
      }
    },
    {
      selector: "edge",
      style: {
        width: 10,
        "target-arrow-shape": null,
        "line-color": "#9dbaea",
        "target-arrow-color": "#9dbaea",
        "curve-style": "bezier",
        "z-index": 1000,
        label: "data(name)"
      }
    },
    {
      selector: "edge.unbundled-bezier",
      style: {
        width: 15,
        "curve-style": "unbundled-bezier",
        "control-point-distances": 1500,
        "control-point-weights": 0.3
      }
    },
    {
      selector: "edge.reverse-unbundled-bezier",
      style: {
        width: 15,
        "curve-style": "unbundled-bezier",
        "control-point-distances": -1500,
        "control-point-weights": 0.3
      }
    },
    {
      selector: ".textful",
      style: {
        "font-size": "25px",
        "text-max-width": 40,
        "text-wrap": "wrap"
      }
    },
    {
      selector: ".right",
      style: {
        "text-valign": "center",
        "text-halign": "right"
      }
    },
    {
      selector: ".left",
      style: {
        "text-valign": "center",
        "text-halign": "left"
      }
    },
    {
      selector: ".background",
      style: {
        "text-background-opacity": 1,
        color: "#fff",
        "text-background-color": "#888",
        "text-background-shape": "roundrectangle",
        "text-border-color": "#000",
        "text-border-width": 1,
        "text-border-opacity": 1,
        "text-background-padding": "15px"
      }
    }
  ];