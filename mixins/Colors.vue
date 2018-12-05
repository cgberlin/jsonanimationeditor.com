<script>
   import { rgbToHex } from 'color-invert'
   export default {
        methods: {
            $toVector(n) {
                return Math.round(n / 255 * 1000) / 1000
            },
            $fromVector(n) {
                return Math.round(n * 255)
            },
            $colors(animationJson, cb, asset) {
                if (animationJson) {
                    animationJson.layers.forEach((layer, i) => {
                    if (layer.shapes) {
                        layer.shapes.forEach((shape, j) => {
                        if (shape.it) {
                            shape.it.forEach((prop, k) => {
                            if (['fl', 'st'].includes(prop.ty)) {
                                const color = prop.c.k

                                let [r, g, b, a] = color

                                r = this.$fromVector(r)
                                g = this.$fromVector(g)
                                b = this.$fromVector(b)

                                const meta = {
                                    i,
                                    j,
                                    k,
                                    r,
                                    g,
                                    b,
                                    a,
                                    nm: prop.nm,
                                    asset,
                                    color: rgbToHex(r, g, b)
                                }

                                if (cb) {
                                    cb(meta)
                                }
                            }
                            });
                        }
                        });
                    }
                    });
                }
            },
            $newColor(rows, selectedRow, selectedCol, json, color) {
                const { i, j, k, a, asset } = rows[selectedRow]

                const newColor = color.hex

                const newRows = rows
                newRows[selectedRow][this.cols[selectedCol].prop] = newColor
                this.setState({ rows: newRows })

                const newJson = JSON.parse(json)

                const { r, g, b } = hexToRgb(newColor)

                if (asset === -1) {
                if (newJson && newJson.layers) {
                    newJson.layers[i].shapes[j].it[k].c.k = [
                        toUnitVector(r),
                        toUnitVector(g),
                        toUnitVector(b),
                        a
                    ]
                }
                } else {
                // eslint-disable-next-line no-lonely-if
                if (newJson && newJson.assets) {
                    newJson.assets[asset].layers[i].shapes[j].it[k].c.k = [
                        toUnitVector(r),
                        toUnitVector(g),
                        toUnitVector(b),
                        a
                    ]
                }
                }
            }
        }
    }
</script>