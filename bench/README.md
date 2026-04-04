# Benchmark Results

All benchmarks run with ~500ms total time per test. Sorted from fastest to slowest.

## Full Results

| # | Function | Ops/sec | Mean (ms) | RME (%) | Samples |
|---|----------|---------|-----------|---------|---------|
| 1 | dropMatrix | 20,557,911 | 0.00005 | 0.08 | 10,278,956 |
| 2 | dropColor | 19,787,138 | 0.00005 | 0.05 | 9,893,569 |
| 3 | hwbToHsv | 18,991,852 | 0.00005 | 0.08 | 9,495,926 |
| 4 | hsvToRgb | 16,744,637 | 0.00006 | 0.04 | 8,372,319 |
| 5 | hue (hwb) | 16,661,921 | 0.00006 | 0.13 | 8,330,961 |
| 6 | hue (hsl) | 16,535,918 | 0.00006 | 0.08 | 8,267,959 |
| 7 | hue (lch) | 16,013,841 | 0.00006 | 0.03 | 8,006,921 |
| 8 | xyz65ToLrgb | 15,869,381 | 0.00006 | 0.09 | 7,934,691 |
| 9 | lrgbToXyz65 | 14,724,625 | 0.00007 | 0.07 | 7,362,313 |
| 10 | hue (lab) | 14,374,185 | 0.00007 | 0.04 | 7,187,093 |
| 11 | hue (oklab) | 14,231,070 | 0.00007 | 0.04 | 7,115,536 |
| 12 | hue (oklch) | 14,187,523 | 0.00007 | 0.03 | 7,093,762 |
| 13 | hsvToHwb | 13,842,252 | 0.00007 | 0.19 | 6,921,126 |
| 14 | hue (rgb) | 13,267,022 | 0.00008 | 0.08 | 6,633,512 |
| 15 | xyz50ToLab | 13,158,788 | 0.00008 | 0.05 | 6,579,394 |
| 16 | cloneColor | 12,543,046 | 0.00008 | 0.95 | 6,271,523 |
| 17 | formatHex | 11,916,555 | 0.00008 | 0.40 | 5,958,278 |
| 18 | oklabToOklch | 11,041,498 | 0.00009 | 0.12 | 5,520,750 |
| 19 | getContrastRating | 11,013,357 | 0.00009 | 0.07 | 5,506,679 |
| 20 | isEqual | 10,642,422 | 0.00009 | 0.41 | 5,321,211 |
| 21 | roundTo | 10,603,459 | 0.00009 | 0.12 | 5,301,731 |
| 22 | format (rgb) | 10,468,654 | 0.00010 | 1.04 | 5,234,328 |
| 23 | hslToHsv | 10,338,676 | 0.00010 | 0.09 | 5,169,338 |
| 24 | xyz65ToXyz50 | 10,174,157 | 0.00010 | 0.06 | 5,087,080 |
| 25 | xyz50ToXyz65 | 10,102,422 | 0.00010 | 0.07 | 5,051,211 |
| 26 | parseHex | 9,990,730 | 0.00010 | 0.28 | 4,995,366 |
| 27 | multiplyMatrixVector | 9,981,262 | 0.00010 | 0.11 | 4,990,631 |
| 28 | rgbToHsv | 9,937,055 | 0.00010 | 0.14 | 4,968,528 |
| 29 | oklabToXyz65 | 9,890,514 | 0.00010 | 0.08 | 4,945,257 |
| 30 | hsvToHsl | 9,765,122 | 0.00010 | 0.14 | 4,882,562 |
| 31 | checkGamut | 9,711,574 | 0.00010 | 0.11 | 4,855,787 |
| 32 | labToXyz50 | 9,643,699 | 0.00010 | 0.06 | 4,821,850 |
| 33 | convert (lab -> lch) | 9,152,183 | 0.00011 | 0.03 | 4,576,092 |
| 34 | clampColor | 9,138,180 | 0.00011 | 0.12 | 4,569,090 |
| 35 | convert (oklch -> oklab) | 8,562,324 | 0.00012 | 0.04 | 4,281,163 |
| 36 | createColor | 8,014,793 | 0.00012 | 1.35 | 4,007,397 |
| 37 | labToLch | 7,976,436 | 0.00013 | 0.09 | 3,988,218 |
| 38 | oklchToOklab | 7,154,895 | 0.00014 | 0.08 | 3,577,448 |
| 39 | mixColor | 7,034,668 | 0.00014 | 1.65 | 3,517,334 |
| 40 | lchToLab | 7,032,065 | 0.00014 | 0.08 | 3,516,033 |
| 41 | xyz65ToOklab | 6,905,766 | 0.00014 | 0.07 | 3,452,883 |
| 42 | toPicker | 6,195,884 | 0.00016 | 0.09 | 3,097,943 |
| 43 | convert (rgb -> hsl) | 6,042,452 | 0.00017 | 0.10 | 3,021,226 |
| 44 | format (hex) | 5,840,768 | 0.00017 | 0.07 | 2,920,385 |
| 45 | rgbToLrgb | 5,566,075 | 0.00018 | 0.07 | 2,783,038 |
| 46 | format (hsl) | 5,494,748 | 0.00018 | 0.11 | 2,747,375 |
| 47 | convert (lab -> oklab) | 5,428,554 | 0.00018 | 0.03 | 2,714,277 |
| 48 | lrgbToRgb | 5,372,421 | 0.00019 | 0.07 | 2,686,211 |
| 49 | format (hwb) | 5,371,226 | 0.00019 | 0.08 | 2,685,613 |
| 50 | format (lab) | 5,211,473 | 0.00019 | 0.54 | 2,605,737 |
| 51 | format (oklch) | 5,209,298 | 0.00019 | 0.10 | 2,604,650 |
| 52 | convert (oklab -> oklch) | 5,190,240 | 0.00019 | 0.09 | 2,595,120 |
| 53 | convert (rgb -> hwb) | 5,146,521 | 0.00019 | 0.08 | 2,573,261 |
| 54 | format (oklab) | 4,841,285 | 0.00021 | 0.06 | 2,420,643 |
| 55 | format (lch) | 4,763,672 | 0.00021 | 0.54 | 2,381,837 |
| 56 | convert (lch -> lab) | 4,588,086 | 0.00022 | 0.07 | 2,294,044 |
| 57 | createPicker | 4,499,266 | 0.00022 | 1.27 | 2,249,633 |
| 58 | convert (hwb -> rgb) | 4,465,981 | 0.00022 | 0.14 | 2,232,991 |
| 59 | deriveColor | 4,423,873 | 0.00023 | 0.31 | 2,211,937 |
| 60 | convert (oklch -> lab) | 4,308,962 | 0.00023 | 0.03 | 2,154,481 |
| 61 | simulateTritanopia | 4,216,094 | 0.00024 | 0.43 | 2,108,048 |
| 62 | parseColorName | 4,127,230 | 0.00024 | 1.41 | 2,063,615 |
| 63 | simulateDeficiency | 4,080,106 | 0.00025 | 0.39 | 2,040,053 |
| 64 | convert (hsl -> rgb) | 4,057,503 | 0.00025 | 0.12 | 2,028,752 |
| 65 | simulateProtanopia | 3,994,985 | 0.00025 | 0.34 | 1,997,494 |
| 66 | convert (lab -> rgb) | 3,821,077 | 0.00026 | 0.08 | 1,910,539 |
| 67 | simulateAchromatopsia | 3,748,577 | 0.00027 | 0.39 | 1,874,289 |
| 68 | convert (lab -> hwb) | 3,545,587 | 0.00028 | 0.07 | 1,772,794 |
| 69 | convert (oklch -> lch) | 3,518,781 | 0.00028 | 0.04 | 1,759,391 |
| 70 | convert (oklch -> hwb) | 3,507,184 | 0.00029 | 0.04 | 1,753,592 |
| 71 | convert (lab -> hsl) | 3,404,400 | 0.00029 | 0.10 | 1,702,201 |
| 72 | fromPicker | 3,350,273 | 0.00030 | 2.87 | 1,675,137 |
| 73 | convert (hwb -> oklch) | 3,199,195 | 0.00031 | 0.10 | 1,599,598 |
| 74 | parse (hex) | 3,174,301 | 0.00032 | 1.77 | 1,587,151 |
| 75 | convert (oklab -> lab) | 2,883,450 | 0.00035 | 0.09 | 1,441,725 |
| 76 | mutateColor | 2,756,662 | 0.00036 | 0.11 | 1,378,332 |
| 77 | convert (oklab -> rgb) | 2,510,837 | 0.00040 | 0.05 | 1,255,419 |
| 78 | convert (rgb -> lab) | 2,462,576 | 0.00041 | 0.06 | 1,231,288 |
| 79 | convert (rgb -> oklab) | 2,390,938 | 0.00042 | 0.06 | 1,195,470 |
| 80 | convert (oklab -> lch) | 2,336,107 | 0.00043 | 0.08 | 1,168,054 |
| 81 | convert (lab -> oklch) | 2,315,415 | 0.00043 | 0.05 | 1,157,708 |
| 82 | parse (rgb) | 2,304,916 | 0.00043 | 0.32 | 1,152,459 |
| 83 | convert (lch -> oklab) | 2,278,774 | 0.00044 | 0.08 | 1,139,387 |
| 84 | convert (oklab -> hwb) | 2,268,796 | 0.00044 | 0.07 | 1,134,399 |
| 85 | createShades | 2,264,689 | 0.00044 | 0.49 | 1,132,345 |
| 86 | convert (oklab -> hsl) | 2,254,536 | 0.00044 | 0.07 | 1,127,268 |
| 87 | createScales | 2,152,971 | 0.00046 | 0.59 | 1,076,486 |
| 88 | parse (hsl) | 2,145,509 | 0.00047 | 1.05 | 1,072,755 |
| 89 | parse (hwb) | 2,099,222 | 0.00048 | 0.97 | 1,049,612 |
| 90 | createConicGradient | 2,056,502 | 0.00049 | 0.44 | 1,028,251 |
| 91 | convert (hwb -> oklab) | 2,040,144 | 0.00049 | 0.10 | 1,020,073 |
| 92 | parse (lch) | 2,034,142 | 0.00049 | 1.23 | 1,017,071 |
| 93 | parse (lab) | 2,020,952 | 0.00049 | 0.25 | 1,010,477 |
| 94 | createLinearGradient | 1,991,625 | 0.00050 | 0.46 | 995,813 |
| 95 | convert (rgb -> oklch) | 1,985,345 | 0.00050 | 0.06 | 992,673 |
| 96 | convert (oklch -> hsl) | 1,959,008 | 0.00051 | 0.08 | 979,504 |
| 97 | convert (oklch -> rgb) | 1,949,360 | 0.00051 | 0.11 | 974,680 |
| 98 | convert (hsl -> oklab) | 1,945,066 | 0.00051 | 0.08 | 972,534 |
| 99 | createRadialGradient | 1,925,042 | 0.00052 | 0.42 | 962,522 |
| 100 | convert (rgb -> lch) | 1,901,626 | 0.00053 | 0.05 | 950,813 |
| 101 | parse (oklab) | 1,900,212 | 0.00053 | 1.04 | 950,107 |
| 102 | convert (lch -> oklch) | 1,881,273 | 0.00053 | 0.05 | 940,637 |
| 103 | convert (hwb -> lab) | 1,841,525 | 0.00054 | 0.16 | 920,763 |
| 104 | getDistance | 1,776,991 | 0.00056 | 0.12 | 888,496 |
| 105 | convert (lch -> rgb) | 1,738,975 | 0.00058 | 0.04 | 869,488 |
| 106 | convert (hsl -> oklch) | 1,733,756 | 0.00058 | 0.09 | 866,879 |
| 107 | convert (hsl -> lab) | 1,725,815 | 0.00058 | 0.19 | 862,908 |
| 108 | checkContrast | 1,684,398 | 0.00059 | 0.06 | 842,200 |
| 109 | convert (lch -> hwb) | 1,644,562 | 0.00061 | 0.05 | 822,293 |
| 110 | convert (lch -> hsl) | 1,629,707 | 0.00061 | 0.05 | 814,854 |
| 111 | convert (hwb -> lch) | 1,616,017 | 0.00062 | 0.10 | 808,009 |
| 112 | parse (oklch) | 1,581,596 | 0.00063 | 1.06 | 790,798 |
| 113 | convert (hwb -> hsl) | 1,551,980 | 0.00064 | 0.11 | 775,990 |
| 114 | convert (hsl -> lch) | 1,538,647 | 0.00065 | 0.08 | 769,324 |
| 115 | checkContrastBulk | 1,513,606 | 0.00066 | 0.14 | 756,803 |
| 116 | convert (hsl -> hwb) | 1,484,674 | 0.00067 | 0.11 | 742,338 |
| 117 | createMultiColorGradient | 1,248,429 | 0.00080 | 0.41 | 624,215 |
| 118 | createHarmony | 982,279 | 0.00102 | 0.48 | 491,140 |
| 119 | createSmoothGradient | 632,842 | 0.00158 | 0.46 | 316,421 |
| 120 | clearPool | 486,311 | 0.00206 | 0.71 | 243,156 |
| 121 | preallocatePool | 478,792 | 0.00209 | 0.72 | 239,396 |
| 122 | matchContrast | 122,846 | 0.00814 | 0.08 | 61,423 |
| 123 | matchScales | 22,677 | 0.04410 | 0.46 | 11,339 |
| 124 | findClosestName | 9,664 | 0.10348 | 0.53 | 4,833 |
| 125 | getExactName | 9,607 | 0.10409 | 0.47 | 4,804 |
| 126 | findSimilarNames | 7,735 | 0.12929 | 0.44 | 3,868 |

## Optimization Targets

### Critical Priority

| Function | Ops/sec | Mean (ms) | Notes |
|----------|---------|-----------|-------|
| findSimilarNames | 7,735 | 0.129 | Slowest overall; linear scan over color name database |
| getExactName | 9,607 | 0.104 | Same naming lookup bottleneck |
| findClosestName | 9,664 | 0.103 | Same naming lookup bottleneck; consider spatial indexing |
| matchScales | 22,677 | 0.044 | Complex iterative scale matching algorithm |

### High Priority

| Function | Ops/sec | Mean (ms) | Notes |
|----------|---------|-----------|-------|
| matchContrast | 122,846 | 0.008 | Iterative contrast matching; consider early-exit |
| preallocatePool | 478,792 | 0.002 | Pool warmup cost; consider lazy allocation |
| clearPool | 486,311 | 0.002 | Pool reset overhead |
| createSmoothGradient | 632,842 | 0.002 | Heavy per-pixel computation |
| createHarmony | 982,279 | 0.001 | Multiple color derivations |
| createMultiColorGradient | 1,248,429 | 0.001 | Multi-stop gradient computation |
| parse (oklch) | 1,581,596 | 0.001 | RME 1.06% — unstable parsing complexity |
| checkContrastBulk | 1,513,606 | 0.001 | Bulk O(n) comparisons |

### Medium Priority (High Variance — RME > 1%)

| Function | Ops/sec | RME (%) | Notes |
|----------|---------|---------|-------|
| fromPicker | 3,350,273 | 2.87 | Very unstable |
| parse (hex) | 3,174,301 | 1.77 | Hex parsing variance |
| mixColor | 7,034,668 | 1.65 | Unstable |
| parseColorName | 4,127,230 | 1.41 | Unstable |
| createColor | 8,014,793 | 1.35 | Unstable |
| parse (lch) | 2,034,142 | 1.23 | LCH parsing variance |
| createPicker | 4,499,266 | 1.27 | Unstable |
| format (rgb) | 10,468,654 | 1.04 | RGB formatting variance |
| parse (hsl) | 2,145,509 | 1.05 | HSL parsing variance |
| parse (oklab) | 1,900,212 | 1.04 | OKLab parsing variance |
