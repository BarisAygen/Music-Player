class Music {
    constructor(title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName() {
        return this.title + " - " + this.singer;
    }
}

const musicList = [
    new Music("Sunburn", "Muse", "../img/Showbiz.jpg", "../mp3/Sunburn.mp3"),
    new Music("Kidnapping an Heiress", "Black Box Recorder", "../img/BlackBoxRecorder.jpg", "../mp3/KidnappingAnHeiress.mp3"),
    new Music("I Close my eyes", "Shiaaree", "../img/Shivaree.jpg", "../mp3/ICloseMyEyes.mp3")
];