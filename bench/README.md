# Benchmarks

Performance data for the low-level color conversion engine.

---

## Adapters — CAT

| Benchmark                              | Operations/sec | Mean (μs) |
| -------------------------------------- | -------------- | --------- |
| adapters (xyz65-to-xyz50)              | 16,982,006     | 0.059     |
| adapters (xyz65-to-xyz50-zeros)        | 17,461,137     | 0.057     |
| adapters (xyz65-to-xyz50-negatives)    | 9,854,504      | 0.101     |
| adapters (xyz50-to-xyz65)              | 9,198,960      | 0.109     |
| adapters (xyz50-to-xyz65-zeros)        | 17,952,447     | 0.056     |
| adapters (xyz50-to-xyz65-negatives)    | 17,981,163     | 0.056     |
| adapters (matrix-multiply)             | 10,007,810     | 0.100     |
| adapters (matrix-multiply-zero-vector) | 9,976,963      | 0.100     |
| adapters (matrix-multiply-in-place)    | 10,049,224     | 0.100     |

---

## Adapters — D50

| Benchmark                         | Operations/sec | Mean (μs) |
| --------------------------------- | -------------- | --------- |
| adapters (xyz50-to-lab)           | 6,854,635      | 0.146     |
| adapters (xyz50-to-lab-zeros)     | 9,374,174      | 0.107     |
| adapters (xyz50-to-lab-negatives) | 9,771,008      | 0.102     |
| adapters (lab-to-xyz50)           | 9,924,456      | 0.101     |
| adapters (lab-to-xyz50-zeros)     | 9,405,603      | 0.106     |
| adapters (lab-to-xyz50-negatives) | 9,308,658      | 0.107     |

---

## Adapters — D65

| Benchmark                           | Operations/sec | Mean (μs) |
| ----------------------------------- | -------------- | --------- |
| adapters (xyz65-to-oklab)           | 6,719,626      | 0.149     |
| adapters (xyz65-to-oklab-zeros)     | 8,976,111      | 0.111     |
| adapters (xyz65-to-oklab-negatives) | 6,848,812      | 0.146     |
| adapters (xyz65-to-lrgb)            | 8,892,067      | 0.112     |
| adapters (xyz65-to-lrgb-zeros)      | 8,606,442      | 0.116     |
| adapters (xyz65-to-lrgb-negatives)  | 8,671,438      | 0.115     |
| adapters (oklab-to-xyz65)           | 18,117,230     | 0.055     |
| adapters (oklab-to-xyz65-zeros)     | 9,866,227      | 0.101     |
| adapters (oklab-to-xyz65-negatives) | 9,885,762      | 0.101     |
| adapters (lrgb-to-xyz65)            | 8,738,692      | 0.114     |
| adapters (lrgb-to-xyz65-zeros)      | 8,552,616      | 0.117     |
| adapters (lrgb-to-xyz65-negatives)  | 8,531,605      | 0.117     |

---

## Adapters — Gamma

| Benchmark                        | Operations/sec | Mean (μs) |
| -------------------------------- | -------------- | --------- |
| adapters (rgb-to-lrgb)           | 6,269,633      | 0.159     |
| adapters (rgb-to-lrgb-zeros)     | 9,915,655      | 0.101     |
| adapters (rgb-to-lrgb-negatives) | 9,953,325      | 0.100     |
| adapters (lrgb-to-rgb)           | 6,311,981      | 0.158     |
| adapters (lrgb-to-rgb-zeros)     | 9,950,028      | 0.101     |
| adapters (lrgb-to-rgb-negatives) | 9,952,494      | 0.100     |

---

## Adapters — Polar

| Benchmark                           | Operations/sec | Mean (μs) |
| ----------------------------------- | -------------- | --------- |
| adapters (oklch-to-oklab)           | 9,081,438      | 0.110     |
| adapters (oklch-to-oklab-zeros)     | 9,265,535      | 0.108     |
| adapters (oklch-to-oklab-negatives) | 6,641,528      | 0.151     |
| adapters (oklab-to-oklch)           | 10,568,895     | 0.095     |
| adapters (oklab-to-oklch-zeros)     | 17,972,349     | 0.056     |
| adapters (oklab-to-oklch-negatives) | 13,807,020     | 0.072     |
| adapters (lch-to-lab)               | 7,149,027      | 0.140     |
| adapters (lch-to-lab-zeros)         | 8,773,168      | 0.114     |
| adapters (lch-to-lab-negatives)     | 6,426,564      | 0.156     |
| adapters (lab-to-lch)               | 7,914,739      | 0.126     |
| adapters (lab-to-lch-zeros)         | 14,030,048     | 0.071     |
| adapters (lab-to-lch-negatives)     | 13,920,710     | 0.072     |

---

## Adapters — sRGB

| Benchmark                       | Operations/sec | Mean (μs) |
| ------------------------------- | -------------- | --------- |
| adapters (rgb-to-hsv)           | 9,613,678      | 0.104     |
| adapters (rgb-to-hsv-zeros)     | 18,090,649     | 0.055     |
| adapters (rgb-to-hsv-negatives) | 17,603,323     | 0.057     |
| adapters (hwb-to-hsv)           | 10,255,850     | 0.098     |
| adapters (hwb-to-hsv-zeros)     | 10,130,419     | 0.099     |
| adapters (hwb-to-hsv-negatives) | 10,174,981     | 0.098     |
| adapters (hsv-to-rgb)           | 16,812,989     | 0.059     |
| adapters (hsv-to-rgb-zeros)     | 19,134,956     | 0.052     |
| adapters (hsv-to-rgb-negatives) | 16,615,486     | 0.060     |
| adapters (hsv-to-hwb)           | 10,236,291     | 0.098     |
| adapters (hsv-to-hwb-zeros)     | 10,203,870     | 0.098     |
| adapters (hsv-to-hwb-negatives) | 10,252,619     | 0.098     |
| adapters (hsv-to-hsl)           | 18,578,005     | 0.054     |
| adapters (hsv-to-hsl-zeros)     | 18,792,248     | 0.053     |
| adapters (hsv-to-hsl-negatives) | 18,586,698     | 0.054     |
| adapters (hsl-to-hsv)           | 12,253,837     | 0.082     |
| adapters (hsl-to-hsv-zeros)     | 10,275,793     | 0.097     |
| adapters (hsl-to-hsv-negatives) | 10,182,268     | 0.098     |

---

## Convert

| Benchmark                | Operations/sec | Mean (μs) |
| ------------------------ | -------------- | --------- |
| convert (rgb-to-rgb)     | 13,843,406     | 0.072     |
| convert (rgb-to-hsl)     | 8,948,047      | 0.112     |
| convert (rgb-to-hsv)     | 10,517,066     | 0.095     |
| convert (rgb-to-hwb)     | 7,985,015      | 0.125     |
| convert (rgb-to-lrgb)    | 5,027,610      | 0.199     |
| convert (rgb-to-lab)     | 2,568,295      | 0.389     |
| convert (rgb-to-lch)     | 1,831,083      | 0.546     |
| convert (rgb-to-oklab)   | 2,578,864      | 0.388     |
| convert (rgb-to-oklch)   | 1,979,513      | 0.505     |
| convert (hsl-to-rgb)     | 3,354,657      | 0.298     |
| convert (hsl-to-hsl)     | 5,783,416      | 0.173     |
| convert (hsl-to-hsv)     | 4,793,431      | 0.209     |
| convert (hsl-to-hwb)     | 1,629,626      | 0.614     |
| convert (hsl-to-lrgb)    | 2,071,163      | 0.483     |
| convert (hsl-to-lab)     | 1,819,496      | 0.550     |
| convert (hsl-to-lch)     | 1,571,701      | 0.636     |
| convert (hsl-to-oklab)   | 1,974,428      | 0.506     |
| convert (hsl-to-oklch)   | 1,640,798      | 0.609     |
| convert (hsv-to-rgb)     | 4,525,882      | 0.221     |
| convert (hsv-to-hsl)     | 8,738,581      | 0.114     |
| convert (hsv-to-hsv)     | 10,059,012     | 0.099     |
| convert (hsv-to-hwb)     | 8,297,092      | 0.121     |
| convert (hsv-to-lrgb)    | 3,824,251      | 0.261     |
| convert (hsv-to-lab)     | 3,040,100      | 0.329     |
| convert (hsv-to-lch)     | 1,552,357      | 0.644     |
| convert (hsv-to-oklab)   | 2,010,190      | 0.497     |
| convert (hsv-to-oklch)   | 1,676,697      | 0.596     |
| convert (hwb-to-rgb)     | 3,242,864      | 0.308     |
| convert (hwb-to-hsl)     | 1,639,021      | 0.610     |
| convert (hwb-to-hsv)     | 4,883,300      | 0.205     |
| convert (hwb-to-hwb)     | 5,682,549      | 0.176     |
| convert (hwb-to-lrgb)    | 2,056,049      | 0.486     |
| convert (hwb-to-lab)     | 1,862,802      | 0.537     |
| convert (hwb-to-lch)     | 1,574,767      | 0.635     |
| convert (hwb-to-oklab)   | 1,965,301      | 0.509     |
| convert (hwb-to-oklch)   | 1,650,581      | 0.606     |
| convert (lrgb-to-rgb)    | 3,358,920      | 0.298     |
| convert (lrgb-to-hsl)    | 1,934,922      | 0.517     |
| convert (lrgb-to-hsv)    | 2,017,536      | 0.496     |
| convert (lrgb-to-hwb)    | 1,947,991      | 0.513     |
| convert (lrgb-to-lrgb)   | 5,683,827      | 0.176     |
| convert (lrgb-to-lab)    | 4,728,455      | 0.211     |
| convert (lrgb-to-lch)    | 3,814,993      | 0.262     |
| convert (lrgb-to-oklab)  | 5,339,491      | 0.187     |
| convert (lrgb-to-oklch)  | 2,256,499      | 0.443     |
| convert (lab-to-rgb)     | 2,246,984      | 0.445     |
| convert (lab-to-hsl)     | 2,101,208      | 0.476     |
| convert (lab-to-hsv)     | 2,174,384      | 0.460     |
| convert (lab-to-hwb)     | 2,083,624      | 0.480     |
| convert (lab-to-lrgb)    | 2,889,583      | 0.346     |
| convert (lab-to-lab)     | 5,926,873      | 0.169     |
| convert (lab-to-lch)     | 4,625,393      | 0.216     |
| convert (lab-to-oklab)   | 2,799,505      | 0.357     |
| convert (lab-to-oklch)   | 2,130,373      | 0.469     |
| convert (lch-to-rgb)     | 2,716,609      | 0.368     |
| convert (lch-to-hsl)     | 3,208,382      | 0.312     |
| convert (lch-to-hsv)     | 3,312,445      | 0.302     |
| convert (lch-to-hwb)     | 3,202,777      | 0.312     |
| convert (lch-to-lrgb)    | 4,136,695      | 0.242     |
| convert (lch-to-lab)     | 8,308,194      | 0.120     |
| convert (lch-to-lch)     | 8,362,312      | 0.120     |
| convert (lch-to-oklab)   | 2,149,019      | 0.465     |
| convert (lch-to-oklch)   | 1,769,966      | 0.565     |
| convert (oklab-to-rgb)   | 2,481,133      | 0.403     |
| convert (oklab-to-hsl)   | 2,270,879      | 0.440     |
| convert (oklab-to-hsv)   | 2,373,349      | 0.421     |
| convert (oklab-to-hwb)   | 2,298,602      | 0.435     |
| convert (oklab-to-lrgb)  | 3,204,406      | 0.312     |
| convert (oklab-to-lab)   | 2,701,125      | 0.370     |
| convert (oklab-to-lch)   | 2,175,028      | 0.460     |
| convert (oklab-to-oklab) | 6,039,787      | 0.166     |
| convert (oklab-to-oklch) | 8,734,482      | 0.114     |
| convert (oklch-to-rgb)   | 3,665,172      | 0.273     |
| convert (oklch-to-hsl)   | 3,354,408      | 0.298     |
| convert (oklch-to-hsv)   | 3,501,982      | 0.286     |
| convert (oklch-to-hwb)   | 3,381,473      | 0.296     |
| convert (oklch-to-lrgb)  | 4,457,625      | 0.224     |
| convert (oklch-to-lab)   | 2,103,561      | 0.475     |
| convert (oklch-to-lch)   | 1,754,667      | 0.570     |
| convert (oklch-to-oklab) | 4,575,271      | 0.219     |
| convert (oklch-to-oklch) | 6,055,905      | 0.165     |

---

## Convert — Hue

| Benchmark           | Operations/sec | Mean (μs) |
| ------------------- | -------------- | --------- |
| convert (hue-rgb)   | 5,683,807      | 0.176     |
| convert (hue-hsl)   | 5,631,597      | 0.178     |
| convert (hue-hsv)   | 5,561,469      | 0.180     |
| convert (hue-hwb)   | 5,912,511      | 0.169     |
| convert (hue-lrgb)  | 2,349,789      | 0.426     |
| convert (hue-lab)   | 4,765,786      | 0.210     |
| convert (hue-lch)   | 5,885,301      | 0.170     |
| convert (hue-oklab) | 4,687,908      | 0.213     |
| convert (hue-oklch) | 10,309,680     | 0.097     |

---

## Format

| Benchmark                  | Operations/sec | Mean (μs) |
| -------------------------- | -------------- | --------- |
| format (hex)               | 10,387,779     | 0.096     |
| format (rgb)               | 10,029,650     | 0.100     |
| format (hsl)               | 9,251,955      | 0.108     |
| format (hwb)               | 8,190,464      | 0.122     |
| format (lab)               | 4,930,437      | 0.203     |
| format (lch)               | 4,967,866      | 0.201     |
| format (oklab)             | 5,335,456      | 0.187     |
| format (oklch)             | 4,812,222      | 0.208     |
| format (black)             | 8,804,432      | 0.114     |
| format (white)             | 7,168,785      | 0.139     |
| format (with-alpha)        | 6,173,984      | 0.162     |
| format (opaque-alpha)      | 7,160,347      | 0.140     |
| round (precision-0)        | 10,685,880     | 0.094     |
| round (precision-2)        | 11,701,981     | 0.085     |
| round (precision-4)        | 19,201,923     | 0.052     |
| round (negative-precision) | 17,209,286     | 0.058     |
| round (capped-precision)   | 10,718,203     | 0.093     |

---

## Matrix

| Benchmark                             | Operations/sec | Mean (μs) |
| ------------------------------------- | -------------- | --------- |
| matrix (create-instance)              | 8,038,391      | 0.124     |
| matrix (reuse-from-pool)              | 5,566,829      | 0.180     |
| matrix (create-new-empty-pool)        | 6,056,677      | 0.165     |
| matrix (create-color-values)          | 5,223,474      | 0.191     |
| matrix (create-color-default-alpha)   | 5,627,907      | 0.178     |
| matrix (create-color-custom-alpha)    | 5,591,248      | 0.179     |
| matrix (create-color-pool-allocation) | 3,518,788      | 0.284     |
| matrix (drop-to-pool)                 | 9,045,783      | 0.111     |
| matrix (drop-max-pool-limit)          | 420,632        | 2.377     |
| matrix (drop-to-pool)                 | 8,882,975      | 0.113     |
| matrix (drop-no-mutation)             | 10,974,380     | 0.091     |
| matrix (clone-color-oklab)            | 11,620,217     | 0.086     |
| matrix (clone-color-preserve-alpha)   | 8,169,307      | 0.122     |
| matrix (clone-color-buffer-copy)      | 6,633,036      | 0.151     |
| matrix (clear-preallocated)           | 1,841,983      | 0.543     |
| matrix (clear-after-drop)             | 6,216,559      | 0.161     |
| matrix (preallocate-matrices)         | 2,558,569      | 0.391     |
| matrix (preallocate-max-cap)          | 89,972         | 11.115    |

---

## Parse

| Benchmark       | Operations/sec | Mean (μs) |
| --------------- | -------------- | --------- |
| parse (hex)     | 5,269,525      | 0.190     |
| parse (rgb)     | 1,479,881      | 0.676     |
| parse (hsl)     | 1,067,160      | 0.937     |
| parse (hwb)     | 1,079,189      | 0.927     |
| parse (lab)     | 1,068,189      | 0.936     |
| parse (lch)     | 1,043,098      | 0.959     |
| parse (oklab)   | 1,014,510      | 0.986     |
| parse (oklch)   | 1,002,821      | 0.997     |
| parse (6-digit) | 19,993,548     | 0.050     |
| parse (3-digit) | 19,779,051     | 0.051     |
| parse (8-digit) | 11,003,065     | 0.091     |
| parse (4-digit) | 10,925,899     | 0.092     |

---

## Shared

| Benchmark                               | Operations/sec | Mean (μs) |
| --------------------------------------- | -------------- | --------- |
| mutate (rgb-to-oklab)                   | 19,477,646     | 0.051     |
| mutate (identity-rgb)                   | 19,469,635     | 0.051     |
| mutate (preserve-alpha)                 | 10,530,332     | 0.095     |
| mutate (sequential-rgb-to-hsl-to-oklab) | 2,522,654      | 0.396     |
| derive (rgb-to-oklab)                   | 2,787,719      | 0.359     |
| derive (preserve-alpha)                 | 3,902,298      | 0.256     |
| derive (rgb-to-rgb)                     | 6,003,347      | 0.167     |

---

## Utilities — Compare

| Benchmark                          | Operations/sec | Mean (μs) |
| ---------------------------------- | -------------- | --------- |
| compare (equal-same-reference)     | 10,920,853     | 0.092     |
| compare (equal-different-space)    | 3,277,826      | 0.305     |
| compare (equal-alpha-mismatch)     | 9,790,800      | 0.102     |
| compare (equal-with-tolerance)     | 17,038,461     | 0.059     |
| compare (distance-same-space)      | 1,837,191      | 0.544     |
| compare (distance-different-space) | 1,396,065      | 0.716     |
| compare (distance-to-oklab)        | 2,250,069      | 0.444     |

---

## Utilities — Contrast

| Benchmark                         | Operations/sec | Mean (μs) |
| --------------------------------- | -------------- | --------- |
| contrast (white-on-black)         | 3,584,192      | 0.279     |
| contrast (black-on-white)         | 3,376,910      | 0.296     |
| contrast (identical-colors)       | 3,086,187      | 0.324     |
| contrast (text-on-dark-bg)        | 1,557,863      | 0.642     |
| contrast (bulk)                   | 1,112,805      | 0.899     |
| contrast (bulk-larger-set)        | 712,258        | 1.404     |
| contrast (bulk-empty)             | 3,422,188      | 0.292     |
| contrast (scales-small-step)      | 18,744         | 53.351    |
| contrast (scales-multi-stop)      | 9,398          | 106.407   |
| contrast (scales-high-resolution) | 1,862          | 537.065   |
| contrast (match-lighten-on-black) | 190,677        | 5.244     |
| contrast (match-darken-on-white)  | 177,638        | 5.629     |
| contrast (match-with-alpha)       | 195,618        | 5.112     |
| contrast (rating-platinum)        | 20,211,473     | 0.049     |
| contrast (rating-gold)            | 19,685,186     | 0.051     |
| contrast (rating-bronze)          | 16,218,574     | 0.062     |
| contrast (rating-fail)            | 11,102,349     | 0.090     |

---

## Utilities — Gamut

| Benchmark                     | Operations/sec | Mean (μs) |
| ----------------------------- | -------------- | --------- |
| gamut (check-in-gamut-rgb)    | 11,593,611     | 0.086     |
| gamut (check-out-gamut-rgb)   | 18,211,163     | 0.055     |
| gamut (check-out-gamut-oklch) | 17,490,115     | 0.057     |
| gamut (check-high-tolerance)  | 9,501,696      | 0.105     |
| gamut (check-hue-rotation)    | 9,590,726      | 0.104     |
| gamut (clamp-in-gamut)        | 18,866,222     | 0.053     |
| gamut (clamp-out-gamut-rgb)   | 18,732,276     | 0.053     |
| gamut (clamp-hue-wrapping)    | 7,560,052      | 0.132     |
| gamut (clamp-mutate-true)     | 10,159,630     | 0.098     |
| gamut (clamp-mutate-false)    | 6,707,179      | 0.149     |

---

## Utilities — Gradient

| Benchmark                              | Operations/sec | Mean (μs) |
| -------------------------------------- | -------------- | --------- |
| gradient (smooth-linear)               | 431,614        | 2.317     |
| gradient (smooth-linear-high-fidelity) | 151,400        | 6.605     |
| gradient (smooth-radial-custom)        | 525,371        | 1.903     |
| gradient (smooth-edge-case-steps)      | 2,105,142      | 0.475     |
| gradient (linear-default-angle)        | 2,694,538      | 0.371     |
| gradient (linear-custom-angle)         | 4,831,710      | 0.207     |
| gradient (linear-multi-stop-no-pos)    | 1,768,067      | 0.566     |
| gradient (radial-default-params)       | 4,964,194      | 0.201     |
| gradient (radial-custom-shape-pos)     | 2,588,622      | 0.386     |
| gradient (radial-multi-stop-no-pos)    | 2,201,890      | 0.454     |
| gradient (multi-linear-default)        | 1,832,896      | 0.546     |
| gradient (multi-single-color)          | 5,104,739      | 0.196     |
| gradient (multi-radial-custom)         | 2,447,172      | 0.409     |
| gradient (multi-large-set)             | 617,163        | 1.620     |
| gradient (conic-default-params)        | 3,087,816      | 0.324     |
| gradient (conic-custom-params)         | 3,617,798      | 0.276     |
| gradient (conic-multi-stop)            | 3,279,742      | 0.305     |

---

## Utilities — Naming

| Benchmark                                   | Operations/sec | Mean (μs) |
| ------------------------------------------- | -------------- | --------- |
| naming (parse)                              | 4,812,483      | 0.208     |
| naming (parse-case-insensitive)             | 3,544,188      | 0.282     |
| naming (parse-invalid)                      | 16,128,645     | 0.062     |
| naming (parse-long-name)                    | 7,508,548      | 0.133     |
| naming (exact-match)                        | 26,283         | 38.047    |
| naming (exact-near-match-default-tolerance) | 23,387         | 42.759    |
| naming (exact-near-match-strict-tolerance)  | 22,798         | 43.863    |
| naming (exact-no-match)                     | 20,277         | 49.316    |
| naming (similar-small-limit)                | 9,355          | 106.894   |
| naming (similar-limit)                      | 9,386          | 106.539   |
| naming (similar-large-limit)                | 9,315          | 107.357   |
| naming (similar-mid-tone)                   | 8,539          | 117.113   |
| naming (closest-exact-match)                | 14,927         | 66.993    |
| naming (closest-approximate-match)          | 12,120         | 82.509    |
| naming (closest-named-constant)             | 13,764         | 72.651    |
| naming (closest-boundary-case)              | 11,966         | 83.569    |

---

## Utilities — Palette

| Benchmark                               | Operations/sec | Mean (μs) |
| --------------------------------------- | -------------- | --------- |
| palette (mix-rgb-linear)                | 7,255,701      | 0.138     |
| palette (mix-hsl-shortest-hue)          | 5,082,963      | 0.197     |
| palette (mix-ratio-clamping)            | 4,859,767      | 0.206     |
| palette (mix-zero-ratio-copy)           | 6,894,107      | 0.145     |
| palette (shades-5-steps)                | 717,571        | 1.394     |
| palette (shades-high-fidelity-25-steps) | 245,349        | 4.076     |
| palette (shades-alpha-interpolation)    | 962,377        | 1.039     |
| palette (shades-single-step-edge)       | 5,770,831      | 0.173     |
| palette (shades-invalid-steps)          | 9,274,216      | 0.108     |
| palette (scales-two-stops)              | 693,127        | 1.443     |
| palette (scales-multi-stop-segmented)   | 421,067        | 2.375     |
| palette (scales-high-resolution)        | 68,663         | 14.564    |
| palette (scales-single-stop-edge)       | 5,408,840      | 0.185     |
| palette (scales-empty-steps)            | 19,888,003     | 0.050     |
| palette (harmony-rgb)                   | 1,362,544      | 0.734     |
| palette (harmony-hsl-hue-wrapping)      | 3,327,848      | 0.300     |
| palette (harmony-high-density)          | 474,137        | 2.109     |

---

## Utilities — Picker

| Benchmark                             | Operations/sec | Mean (μs) |
| ------------------------------------- | -------------- | --------- |
| picker (to-rgb)                       | 5,854,622      | 0.171     |
| picker (to-rgb-transparent)           | 5,553,503      | 0.180     |
| picker (to-from-oklch)                | 2,661,822      | 0.376     |
| picker (to-from-hsl)                  | 5,641,138      | 0.177     |
| picker (lifecycle-create-dispose)     | 2,244,569      | 0.446     |
| picker (update-saturation-brightness) | 2,433,767      | 0.411     |
| picker (update-hue)                   | 2,467,828      | 0.405     |
| picker (assign-achromatic)            | 2,043,208      | 0.489     |
| picker (get-pooled-colors)            | 1,856,294      | 0.539     |
| picker (subscription-notify)          | 2,104,347      | 0.475     |

---

## Utilities — Simulate

| Benchmark                           | Operations/sec | Mean (μs) |
| ----------------------------------- | -------------- | --------- |
| simulate (deficiency-protanopia)    | 6,859,910      | 0.146     |
| simulate (deficiency-deuteranopia)  | 6,831,563      | 0.146     |
| simulate (deficiency-tritanopia)    | 6,550,046      | 0.153     |
| simulate (deficiency-achromatopsia) | 6,595,841      | 0.152     |
| simulate (deficiency-srgb)          | 4,513,965      | 0.222     |
| simulate (deficiency-none)          | 8,039,033      | 0.124     |
| simulate (anomaly-protanopia)       | 4,877,413      | 0.205     |
| simulate (anomaly-deuteranopia)     | 4,824,987      | 0.207     |
| simulate (anomaly-tritanopia)       | 4,662,224      | 0.214     |
| simulate (anomaly-none)             | 4,514,530      | 0.222     |
| simulate (anomaly-full)             | 3,688,091      | 0.271     |
| simulate (ambient-default)          | 3,878,152      | 0.258     |
| simulate (ambient-high)             | 3,620,416      | 0.276     |
| simulate (ambient-srgb)             | 2,653,874      | 0.377     |
| simulate (ambient-none)             | 3,670,544      | 0.272     |
| simulate (ambient-washout)          | 3,664,075      | 0.273     |

---

## Notes

- All benchmarks run with 500ms sample time per operation
- Results show mean operations per second (Hz) and mean execution time in microseconds (μs)
