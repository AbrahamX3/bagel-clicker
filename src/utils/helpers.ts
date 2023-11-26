export function romanize(num: number): string {
  if (num === 0) {
    return "?";
  }

  const romanNumerals: Record<number, string> = {
    1: "I",
    4: "IV",
    5: "V",
    9: "IX",
    10: "X",
    40: "XL",
    50: "L",
    90: "XC",
    100: "C",
    400: "CD",
    500: "D",
    900: "CM",
    1000: "M",
  };

  const values = Object.keys(romanNumerals)
    .map(Number)
    .sort((a, b) => b - a);

  let result = "";
  let remainder = num;

  for (const value of values) {
    while (remainder >= value) {
      result += romanNumerals[value];
      remainder -= value;
    }
  }

  return result;
}

export function formatNumber(value: number) {
  const suffixes = [
    "",
    "K",
    "M",
    "B",
    "T",
    "Qa",
    "Qi",
    "Sx",
    "Sp",
    "Oc",
    "No",
    "Dc",
    "UDc",
    "DDc",
    "TDc",
    "QaDc",
    "QiDc",
    "SxDc",
    "SpDc",
    "ODc",
    "NDc",
    "Vi",
    "UVi",
    "DVi",
    "TVi",
    "QaVi",
    "QiVi",
    "SxVi",
    "SpVi",
    "OcVi",
    "NoVi",
    "Tg",
    "UTg",
    "DTg",
    "TTg",
    "QaTg",
    "QiTg",
    "SxTg",
    "SpTg",
    "OTg",
    "NTg",
    "Qad",
    "UQad",
    "DQad",
    "TQad",
    "QaQad",
    "QiQad",
    "SxQad",
    "SpQad",
    "OQad",
    "NQad",
    "Qid",
    "UQid",
    "DQid",
    "TQid",
    "QaQid",
    "QiQid",
    "SxQid",
    "SpQid",
    "OQid",
    "NQid",
    "Sxd",
    "USxd",
    "DSxd",
    "TSxd",
    "QaSxd",
    "QiSxd",
    "SxSxd",
    "SpSxd",
    "OSxd",
    "NSxd",
    "Spd",
    "USpd",
    "DSpd",
    "TSpd",
    "QaSpd",
    "QiSpd",
    "SxSpd",
    "SpSpd",
    "OSpd",
    "NSpd",
    "Ogd",
    "UOgd",
    "DOgd",
    "TOgd",
    "QaOgd",
    "QiOgd",
    "SxOgd",
    "SpOgd",
    "OOgd",
    "NOgd",
    "Nnd",
    "UNnd",
    "DNnd",
    "TNnd",
    "QaNnd",
    "QiNnd",
    "SxNnd",
    "SpNnd",
    "ONnd",
    "NNnd",
    "Ct",
    "UCt",
    "DCt",
    "TCt",
    "QaCt",
    "QiCt",
    "SxCt",
    "SpCt",
    "OCt",
    "NCt",
  ];

  const absValue = Math.abs(value);
  const suffixNum = Math.floor(Math.log10(absValue) / 3);

  if (suffixNum === 0 || absValue < 1000) {
    return value.toLocaleString("en-US", { maximumFractionDigits: 3 });
  }

  const formattedValue = `${(absValue / Math.pow(1000, suffixNum))
    .toFixed(2)
    .replace(/\.?0+$/, "")}${suffixes[suffixNum]}`;

  return value < 0 ? `-${formattedValue}` : formattedValue;
}
