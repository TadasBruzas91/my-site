"use strict";
const si = require("systeminformation");

module.exports = class HwInfo {
  constructor() {
    this.update();
  }

  update = async () => {
    const { currentLoad: cpu_load } = await si.currentLoad();
    const { main: cpu_temp } = await si.cpuTemperature();
    const { avg: cpu_freq } = await si.cpuCurrentSpeed();
    const { speedMin: cpu_freq_min, speedMax: cpu_freq_max } = await si.cpu();
    const { total: ram_available, active: ram_used } = await si.mem();
    const ram_used_perc = (ram_used * 100) / ram_available;
    this.hwInfo = {
      cpu_load,
      cpu_freq,
      cpu_freq_min,
      cpu_freq_max,
      cpu_temp,
      ram_used_perc,
    };
  };

  getHwInfo = () => {
    return this.hwInfo;
  };
};
