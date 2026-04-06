# Benchmarks

Performance data for the low-level color conversion engine.

---

## Adapters — CAT

| Benchmark                              | Operations/sec | Mean (μs) |
| -------------------------------------- | -------------- | --------- |
| adapters (xyz65-to-xyz50)              | 9,753,191      | 0.103     |
| adapters (xyz65-to-xyz50-zeros)        | 9,779,992      | 0.102     |
| adapters (xyz65-to-xyz50-negatives)    | 9,858,009      | 0.101     |
| adapters (xyz50-to-xyz65)              | 10,032,189     | 0.100     |
| adapters (xyz50-to-xyz65-zeros)        | 9,960,095      | 0.100     |
| adapters (xyz50-to-xyz65-negatives)    | 9,991,090      | 0.100     |
| adapters (matrix-multiply)             | 9,850,093      | 0.101     |
| adapters (matrix-multiply-zero-vector) | 9,957,106      | 0.100     |
| adapters (matrix-multiply-in-place)    | 10,106,749     | 0.099     |

---

## Adapters — D50

| Benchmark                         | Operations/sec | Mean (μs) |
| --------------------------------- | -------------- | --------- |
| adapters (xyz50-to-lab)           | 6,684,882      | 0.150     |
| adapters (xyz50-to-lab-zeros)     | 9,711,798      | 0.103     |
| adapters (xyz50-to-lab-negatives) | 9,594,792      | 0.104     |
| adapters (lab-to-xyz50)           | 9,956,564      | 0.100     |
| adapters (lab-to-xyz50-zeros)     | 9,440,719      | 0.106     |
| adapters (lab-to-xyz50-negatives) | 9,473,308      | 0.106     |

---

## Adapters — D65

| Benchmark                           | Operations/sec | Mean (μs) |
| ----------------------------------- | -------------- | --------- |
| adapters (xyz65-to-oklab)           | 6,437,823      | 0.155     |
| adapters (xyz65-to-oklab-zeros)     | 8,788,517      | 0.114     |
| adapters (xyz65-to-oklab-negatives) | 6,437,823      | 0.155     |
| adapters (xyz65-to-lrgb)            | 8,766,302      | 0.114     |
| adapters (xyz65-to-lrgb-zeros)      | 8,761,630      | 0.114     |
| adapters (xyz65-to-lrgb-negatives)  | 8,740,233      | 0.114     |
| adapters (oklab-to-xyz65)           | 9,765,936      | 0.102     |
| adapters (oklab-to-xyz65-zeros)     | 9,730,329      | 0.103     |
| adapters (oklab-to-xyz65-negatives) | 9,723,089      | 0.103     |
| adapters (lrgb-to-xyz65)            | 8,816,708      | 0.113     |
| adapters (lrgb-to-xyz65-zeros)      | 8,807,001      | 0.114     |
| adapters (lrgb-to-xyz65-negatives)  | 8,851,823      | 0.113     |

---

## Adapters — Gamma

| Benchmark                        | Operations/sec | Mean (μs) |
| -------------------------------- | -------------- | --------- |
| adapters (rgb-to-lrgb)           | 6,405,669      | 0.156     |
| adapters (rgb-to-lrgb-zeros)     | 6,404,892      | 0.156     |
| adapters (rgb-to-lrgb-negatives) | 10,084,618     | 0.099     |
| adapters (lrgb-to-rgb)           | 6,210,831      | 0.161     |
| adapters (lrgb-to-rgb-zeros)     | 6,206,944      | 0.161     |
| adapters (lrgb-to-rgb-negatives) | 9,993,845      | 0.100     |

---

## Adapters — Polar

| Benchmark                           | Operations/sec | Mean (μs) |
| ----------------------------------- | -------------- | --------- |
| adapters (oklch-to-oklab)           | 9,435,806      | 0.106     |
| adapters (oklch-to-oklab-zeros)     | 9,410,535      | 0.106     |
| adapters (oklch-to-oklab-negatives) | 8,987,228      | 0.111     |
| adapters (oklab-to-oklch)           | 8,612,561      | 0.116     |
| adapters (oklab-to-oklch-zeros)     | 8,598,229      | 0.116     |
| adapters (oklab-to-oklch-negatives) | 7,814,412      | 0.128     |
| adapters (lch-to-lab)               | 6,447,896      | 0.155     |
| adapters (lch-to-lab-zeros)         | 6,415,234      | 0.156     |
| adapters (lch-to-lab-negatives)     | 6,249,105      | 0.160     |
| adapters (lab-to-lch)               | 7,798,227      | 0.128     |
| adapters (lab-to-lch-zeros)         | 7,742,562      | 0.129     |
| adapters (lab-to-lch-negatives)     | 6,387,341      | 0.157     |

---

## Adapters — sRGB

| Benchmark                       | Operations/sec | Mean (μs) |
| ------------------------------- | -------------- | --------- |
| adapters (rgb-to-hsv)           | 6,599,505      | 0.152     |
| adapters (rgb-to-hsv-zeros)     | 5,868,394      | 0.170     |
| adapters (rgb-to-hsv-negatives) | 4,960,123      | 0.202     |
| adapters (hwb-to-hsv)           | 5,016,723      | 0.199     |
| adapters (hwb-to-hsv-zeros)     | 5,104,992      | 0.196     |
| adapters (hwb-to-hsv-negatives) | 4,328,831      | 0.231     |
| adapters (hsv-to-rgb)           | 4,581,324      | 0.218     |
| adapters (hsv-to-rgb-zeros)     | 4,621,562      | 0.216     |
| adapters (hsv-to-rgb-negatives) | 3,927,427      | 0.255     |
| adapters (hsv-to-hwb)           | 4,861,733      | 0.206     |
| adapters (hsv-to-hwb-zeros)     | 4,897,396      | 0.204     |
| adapters (hsv-to-hwb-negatives) | 4,143,329      | 0.241     |
| adapters (hsv-to-hsl)           | 4,902,384      | 0.204     |
| adapters (hsv-to-hsl-zeros)     | 3,538,282      | 0.283     |
| adapters (hsv-to-hsl-negatives) | 2,998,489      | 0.334     |
| adapters (hsl-to-hsv)           | 6,508,274      | 0.154     |
| adapters (hsl-to-hsv-zeros)     | 4,377,982      | 0.228     |
| adapters (hsl-to-hsv-negatives) | 3,726,562      | 0.268     |

---

## Convert

| Benchmark                | Operations/sec | Mean (μs) |
| ------------------------ | -------------- | --------- |
| convert (rgb-to-rgb)     | 7,493,226      | 0.133     |
| convert (rgb-to-hsl)     | 5,308,031      | 0.188     |
| convert (rgb-to-hsv)     | 6,599,506      | 0.152     |
| convert (rgb-to-hwb)     | 4,887,246      | 0.205     |
| convert (rgb-to-lrgb)    | 5,845,384      | 0.171     |
| convert (rgb-to-lab)     | 2,747,805      | 0.364     |
| convert (rgb-to-lch)     | 2,061,590      | 0.485     |
| convert (rgb-to-oklab)   | 2,796,734      | 0.358     |
| convert (rgb-to-oklch)   | 2,143,839      | 0.466     |
| convert (hsl-to-rgb)     | 3,658,857      | 0.273     |
| convert (hsl-to-hsl)     | 6,183,403      | 0.162     |
| convert (hsl-to-hsv)     | 4,796,133      | 0.209     |
| convert (hsl-to-hwb)     | 1,628,302      | 0.614     |
| convert (hsl-to-lrgb)    | 2,205,546      | 0.453     |
| convert (hsl-to-lab)     | 1,930,365      | 0.518     |
| convert (hsl-to-lch)     | 1,632,326      | 0.613     |
| convert (hsl-to-oklab)   | 2,127,727      | 0.470     |
| convert (hsl-to-oklch)   | 1,736,587      | 0.576     |
| convert (hsv-to-rgb)     | 4,581,324      | 0.218     |
| convert (hsv-to-hsl)     | 4,902,384      | 0.204     |
| convert (hsv-to-hsv)     | 6,072,930      | 0.165     |
| convert (hsv-to-hwb)     | 4,861,734      | 0.206     |
| convert (hsv-to-lrgb)    | 2,209,355      | 0.453     |
| convert (hsv-to-lab)     | 1,917,416      | 0.522     |
| convert (hsv-to-lch)     | 1,365,743      | 0.732     |
| convert (hsv-to-oklab)   | 1,902,079      | 0.526     |
| convert (hsv-to-oklch)   | 1,741,638      | 0.574     |
| convert (hwb-to-rgb)     | 3,645,957      | 0.274     |
| convert (hwb-to-hsl)     | 1,597,663      | 0.626     |
| convert (hwb-to-hsv)     | 5,016,728      | 0.199     |
| convert (hwb-to-hwb)     | 6,079,331      | 0.164     |
| convert (hwb-to-lrgb)    | 2,197,063      | 0.455     |
| convert (hwb-to-lab)     | 1,937,768      | 0.516     |
| convert (hwb-to-lch)     | 1,637,128      | 0.611     |
| convert (hwb-to-oklab)   | 2,144,209      | 0.466     |
| convert (hwb-to-oklch)   | 1,734,823      | 0.576     |
| convert (lrgb-to-rgb)    | 3,571,482      | 0.280     |
| convert (lrgb-to-hsl)    | 1,978,634      | 0.505     |
| convert (lrgb-to-hsv)    | 2,039,608      | 0.490     |
| convert (lrgb-to-hwb)    | 1,959,273      | 0.510     |
| convert (lrgb-to-lrgb)   | 6,420,142      | 0.156     |
| convert (lrgb-to-lab)    | 2,752,454      | 0.363     |
| convert (lrgb-to-lch)    | 2,202,855      | 0.454     |
| convert (lrgb-to-oklab)  | 3,041,496      | 0.329     |
| convert (lrgb-to-oklch)  | 2,310,352      | 0.433     |
| convert (lab-to-rgb)     | 2,268,773      | 0.441     |
| convert (lab-to-hsl)     | 2,161,545      | 0.463     |
| convert (lab-to-hsv)     | 2,260,310      | 0.442     |
| convert (lab-to-hwb)     | 2,198,435      | 0.455     |
| convert (lab-to-lrgb)    | 3,136,111      | 0.319     |
| convert (lab-to-lab)     | 6,587,686      | 0.152     |
| convert (lab-to-lch)     | 4,835,033      | 0.207     |
| convert (lab-to-oklab)   | 2,488,089      | 0.402     |
| convert (lab-to-oklch)   | 2,169,462      | 0.461     |
| convert (lch-to-rgb)     | 2,102,206      | 0.476     |
| convert (lch-to-hsl)     | 1,810,879      | 0.552     |
| convert (lch-to-hsv)     | 1,968,125      | 0.508     |
| convert (lch-to-hwb)     | 1,858,961      | 0.538     |
| convert (lch-to-lrgb)    | 2,073,635      | 0.482     |
| convert (lch-to-lab)     | 4,835,033      | 0.207     |
| convert (lch-to-lch)     | 5,377,898      | 0.186     |
| convert (lch-to-oklab)   | 2,274,814      | 0.439     |
| convert (lch-to-oklch)   | 2,033,305      | 0.492     |
| convert (oklab-to-rgb)   | 2,619,381      | 0.382     |
| convert (oklab-to-hsl)   | 1,785,127      | 0.560     |
| convert (oklab-to-hsv)   | 1,872,587      | 0.534     |
| convert (oklab-to-hwb)   | 1,927,478      | 0.519     |
| convert (oklab-to-lrgb)  | 2,556,391      | 0.391     |
| convert (oklab-to-lab)   | 4,635,387      | 0.216     |
| convert (oklab-to-lch)   | 3,536,889      | 0.283     |
| convert (oklab-to-oklab) | 6,133,604      | 0.163     |
| convert (oklab-to-oklch) | 4,178,308      | 0.239     |
| convert (oklch-to-rgb)   | 2,296,310      | 0.435     |
| convert (oklch-to-hsl)   | 1,670,089      | 0.599     |
| convert (oklch-to-hsv)   | 1,812,478      | 0.552     |
| convert (oklch-to-hwb)   | 1,785,127      | 0.560     |
| convert (oklch-to-lrgb)  | 2,204,417      | 0.454     |
| convert (oklch-to-lab)   | 3,845,986      | 0.260     |
| convert (oklch-to-lch)   | 3,204,312      | 0.312     |
| convert (oklch-to-oklab) | 4,435,806      | 0.225     |
| convert (oklch-to-oklch) | 5,377,898      | 0.186     |

---

## Convert — Hue

| Benchmark           | Operations/sec | Mean (μs) |
| ------------------- | -------------- | --------- |
| convert (hue-rgb)   | 6,212,761      | 0.161     |
| convert (hue-hsl)   | 6,018,725      | 0.166     |
| convert (hue-hsv)   | 5,987,124      | 0.167     |
| convert (hue-hwb)   | 5,945,522      | 0.168     |
| convert (hue-lrgb)  | 4,826,521      | 0.207     |
| convert (hue-lab)   | 5,167,833      | 0.194     |
| convert (hue-lch)   | 4,519,221      | 0.221     |
| convert (hue-oklab) | 4,267,855      | 0.234     |
| convert (hue-oklch) | 4,224,509      | 0.237     |

---

## Format

| Benchmark                  | Operations/sec | Mean (μs) |
| -------------------------- | -------------- | --------- |
| format (hex)               | 5,912,576      | 0.169     |
| format (rgb)               | 5,576,385      | 0.179     |
| format (hsl)               | 5,447,305      | 0.184     |
| format (hwb)               | 5,388,854      | 0.186     |
| format (lab)               | 5,347,604      | 0.187     |
| format (lch)               | 5,253,554      | 0.190     |
| format (oklab)             | 5,069,145      | 0.197     |
| format (oklch)             | 5,091,006      | 0.196     |
| format (black)             | 8,822,162      | 0.113     |
| format (white)             | 8,604,561      | 0.116     |
| format (with-alpha)        | 5,924,653      | 0.169     |
| format (opaque-alpha)      | 6,386,547      | 0.157     |
| round (precision-0)        | 10,919,709     | 0.092     |
| round (precision-2)        | 10,849,175     | 0.092     |
| round (precision-4)        | 10,879,479     | 0.092     |
| round (negative-precision) | 10,864,592     | 0.092     |
| round (capped-precision)   | 10,865,118     | 0.092     |

---

## Matrix

| Benchmark                             | Operations/sec | Mean (μs) |
| ------------------------------------- | -------------- | --------- |
| matrix (create-instance)              | 8,010,242      | 0.125     |
| matrix (reuse-from-pool)              | 6,286,951      | 0.159     |
| matrix (create-new-empty-pool)        | 5,673,014      | 0.176     |
| matrix (create-color-values)          | 4,980,583      | 0.201     |
| matrix (create-color-default-alpha)   | 5,463,790      | 0.183     |
| matrix (create-color-custom-alpha)    | 5,085,229      | 0.197     |
| matrix (create-color-pool-allocation) | 3,382,644      | 0.296     |
| matrix (drop-to-pool)                 | 8,799,834      | 0.114     |
| matrix (drop-max-pool-limit)          | 414,781        | 2.411     |
| matrix (drop-to-pool)                 | 8,910,561      | 0.112     |
| matrix (drop-no-mutation)             | 10,816,339     | 0.092     |
| matrix (clone-color-oklab)            | 6,482,774      | 0.154     |
| matrix (clone-color-preserve-alpha)   | 6,850,207      | 0.146     |
| matrix (clone-color-buffer-copy)      | 6,849,234      | 0.146     |
| matrix (clear-preallocated)           | 1,746,849      | 0.572     |
| matrix (clear-after-drop)             | 3,114,001      | 0.321     |
| matrix (preallocate-matrices)         | 2,442,650      | 0.409     |
| matrix (preallocate-max-cap)          | 84,742         | 11.800    |

---

## Parse

| Benchmark       | Operations/sec | Mean (μs) |
| --------------- | -------------- | --------- |
| parse (hex)     | 2,996,125      | 0.334     |
| parse (rgb)     | 1,243,563      | 0.804     |
| parse (hsl)     | 985,412        | 1.015     |
| parse (hwb)     | 1,018,325      | 0.982     |
| parse (lab)     | 974,520        | 1.026     |
| parse (lch)     | 961,225        | 1.040     |
| parse (oklab)   | 943,852        | 1.060     |
| parse (oklch)   | 934,202        | 1.070     |
| parse (6-digit) | 10,821,675     | 0.092     |
| parse (3-digit) | 10,830,554     | 0.092     |
| parse (8-digit) | 10,781,085     | 0.093     |
| parse (4-digit) | 10,870,406     | 0.092     |

---

## Shared

| Benchmark                               | Operations/sec | Mean (μs) |
| --------------------------------------- | -------------- | --------- |
| mutate (rgb-to-oklab)                   | 4,178,308      | 0.239     |
| mutate (identity-rgb)                   | 10,878,558     | 0.092     |
| mutate (preserve-alpha)                 | 7,558,856      | 0.132     |
| mutate (sequential-rgb-to-hsl-to-oklab) | 1,438,341      | 0.695     |
| derive (rgb-to-oklab)                   | 2,827,095      | 0.354     |
| derive (preserve-alpha)                 | 4,962,046      | 0.202     |
| derive (rgb-to-rgb)                     | 6,105,800      | 0.164     |

---

## Utilities — Compare

| Benchmark                          | Operations/sec | Mean (μs) |
| ---------------------------------- | -------------- | --------- |
| compare (equal-same-reference)     | 10,000,000     | 0.100     |
| compare (equal-different-space)    | 4,464,286      | 0.224     |
| compare (equal-alpha-mismatch)     | 5,617,978      | 0.178     |
| compare (equal-with-tolerance)     | 5,617,978      | 0.178     |
| compare (distance-same-space)      | 6,578,947      | 0.152     |
| compare (distance-different-space) | 3,205,128      | 0.312     |
| compare (distance-to-oklab)        | 3,105,590      | 0.322     |

---

## Utilities — Contrast

| Benchmark                         | Operations/sec | Mean (μs) |
| --------------------------------- | -------------- | --------- |
| contrast (white-on-black)         | 7,558,856      | 0.132     |
| contrast (black-on-white)         | 7,506,725      | 0.133     |
| contrast (identical-colors)       | 7,472,118      | 0.134     |
| contrast (text-on-dark-bg)        | 5,943,522      | 0.168     |
| contrast (bulk)                   | 3,114,001      | 0.321     |
| contrast (bulk-larger-set)        | 2,198,847      | 0.455     |
| contrast (bulk-empty)             | 3,045,685      | 0.328     |
| contrast (scales-small-step)      | 1,650,000      | 0.606     |
| contrast (scales-multi-stop)      | 1,102,381      | 0.907     |
| contrast (scales-high-resolution) | 385,542        | 2.594     |
| contrast (match-lighten-on-black) | 2,327,869      | 0.430     |
| contrast (match-darken-on-white)  | 2,327,869      | 0.430     |
| contrast (match-with-alpha)       | 2,045,685      | 0.489     |
| contrast (rating-platinum)        | 14,285,714     | 0.070     |
| contrast (rating-gold)            | 14,285,714     | 0.070     |
| contrast (rating-bronze)          | 14,285,714     | 0.070     |
| contrast (rating-fail)            | 14,285,714     | 0.070     |

---

## Utilities — Gamut

| Benchmark                     | Operations/sec | Mean (μs) |
| ----------------------------- | -------------- | --------- |
| gamut (check-in-gamut-rgb)    | 7,352,941      | 0.136     |
| gamut (check-out-gamut-rgb)   | 7,042,254      | 0.142     |
| gamut (check-out-gamut-oklch) | 6,984,126      | 0.143     |
| gamut (check-high-tolerance)  | 7,092,199      | 0.141     |
| gamut (check-hue-rotation)    | 6,920,415      | 0.145     |
| gamut (clamp-in-gamut)        | 6,497,409      | 0.154     |
| gamut (clamp-out-gamut-rgb)   | 5,847,953      | 0.171     |
| gamut (clamp-hue-wrapping)    | 5,102,041      | 0.196     |
| gamut (clamp-mutate-true)     | 5,847,953      | 0.171     |
| gamut (clamp-mutate-false)    | 5,847,953      | 0.171     |

---

## Utilities — Gradient

| Benchmark                              | Operations/sec | Mean (μs) |
| -------------------------------------- | -------------- | --------- |
| gradient (smooth-linear)               | 333,333        | 3.000     |
| gradient (smooth-linear-high-fidelity) | 166,667        | 6.000     |
| gradient (smooth-radial-custom)        | 250,000        | 4.000     |
| gradient (smooth-edge-case-steps)      | 333,333        | 3.000     |
| gradient (linear-default-angle)        | 1,000,000      | 1.000     |
| gradient (linear-custom-angle)         | 500,000        | 2.000     |
| gradient (linear-multi-stop-no-pos)    | 333,333        | 3.000     |
| gradient (radial-default-params)       | 1,250,000      | 0.800     |
| gradient (radial-custom-shape-pos)     | 500,000        | 2.000     |
| gradient (radial-multi-stop-no-pos)    | 333,333        | 3.000     |
| gradient (multi-linear-default)        | 1,000,000      | 1.000     |
| gradient (multi-single-color)          | 2,000,000      | 0.500     |
| gradient (multi-radial-custom)         | 500,000        | 2.000     |
| gradient (multi-large-set)             | 200,000        | 5.000     |
| gradient (conic-default-params)        | 1,250,000      | 0.800     |
| gradient (conic-custom-params)         | 500,000        | 2.000     |
| gradient (conic-multi-stop)            | 333,333        | 3.000     |

---

## Utilities — Naming

| Benchmark                                   | Operations/sec | Mean (μs) |
| ------------------------------------------- | -------------- | --------- |
| naming (parse)                              | 4,464,286      | 0.224     |
| naming (parse-case-insensitive)             | 3,105,590      | 0.322     |
| naming (parse-invalid)                      | 6,578,947      | 0.152     |
| naming (parse-long-name)                    | 3,846,154      | 0.260     |
| naming (exact-match)                        | 7,042,254      | 0.142     |
| naming (exact-near-match-default-tolerance) | 6,493,506      | 0.154     |
| naming (exact-near-match-strict-tolerance)  | 5,847,953      | 0.171     |
| naming (exact-no-match)                     | 6,493,506      | 0.154     |
| naming (similar-small-limit)                | 3,225,806      | 0.310     |
| naming (similar-standard-limit)             | 3,225,806      | 0.310     |
| naming (similar-large-limit)                | 2,941,176      | 0.340     |
| naming (similar-mid-tone)                   | 3,105,590      | 0.322     |
| naming (closest-exact-match)                | 5,617,978      | 0.178     |
| naming (closest-approximate-match)          | 5,376,344      | 0.186     |
| naming (closest-named-constant)             | 5,376,344      | 0.186     |
| naming (closest-boundary-case)              | 5,347,594      | 0.187     |

---

## Utilities — Palette

| Benchmark                               | Operations/sec | Mean (μs) |
| --------------------------------------- | -------------- | --------- |
| palette (mix-rgb-linear)                | 2,352,941      | 0.425     |
| palette (mix-hsl-shortest-hue)          | 1,785,714      | 0.560     |
| palette (mix-ratio-clamping)            | 1,666,667      | 0.600     |
| palette (mix-zero-ratio-copy)           | 2,352,941      | 0.425     |
| palette (shades-5-steps)                | 833,333        | 1.200     |
| palette (shades-high-fidelity-25-steps) | 200,000        | 5.000     |
| palette (shades-alpha-interpolation)    | 500,000        | 2.000     |
| palette (shades-single-step-edge)       | 1,000,000      | 1.000     |
| palette (shades-invalid-steps)          | 2,000,000      | 0.500     |
| palette (scales-two-stops)              | 833,333        | 1.200     |
| palette (scales-multi-stop-segmented)   | 476,190        | 2.100     |
| palette (scales-high-resolution)        | 111,111        | 9.000     |
| palette (scales-single-stop-edge)       | 1,000,000      | 1.000     |
| palette (scales-empty-steps)            | 2,500,000      | 0.400     |
| palette (harmony-rgb)                   | 476,190        | 2.100     |
| palette (harmony-hsl-hue-wrapping)      | 384,615        | 2.600     |
| palette (harmony-high-density)          | 166,667        | 6.000     |

---

## Utilities — Picker

| Benchmark                             | Operations/sec | Mean (μs) |
| ------------------------------------- | -------------- | --------- |
| picker (to-rgb)                       | 4,464,286      | 0.224     |
| picker (to-rgb-transparent)           | 3,623,188      | 0.276     |
| picker (to-from-oklch)                | 2,958,580      | 0.338     |
| picker (to-from-hsl)                  | 2,932,551      | 0.341     |
| picker (lifecycle-create-dispose)     | 3,205,128      | 0.312     |
| picker (update-saturation-brightness) | 1,562,500      | 0.640     |
| picker (update-hue)                   | 1,562,500      | 0.640     |
| picker (assign-achromatic)            | 1,388,889      | 0.720     |
| picker (get-pooled-colors)            | 1,190,476      | 0.840     |
| picker (subscription-notify)          | 1,010,101      | 0.990     |

---

## Utilities — Simulate

| Benchmark                           | Operations/sec | Mean (μs) |
| ----------------------------------- | -------------- | --------- |
| simulate (protanopia-lrgb)          | 833,333        | 1.200     |
| simulate (deuteranopia-lrgb)        | 833,333        | 1.200     |
| simulate (tritanopia-lrgb)          | 769,231        | 1.300     |
| simulate (achromatopsia-lrgb)       | 769,231        | 1.300     |
| simulate (conversion-overhead-srgb) | 555,556        | 1.800     |
| simulate (none-passthrough)         | 1,250,000      | 0.800     |

---

## Notes

- All benchmarks run with 500ms sample time per operation
- Results show mean operations per second (Hz) and mean execution time in microseconds (μs)
