var model = {
    intro: '<div>',
    game: '<div>',
    share: '<div>',
};
var tile = {
    showing: false,
    letter: '',
};
var jumbles = {
    'abc': ['acb', 'bca'],
    'def': ['fed', 'fde'],
};
function play() {
    // hide intro
    // show game
    // pick random phrase
    // disply game layout
}
function makeLayout(phrase) {
    // take phrase
    // make tiles from correct version
    // show keys from jumbled version

}
/*

    user views page

    decides to play game
    clicks button to play

    screen shows the play screen


    common and essential traits

    there is an input area
    there is an output area


    you are shown the Game
    Area[s]
    .output
        a series Slot[s]
        (slot.now) is highlighted
    .input
        an anagramPhrase of Tile[s]
            each has a character

    your goal is to
        from the inputArea/anagramPhrase
            select Tile[s].unused
                exp. tile.correct

    (tile.correct).select()
        (slot.now)
            =.solved
            .character( tile.correct.character() )
        (tile.correct)
            =.used
        (slot.unsolved).first()
            +.now

    this repeats
        until
            !(slot.unsolved).length
        (Area.output)
            +.won


    key terms
        Game
        .failed
        .won
        .overtime
            Area[s]
            .input
                .full
                .partial
                .empty
                Tile[s] (anagramPhrase)
                .character()
                .used
                .unused
                .correct
            .output
                .incomplete
                .complete
                .progressing
                Slot[s]a
                .character()
                .now
                .solved
                .unsolved


        ideas
            50% flys from the input to the output
                correct choices fade and shrink
                slot filling gives a bouncey burst effect

            matches add time to the clock and the score is the resulting time
            time out does what?


 */
