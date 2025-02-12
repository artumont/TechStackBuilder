const fs = require('fs');
const path = require('path');

function parseBadges(readmePath) {
    const content = fs.readFileSync(readmePath, 'utf8');
    const badgeRegex = /https:\/\/img\.shields\.io\/badge\/([^-]+)-[^?\s]+/g;
    const badges = {};
    
    let match;
    while ((match = badgeRegex.exec(content)) !== null) {
        const name = decodeURIComponent(match[1]);
        badges[name] = match[0];
    }

    return badges;
}

function saveBadges(badges, outputPath) {
    fs.writeFileSync(outputPath, JSON.stringify(badges, null, 2));
}

module.exports = {
    parseBadges,
    saveBadges
};
