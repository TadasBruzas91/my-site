"use strict";
const si = require("systeminformation");

module.exports = class HwInfo {
  constructor() {
    this.update();
  }

  update = async () => {
    const cpu_load = (await si.currentLoad()).currentLoad;
    const cpu_temp = (await si.cpuTemperature()).main;
    const cpu_freq = (await si.cpuCurrentSpeed()).avg;
    const { total: ram_available, active: ram_used } = await si.mem();
    const ram_used_perc = (ram_used * 100) / ram_available;
    this.hwInfo = { cpu_load, cpu_freq, cpu_temp, ram_used_perc };
  };

  getHwInfo = () => {
    return this.hwInfo;
  };
};
