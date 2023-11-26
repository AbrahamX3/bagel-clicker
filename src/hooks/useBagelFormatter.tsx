export default function useBagelFormatter(): (
  number: number,
  formatType: "short" | "long",
) => string {
  const formatEveryThirdPower =
    (notations: string[]) =>
    (value: number): string => {
      let base = 0;
      let notationValue = "";

      if (!isFinite(Number(value))) return "Infinity";

      if (value >= 1000) {
        while (value >= 1000) {
          value /= 1000;
          base++;
        }

        if (base >= notations.length) {
          return "Infinity";
        } else {
          notationValue = notations[base - 1] ?? "";
        }
      }

      return value < 10
        ? (Math.round(Number(value) * 1000) / 1000).toString() + notationValue
        : Math.round(Number(value)).toString() + notationValue;
    };

  const rawFormatter = (value: number): string =>
    value < 1
      ? Math.round(Number(value)).toString()
      : (Math.round(Number(value) * 1000) / 1000).toString();

  const formatLong = [
    " thousand",
    " million",
    " billion",
    " trillion",
    " quadrillion",
    " quintillion",
    " sextillion",
    " septillion",
    " octillion",
    " nonillion",
  ];

  const prefixes = [
    "",
    "un",
    "duo",
    "tre",
    "quattuor",
    "quin",
    "sex",
    "septen",
    "octo",
    "novem",
  ];

  const suffixes = [
    "decillion",
    "vigintillion",
    "trigintillion",
    "quadragintillion",
    "quinquagintillion",
    "sexagintillion",
    "septuagintillion",
    "octogintillion",
    "nonagintillion",
    "decagintillion",
  ];

  for (const suffix of suffixes) {
    for (const prefix of prefixes) {
      formatLong.push(` ${prefix}${suffix}`);
    }
  }

  const formatShort = ["k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"];

  for (const suffix of suffixes) {
    for (const prefix of prefixes) {
      formatShort.push(` ${prefix}${suffix}`);
    }
  }
  formatShort[10] = "Dc";

  const numberFormatters: ((value: number) => string)[] = [
    formatEveryThirdPower(formatShort),
    formatEveryThirdPower(formatLong),
    rawFormatter,
  ];

  const formatNumber = (
    number: number,
    formatType: "short" | "long",
  ): string => {
    const formatter =
      numberFormatters[formatType === "short" ? 0 : 1] ?? rawFormatter;
    return formatter(number);
  };

  return formatNumber;
}
