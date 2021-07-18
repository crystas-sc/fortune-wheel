const spinButton = document.getElementById('spin');
const dial = document.querySelector('.dial');

spinButton.addEventListener('click', () => {
    // dial.classList.toggle("spinning");
    // document.querySelector('content-container').classList.toggle('activated');
    wof.spin()
});

let sliceData = ["Jhon", "Cramer", "Lisa", "Emerald", "Peter", "Rajan", "Suresh", "Limena", "Jasper", "Andrea", "Mathew", "Rohan", "Gandhi", "Bindhu", "Nina"]


var addRule = (function (style) {
    var sheet = document.head.appendChild(style).sheet;

    return function (selector, css) {
        Array(sheet.cssRules.length).fill(1).forEach(_ => {
            sheet.removeRule();
        })
        var propText = Object.keys(css).map(function (p) {
            return p + ":" + css[p]
        }).join(";");
        sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
    }
})(document.createElement("style"));


class WoF {
    constructor(sliceData, dataParentDOM, diameter) {
        this.sliceData = sliceData;
        this.dataParentDOM = dataParentDOM;
        this.diameter = diameter;
        this.initSlices(sliceData, dataParentDOM);
        this.setWheelDimensions(diameter, sliceData.length)
    }

    initSlices = (sliceData, dataParentDOM) => {
        this.removeAllChildNodes(dataParentDOM);
        this.createSlices(sliceData, dataParentDOM);


    }

    createSlices = (sliceData, dataParentDOM) => {
        let slicesHTML = Array.from(Array(sliceData.length).keys()).map(i => ` <div class="slice">
                                                                <div class="label">${sliceData[i]}</div>
                                                            </div>` ).join("");
        console.log(slicesHTML)
        dataParentDOM.innerHTML = slicesHTML;
    }

    setWheelDimensions = (diameter, numberOfSlices) => {
        let radius = diameter / 2;
        let circumfrance = (6.283185307 * radius);
        let sliceHeight = (circumfrance / numberOfSlices);
        let sliceOffset = (sliceHeight / 2);
        let rotation = 360 / numberOfSlices;

        document.documentElement.style.setProperty("--diameter", diameter);
        document.documentElement.style.setProperty("--diameterPx", diameter + "px");
        document.documentElement.style.setProperty("--numberOfSlices", numberOfSlices);
        document.documentElement.style.setProperty("--radius", radius);
        document.documentElement.style.setProperty("--circumfrance", circumfrance);
        document.documentElement.style.setProperty("--sliceHeight", sliceHeight);
        document.documentElement.style.setProperty("--sliceHeightPx", sliceHeight + "px");
        document.documentElement.style.setProperty("--sliceOffset", sliceOffset);
        document.documentElement.style.setProperty("--sliceOffsetPx", sliceOffset + "px");
        document.documentElement.style.setProperty("--rotation", rotation);

        document.documentElement.style.setProperty("--sliceBorderWidth", ((sliceHeight / 2) + 4));

        Array.from(document.querySelectorAll(".dial .slice"))
            .forEach((element, i) => {
                let rotate = 360 / numberOfSlices * i
                element.style.transform = `rotate(${rotate}deg)`;
            })

        if (numberOfSlices % 2 != 0) {
            addRule(`.dial .slice:nth-child(${numberOfSlices}):after`, {
                "border-color": " transparent #063caa transparent transparent;"
            });
        } else {
            addRule(".html", {})
        }

    }

    spin = () => {
        dial.style.transition = `all 0s ease-out`;
        dial.style.transform = `none`;
        let numberOfSlices = this.sliceData.length
        let selectedIndex = parseInt(Math.random() * numberOfSlices)
        let rotateDeg = (360 / numberOfSlices) * selectedIndex + 360
        setTimeout(() => {
            dial.style.transition = `all 2s ease-out`;
            dial.style.transform = `rotate(${-rotateDeg}deg)`;
        }, 1)

        console.log(selectedIndex, `rotate(${rotateDeg})`, this.sliceData[selectedIndex])
    }

    removeAllChildNodes = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
}

wof = new WoF(sliceData, dial, 350)

document.querySelector("#items").onblur = (e) => {
    wof = new WoF(e.target.value.split(","), dial, 350)
}
