class Launch {
    constructor(data, avifSupport) {
      this.data = data;
      this._id = data.mission_name;
      this.name = data.mission_name;
      this.date = Date.parse(data.launch_date_utc);
      this.launch_year = parseInt(data.launch_year);
      this.avifSupport = avifSupport;
    }

    getEngineCounts() {
      return this.data.launch;
    }

    getMissionPatch() {
      let missionPatch = this.data.links.mission_patch_small;
      if (!missionPatch) {
        return;
      }
      let filename = missionPatch.split("/").pop();
      if (avifSupport) {
           filename = `${filename.split(".")[0]}.avif`;
      }
      let imageLocation = `./mission_patch/small/${filename}`;
      return imageLocation;
    }

    updateNodePosition(position) {
      this.x = position.x;
      this.y = position.y;
    }

    insideBoundingBox(extent) {
      let { x1, y1, x2, y2, w, h } = extent;

      return this.x >= x1 && this.x <= x2 && this.y >= y1 && this.y <= y2;
    }

    _createPopper() {
      this._popper = document.createElement("launch-info");
      this._popper.id = this._id;
      this._popper.launch = this;

      document.getElementById("info-containers").appendChild(this._popper);
    }

    updateOrCreatePopper() {
      if (this._popper) {
        this._popper.update();
      } else {
        this._createPopper();
      }
      return this._popper;
    }

    deletePopperIfExists() {
      if (this._popper) {
        this._popper.remove();
        this._popper = null;
      }
    }

    createNode() {
      return {
        group: "nodes",
        style: {
          shape: "roundrectangle",
          "background-image": this.getMissionPatch(),
          "background-fit": "contain",
          "background-color": "#ffffff",
          width: "200px",
          height: "200px",
          "z-index": 1001
        },
        data: {
          id: this._id,
          launch: this,
          name: "",
          date: this.date,
          launch_year: this.launch_year
        }
      };
    }
  }

export default Launch;