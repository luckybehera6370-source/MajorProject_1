function getListingPhotoTheme(location) {
    const name = location.toLowerCase();

    if (/konark/.test(name)) return "heritage";
    if (/puri|gopalpur|paradip|balasore|chandipur|talsari|astaranga|coast|beach/.test(name)) return "coast";
    if (/satapada|chilika|rambha|mangalajodi|chitrakonda|lake|reservoir/.test(name)) return "lake";
    if (/waterfall|sanaghagara|badaghagara|khandadhar/.test(name)) return "waterfall";
    if (/forest|similipal|bhitarkanika|daringbadi|koraput|jeypore|deomali|mahendragiri|rayagada|phulbani|gupteswar|sunabeda|hill|mountain|ghat|lamtaput/.test(name)) return "hills";
    if (/temple|heritage|bhubaneswar|dhauli|ratnagiri|lalitgiri|raghurajpur|jajpur|khandagiri|kapilas|dhenkanal/.test(name)) return "heritage";
    if (/cuttack|rourkela|sambalpur|berhampur|jharsuguda|bhadrak|baripada|angul|town|city|apartment/.test(name)) return "city";
    return "countryside";
}

module.exports = getListingPhotoTheme;
