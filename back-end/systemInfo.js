"use strict";
const si = require("systeminformation");
const SysInfoCurrent = require("./schemas/systemInfoSchemaCurrent");
const SysInfoHistory = require("./schemas/systemInfoSchemaHistory");
var subMonths = require("date-fns/subMonths");

class HwInfo {
  constructor() {
    this.update();
    setInterval(this.#deleteOldData, Math.pow(2, 31) - 1);
  }

  #getSysInfo = async () => {
    const { currentLoad: cpu_load } = await si.currentLoad();
    const { main: cpu_temp } = await si.cpuTemperature();
    const { avg: cpu_freq } = await si.cpuCurrentSpeed();
    const { speedMin: cpu_freq_min, speedMax: cpu_freq_max } = await si.cpu();
    const { total: ram_available, active: ram_used } = await si.mem();
    const ram_used_perc = (ram_used * 100) / ram_available;

    return {
      currentData: [
        {
          _id: 1,
          name: "cpu_load",
          current: cpu_load,
          min: 0,
          max: 100,
          label: "CPU load",
          symbol: "%",
        },
        {
          _id: 2,
          name: "cpu_freq",
          current: cpu_freq,
          min: cpu_freq_min,
          max: cpu_freq_max,
          label: "CPU frequency",
          symbol: "GHz",
        },
        {
          _id: 3,
          name: "cpu_temp",
          current: cpu_temp,
          min: 30,
          max: 80,
          label: "CPU temperature",
          symbol: "°C",
        },
        {
          _id: 4,
          name: "ram_used_perc",
          current: ram_used_perc,
          min: 0,
          max: 100,
          label: "RAM used",
          symbol: "%",
        },
      ],
      historyData: {
        cpu_load,
        cpu_freq,
        cpu_temp,
        ram_used,
        ram_used_perc,
      },
    };
  };

  #deleteOldData = async () => {
    await SysInfoCurrent.deleteMany({
      createdAt: { $lt: subMonths(Date.now(), 1) },
    });
  };

  update = async () => {
    const sysInfo = await this.#getSysInfo();
    const currentData = new SysInfoCurrent({
      currentData: sysInfo.currentData,
    });
    const historyData = new SysInfoHistory(sysInfo.historyData);

    try {
      await SysInfoCurrent.deleteMany();
    } catch (ex) {
      console.error(ex);
    }
    try {
      await currentData.save();
      await historyData.save();
    } catch (ex) {
      console.error(ex);
    }
  };
}

module.exports = HwInfo;
