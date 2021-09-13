class MonthSpacer {
    constructor(year, month) {
      this.month = parseInt(month);
      this.year = parseInt(year);
      this.date = new Date(year, month).getTime();
      this.id = `${year}-${month}`;
      this.name = new Date(year, month).toLocaleString("default", {
        year: "numeric",
        month: "long"
      });
    }
    createNode() {
      return {
        group: "nodes",

        style: {
          shape: "rectangle",
          "background-color": "#fde68a",
          "background-image": null,
          "background-fit": null,
          "background-opacity": 0.9,
          "z-index": 998,
          width: 10000,
          height: 2
        },
        data: {
          id: this.id,
          year: this.year,
          month: this.month,
          date: this.date,
          launch: null,
          name: this.name,
          launch_year: this.year
        }
      };
    }
  };

  export default MonthSpacer;