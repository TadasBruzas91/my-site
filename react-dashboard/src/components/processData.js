import parseISO from "date-fns/parseISO";
import format from "date-fns/format";

onmessage = (msg) => {
  const { data, item } = msg.data;
  const d = data.map((element) => element[item.name]);
  const l = data.map((element) =>
    format(parseISO(element.createdAt, { additionalDigits: 0 }), "HH:mm.ss")
  );
  postMessage({ d, l });
};
