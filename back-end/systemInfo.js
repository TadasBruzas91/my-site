"use strict";
const si = require("systeminformation");

class HwInfo {
  #hwInfo;
  #chartSorage;
  constructor() {
    this.update();
    this.#hwInfo = [
      { id: 1, min: 0, max: 100, label: "CPU Load", symbol: "%" },
      { id: 2, min: 0, max: 100, label: "CPU Frequency", symbol: "GHz" },
      { id: 3, min: 35, max: 90, label: "CPU Temperature", symbol: "°C" },
      { id: 4, min: 0, max: 100, label: "RAM Usage", symbol: "%" },
    ];
    this.#chartSorage = [];
    this.#hwInfo.forEach(() => {
      this.#chartSorage.push([]);
    });
  }

  #getSysInfo = async () => {
    const { currentLoad: cpu_load } = await si.currentLoad();
    const { main: cpu_temp } = await si.cpuTemperature();
    const { avg: cpu_freq } = await si.cpuCurrentSpeed();
    const { speedMin: cpu_freq_min, speedMax: cpu_freq_max } = await si.cpu();
    const { total: ram_available, active: ram_used } = await si.mem();
    const ram_used_perc = (ram_used * 100) / ram_available;

    return [
      { current: cpu_load },
      { current: cpu_freq, min: cpu_freq_min, max: cpu_freq_max },
      { current: cpu_temp },
      { current: ram_used_perc },
    ];
  };

  update = async () => {
    const sysInfo = await this.#getSysInfo();
    const sysInfoWithChartData = this.#updateChartData(sysInfo);
    sysInfoWithChartData.forEach((item, index) => {
      this.#hwInfo[index] = { ...this.#hwInfo[index], ...item };
    });
  };

  #updateChartData = (sysInfo) => {
    return sysInfo.map((item, index) => {
      if (this.#chartSorage[index].length >= 720)
        this.#chartSorage[index].shift();

      const d = new Date(Date.now());
      const time = d.toISOString();

      if (!this.#chartSorage[index]?.data)
        this.#chartSorage[index] = { data: new Array() };

      if (!this.#chartSorage[index]?.labels)
        this.#chartSorage[index] = {
          ...this.#chartSorage[index],
          labels: new Array(),
        };

      this.#chartSorage[index].data.push(item.current);
      this.#chartSorage[index].labels.push(time);

      return {
        ...item,
        data: this.#chartSorage[index].data,
        labels: this.#chartSorage[index].labels,
      };
    });
  };

  getHwInfo = () => {
    return this.#hwInfo;
  };
}

module.exports = HwInfo;
