const fs = require("fs");
const path = require("path");

const outputDirectory = path.join(__dirname, "..", "public", "images", "odisha");
const palettes = [
    ["#f4c95d", "#e9795d", "#356b68", "#fff1ca"],
    ["#b8d8ba", "#5b9a8b", "#315c59", "#fff0c2"],
    ["#f1a66a", "#d76155", "#7d4e57", "#fff1cf"],
    ["#9bc5d5", "#4f8ea2", "#31546c", "#fff0c0"],
    ["#e9c46a", "#e07a5f", "#426b5a", "#fff4d6"],
    ["#cdb4db", "#8d80ae", "#476b64", "#fff0c5"],
    ["#f6bd60", "#f28482", "#52796f", "#fff3d1"],
    ["#a8dadc", "#457b9d", "#344e63", "#ffe8b6"],
    ["#e8ac87", "#bd6d62", "#546a59", "#fef0ca"],
    ["#b9c6a6", "#789878", "#405e62", "#f8edca"],
];

function renderListingArtwork(index) {
    const [sky, horizon, foreground, sun] = palettes[index % palettes.length];
    const offset = (index * 43) % 240;
    const sunX = 170 + ((index * 97) % 850);
    const buildingX = 390 + ((index * 29) % 240);
    const buildingWidth = 230 + ((index * 17) % 100);
    const buildingY = 310 + ((index * 13) % 75);
    const roofPeak = buildingX + Math.round(buildingWidth / 2);
    const scene = index % 3;
    const landscape = scene === 0
        ? `<path d="M0 485 Q180 ${385 + offset % 40} 360 485 T720 470 T1200 455 V800 H0Z" fill="${horizon}"/><path d="M0 565 Q210 450 440 565 T880 540 T1200 560 V800 H0Z" fill="${foreground}"/><path d="M${560 + offset} 800 Q${510 + offset} 650 ${620 + offset} 565 Q${705 + offset} 650 ${640 + offset} 800Z" fill="${sun}" opacity=".72"/>`
        : scene === 1
            ? `<path d="M0 495 Q170 450 340 495 T680 480 T1020 500 T1200 480 V800 H0Z" fill="${horizon}"/><path d="M0 565 Q200 520 400 565 T800 550 T1200 565 V800 H0Z" fill="${foreground}"/><path d="M0 638 Q200 605 400 638 T800 628 T1200 642 V800 H0Z" fill="${horizon}" opacity=".58"/>`
            : `<path d="M0 485 Q220 420 430 485 T850 480 T1200 460 V800 H0Z" fill="${horizon}"/><path d="M0 575 Q200 510 420 575 T850 560 T1200 575 V800 H0Z" fill="${foreground}"/><path d="M0 660 Q220 605 440 660 T880 650 T1200 655 V800 H0Z" fill="${sun}" opacity=".32"/>`;
    const windows = Array.from({ length: 6 }, (_, windowIndex) => {
        const x = buildingX + 28 + (windowIndex % 3) * Math.round((buildingWidth - 72) / 3);
        const y = buildingY + 64 + Math.floor(windowIndex / 3) * 80;
        return `<rect x="${x}" y="${y}" width="32" height="43" rx="3" fill="${sun}" opacity=".92"/><path d="M${x + 16} ${y}v43M${x} ${y + 21}h32" stroke="${foreground}" stroke-width="3" opacity=".56"/>`;
    }).join("");
    const trees = Array.from({ length: 5 }, (_, treeIndex) => {
        const x = 95 + treeIndex * 220 + ((index * 31 + treeIndex * 19) % 70);
        const y = 520 + ((treeIndex + index) % 3) * 17;
        return `<path d="M${x} ${y + 88}v-59" stroke="${foreground}" stroke-width="9" stroke-linecap="round"/><circle cx="${x}" cy="${y + 7}" r="${29 + (treeIndex % 2) * 6}" fill="${foreground}" opacity=".92"/><circle cx="${x - 19}" cy="${y + 22}" r="18" fill="${horizon}" opacity=".86"/>`;
    }).join("");
    const clouds = [0, 1, 2].map((cloudIndex) => {
        const x = 140 + ((cloudIndex * 367 + index * 53) % 930);
        const y = 115 + ((cloudIndex * 37 + index * 11) % 105);
        return `<path d="M${x} ${y + 18}c0-15 12-26 27-26 8-18 34-19 44-2 21-5 37 8 37 25 0 13-10 22-25 22h-58c-15 0-25-8-25-19Z" fill="#fffaf0" opacity=".46"/>`;
    }).join("");

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-labelledby="title desc">
<title id="title">Original illustrated sample stay ${String(index + 1).padStart(2, "0")}</title>
<desc id="desc">A decorative, computer-generated vector scene. It is not a photograph of a real property.</desc>
<defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="${sky}"/><stop offset="1" stop-color="#fff0d5"/></linearGradient><linearGradient id="wall" x2="0" y2="1"><stop stop-color="#fff8e8"/><stop offset="1" stop-color="#e9d7b8"/></linearGradient></defs>
<rect width="1200" height="800" fill="url(#sky)"/><circle cx="${sunX}" cy="${155 + index % 90}" r="${61 + index % 24}" fill="${sun}" opacity=".93"/>${clouds}
${landscape}
<ellipse cx="${buildingX + buildingWidth / 2}" cy="${buildingY + 287}" rx="${buildingWidth * .78}" ry="28" fill="#233f48" opacity=".2"/>
<path d="M${buildingX - 29} ${buildingY + 85}L${roofPeak} ${buildingY}l${buildingWidth + 29} 85Z" fill="${foreground}"/>
<rect x="${buildingX}" y="${buildingY + 81}" width="${buildingWidth}" height="205" rx="8" fill="url(#wall)"/>
<path d="M${buildingX - 13} ${buildingY + 90}h${buildingWidth + 26}" stroke="${sun}" stroke-width="12" stroke-linecap="round"/>
${windows}
<rect x="${roofPeak - 25}" y="${buildingY + 205}" width="50" height="81" rx="24 24 2 2" fill="${foreground}"/><circle cx="${roofPeak + 12}" cy="${buildingY + 245}" r="3.5" fill="${sun}"/>
<rect x="${buildingX - 24}" y="${buildingY + 280}" width="${buildingWidth + 48}" height="13" rx="6" fill="${sun}"/>
${trees}
<path d="M0 733 Q210 698 420 733 T840 728 T1200 735 V800 H0Z" fill="#263f45" opacity=".36"/>
<rect x="34" y="36" width="208" height="46" rx="23" fill="#fffaf0" opacity=".83"/><text x="138" y="66" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" font-weight="700" letter-spacing="2" fill="${foreground}">ODISHA - SAMPLE</text>
<text x="1165" y="760" text-anchor="end" font-family="Arial,sans-serif" font-size="16" letter-spacing="1.2" fill="#fffaf0" opacity=".9">ORIGINAL VECTOR ART</text>
</svg>`;
}

function writeListingArtwork(count) {
    fs.mkdirSync(outputDirectory, { recursive: true });
    for (let index = 0; index < count; index += 1) {
        const filename = `odisha-${String(index + 1).padStart(2, "0")}.svg`;
        fs.writeFileSync(
            path.join(outputDirectory, filename),
            renderListingArtwork(index),
            "utf8"
        );
    }
}

module.exports = { renderListingArtwork, writeListingArtwork };
